import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from 'react';
import {
  Stepper,
  TextInput,
  FileInput,
  Button,
  Group,
  Divider,
  Text,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { UseFormReturnType, useForm, yupResolver } from '@mantine/form';
import { IconUpload, IconX } from '@tabler/icons';
import { setClient, updateClient } from '../store/clientSlice';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { clientDbRef, kycDbRef } from '../constants';
import { app, db } from '../configs/firebaseconfig';
import { showNotification } from '@mantine/notifications';
import { environment } from '../environments/environment.prod';
import { useNavigate } from 'react-router-dom';
import { MiuracImage } from '@boxtech/miurac-image';
import { KYCType } from '@boxtech/shared-constants';

const initialValues = {
  gstNumber: '',
  panNumber: '',
  sacNumber: '',
  legalName: '',
  cinOrLlpinNo: '',
  cinOrLlpinProof: '',
  panProof: '',
  gstProof: '',
  bankName: '',
  bankAccountNo: '',
  ifscCode: '',
  bankStatement: '',
};

const generalSchema = yup.object().shape({
  legalName: yup.string().required(),
  cinOrLlpinNo: yup.string().required(),
  cinOrLlpinProof: yup.string().required(),
  sacNumber: yup.string().required(),
});

const panSchema = yup.object().shape({
  panNumber: yup.string().required(),
  panProof: yup.string().required(),
});

const gstSchema = yup.object().shape({
  gstNumber: yup.string().required(),

  gstProof: yup.string().required(),
});

const bankSchema = yup.object().shape({
  bankName: yup.string().required(),
  bankAccountNo: yup.number().required(),
  ifscCode: yup.string().required(),
  bankStatement: yup.string().required(),
});

export const KYCForm = () => {
  const [active, setActive] = useState(0);
  const { user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const { client } = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<KYCType>({
    initialValues,
    validate: () => {
      if (active === 0) return yupResolver(generalSchema);
      else if (active === 1) return yupResolver(panSchema);
      else if (active === 2) return yupResolver(gstSchema);
      else if (active === 3) return yupResolver(bankSchema);
      else return {};
    },
  });
  useEffect(() => {
    const setClientFunc = async () => {
      const clientKycDoc = await getDoc(doc(kycDbRef, user?.uid));
      if (clientKycDoc.exists()) {
        dispatch(updateClient(clientKycDoc.data()));
        form.setValues(clientKycDoc.data());
      }

    };
    setClientFunc();

    return () => {
      form.setValues(initialValues);
    };
  }, []);
  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(key, e.target.value);
  };

  return (
    <form
      onSubmit={form.onSubmit(async (data) => {
        if (active < 3) {
          setActive((current) => (current < 3 ? current + 1 : current));
        } else {
          setLoading(true);
          try {
            const target = {
              ...data,
              clientId: user?.uid,
              createdAt: serverTimestamp(),
            };
            const batchWrite = writeBatch(db);
            batchWrite.set(doc(kycDbRef, user?.uid), target, {
              merge: true,
            }); 
            batchWrite.update(doc(clientDbRef, user?.uid), 'kyc', true);
            batchWrite.update(doc(clientDbRef, user?.uid), 'status', "created");
            await batchWrite.commit();
            dispatch(setClient({ ...client, kyc: true }));
            navigate('/');
            window.location.reload()
            setLoading(false);
          } catch (err: any) {
            console.log(err);
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Error!',
              message: environment.production
                ? 'Unexpected error in saving information! Try again'
                : err.message,
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
            setLoading(false);
          }
        }
      })}
    >
      <div className="relative">
        <Divider
          variant="dashed"
          color="dark"
          className="absolute block w-full top-1/2 -z-0"
        />
        <div className="flex justify-between relative z-10">
          {['step 1', 'step 2', 'step 3', 'step 4'].map((step, index) => (
            <div
              key={step}
              onClick={() => setActive(index)}
              style={{
                background:
                  index === active
                    ? 'linear-gradient(98.53deg, #4285F4 0%, #00B2FF 100%)'
                    : '#C6C6C6',
              }}
              className={`flex items-center justify-center w-20 h-8 rounded-full ${
                index === active ? 'text-white' : ''
              }  font-bold text-sm cursor-${
                index === active ? 'default' : 'pointer'
              } select-none transition duration-200`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      <div className="py-8 min-h-[400px]">
        {(() => {
          switch (active) {
            case 1:
              return (
                <Group>
                  <TextInput
                    label="PAN No."
                    name="panNo"
                    required
                    className="w-full"
                    value={form.values.panNumber}
                    onChange={handleChange('panNumber')}
                    error={form.errors['panNumber']}
                  />
                  <ImageUploadComponent
                    field={'panProof'}
                    form={form}
                    title={'PAN'}
                  />
                </Group>
              );
            case 2:
              return (
                <Group>
                  <TextInput
                    label="GST No."
                    name="gstNo"
                    required
                    className="w-full"
                    value={form.values.gstNumber}
                    onChange={handleChange('gstNumber')}
                    error={form.errors['panNumber']}
                  />
                  <ImageUploadComponent
                    field={'gstProof'}
                    form={form}
                    title={'GST'}
                  />
                </Group>
              );
            case 3:
              return (
                <Group>
                  <TextInput
                    label="Name as in bank account"
                    name="bankName"
                    required
                    className="w-full"
                    value={form.values.bankName}
                    onChange={handleChange('bankName')}
                  />
                  <TextInput
                    label="Account number"
                    name="bankAccountNo"
                    required
                    className="w-full"
                    type="number"
                    value={form.values.bankAccountNo}
                    onChange={handleChange('bankAccountNo')}
                  />
                  <TextInput
                    label="IFSC code"
                    name="ifscCode"
                    required
                    className="w-full"
                    value={form.values.ifscCode}
                    onChange={handleChange('ifscCode')}
                  />
                  <ImageUploadComponent
                    field={'bankStatement'}
                    form={form}
                    title={'Bank Statement'}
                  />
                </Group>
              );
            default:
              return (
                <Group>
                  <TextInput
                    label="Legal Name"
                    name="legalName"
                    required
                    className="w-full"
                    {...form.getInputProps('legalName')}
                  />
                  <TextInput
                    label="CIN/LLPIN No."
                    name="cinOrLlpinNo"
                    className="w-full"
                    required
                    {...form.getInputProps('cinOrLlpinNo')}
                  />
                  <ImageUploadComponent
                    field={'cinOrLlpinProof'}
                    form={form}
                    title={'CIN / LLPIN'}
                  />
                  <TextInput
                    label="SAC Number"
                    name="SAC Number"
                    className="w-full"
                    required
                    {...form.getInputProps('sacNumber')}
                  />
                </Group>
              );
          }
        })()}
      </div>
      <div className="mx-auto ">
        <Button
          type="submit"
          color="dark"
          disabled={active === 0}
          onClick={() =>
            setActive((current) => (current > 0 ? current - 1 : current))
          }
          variant="outline"
        >
          Prev
        </Button>
        &ensp; &ensp; &ensp;
        <Button type="submit" color="blue" loading={loading}>
          {active === 3 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </form>
  );
};

type Props = {
  field: keyof KYCType;
  form: UseFormReturnType<KYCType, (values: KYCType) => KYCType>;
  title: string;
};

export function ImageUploadComponent({ field, form, title }: Props) {
  if (form.values[field])
    return (
      <div key={field} className="relative w-full max-w-md">
        <Text>{title}</Text>
        <div className="absolute left-0 top-8">
          <Tooltip label="Remove image" position="right">
            <ActionIcon
              variant="filled"
              color={'red'}
              onClick={() => form.setFieldValue(field, '')}
            >
              <IconX />
            </ActionIcon>
          </Tooltip>
        </div>
        <img
          className="w-full mb-2 mt-9 max-h-24 max-w-[96px]"
          src={form.values[field]}
          alt=""
        />
      </div>
    );
  else
    return (
      <div key={field}>
        <Text>Upload {title}</Text>
        <MiuracImage
          app={app}
          updateFirestore={true}
          setUrlFunc={(url) => {
            if (typeof url === 'string') form.setFieldValue(field, url);
          }}
          allowMultiple={false}
          editConfig={null}
          cropId={'afcfe'}
        />
      </div>
    );
}
