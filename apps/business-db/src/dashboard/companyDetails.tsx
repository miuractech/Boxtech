import {
  Button,
  Container,
  Group,
  SegmentedControl,
  Tabs,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';

import { useForm, yupResolver } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons';
import { ActionIcon } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import * as yup from 'yup';
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import {
  clientDbRef,
  clientMetaDoc,
  costRef,
  firebaseErrorType,
} from '../constants';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { setClient } from '../store/clientSlice';
import { environment } from '../environments/environment';
import { MiuracImage } from '@boxtech/miurac-image';
import { app, auth, db } from '../configs/firebaseconfig';
import { initialCost } from '../store/categorySlice';
import { useNavigate } from 'react-router-dom';
import { CostType, generalInfo } from '@boxtech/shared-constants';
import { signOut } from 'firebase/auth';
import { KYCForm } from './kyc';
const schema = yup.object().shape({
  corporateName: yup
    .string()
    .min(2, 'corporate name should have at least 2 letters')
    .required('corporate name is required'),
  brandName: yup
    .string()
    .min(2, 'brand name should have at least 2 letters')
    .required('brand name is required'),
  logo: yup.string().url().required('logo is required'),
  address: yup
    .string()
    .min(2, 'address should have at least 2 letters')
    .required('address is required'),
  pincode: yup
    .number()
    .integer('Enter valid pincode')
    .min(100000, 'Enter valid pincode')
    .max(999999, 'Enter valid pincode')
    .required('pincode is required'),
  phone: yup
    .number()
    .integer('Enter valid phone number')
    .min(1000000000, 'Enter valid phone number')
    .max(9999999999, 'Enter valid phone number')
    .required('phone number is required'),
  whatsapp: yup
    .number()
    .integer('Enter valid whatsapp number')
    .min(1000000000, 'Enter valid whatsapp number')
    .max(9999999999, 'Enter valid whatsapp number')
    .required('whatsapp number is required'),
  gstNumber: yup.string().min(5, 'enter valid GST'),
  officialMail: yup
    .string()
    .email('enter valid email')
    .required('enter valid email'),
  panNumber: yup.string().min(5, 'enter valid PAN'),
  sacNumber: yup.string().min(5, 'enter valid SAC no'),
});

const initialValues: generalInfo = {
  corporateName: '',
  brandName: '',
  logo: '',
  address: '',
  pincode: '',
  phone: '',
  officialMail: '',
  kyc: false,
  status: 'created',
  whatsapp: '',
};
export type signupState = 'company' | 'kyc';
export default function CompanyDetails({ inTab }: { inTab?: boolean }) {
  const { user } = useSelector((state: RootState) => state.user);
  const { client } = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string | null>('general');
  const [loading, setLoading] = useState(false);
  const form = useForm<generalInfo>({
    initialValues,
    validate: yupResolver(schema),
  });

  useEffect(() => {
    if (client) form.setValues(client);
    else {
      const setClientFunc = async () => {
        const clientDoc = await getDoc(doc(clientDbRef, user?.uid));
        if (!clientDoc.exists()) dispatch(setClient(null));
        else {
          dispatch(setClient(clientDoc.data()));
        }
      };

      setClientFunc();
    }
    if (client?.kyc && !inTab) setSelectedTab('kyc');
    return () => {
      form.setValues(initialValues);
    };
  }, []);

  return (
    <Container size={'lg'} className="py-10 px-4 ">
      {client?.status === 'kyc error' && (
        <div className="bg-red-400 p-4 rounded-lg mb-4 text-white">
          {' '}
          KYC Error, check your kyc details{' '}
        </div>
      )}
      <div className="bg-white w-[760px] mx-auto rounded-xl">
        <Tabs
          defaultValue="general"
          value={selectedTab}
          onTabChange={setSelectedTab}
          classNames={{
            tab: 'p-4 w-1/2',
            panel: 'p-4 md:p-6',
            root: 'rounded-xl',
          }}
        >
          <Tabs.List className="px-2">
            <Tabs.Tab disabled={client?.status === 'kyc error'} value="general">
              General Info
            </Tabs.Tab>
            <Tabs.Tab disabled={!client || client.kyc} value="kyc">
              KYC
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="general" pt="xs">
            <form
              onSubmit={form.onSubmit(async (data) => {
                setLoading(true);
                try {
                  const target = {
                    ...data,
                    clientId: user?.uid,
                    updatedAt: serverTimestamp(),
                    createdAt: serverTimestamp(),
                  };
                  const costInit: CostType = {
                    ...initialCost,
                    clientId: user?.uid as string,
                  };
                  const batchWrite = writeBatch(db);
                  batchWrite.set(doc(clientDbRef, user?.uid), target, {
                    merge: true,
                  });
                  batchWrite.set(doc(costRef, user?.uid), costInit, {
                    merge: true,
                  });
                  batchWrite.update(clientMetaDoc, {
                    totalClient: increment(1),
                  });
                  await batchWrite.commit();
                  dispatch(setClient(target));
                  navigate('/');
                  if (!client?.kyc) setSelectedTab('kyc');
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
              })}
            >
              <div className="space-y-5 pt-8">
                <Title align="center" order={3}>
                  Company Details
                </Title>
                <div className="grid gap-y-3">
                  {/* <Text className='self-center'>Name </Text> */}
                  <TextInput
                    label="Corporate/Legal Name"
                    // className='col-span-2'
                    placeholder="Abc Pvt Ltd"
                    required
                    error={form.errors['corporateName']}
                    {...form.getInputProps('corporateName')}
                  />
                  <TextInput
                    label="Brand Name"
                    // className='col-span-2'
                    placeholder="Cool brand"
                    required
                    error={form.errors['brandName']}
                    {...form.getInputProps('brandName')}
                  />
                  {form.values.logo ? (
                    <div className="relative w-full max-w-md">
                      <Text>Logo</Text>
                      <div className="absolute left-0 top-8">
                        <Tooltip label="Remove image" position="right">
                          <ActionIcon
                            variant="filled"
                            color={'red'}
                            onClick={() => form.setFieldValue('logo', '')}
                          >
                            <IconX />
                          </ActionIcon>
                        </Tooltip>
                      </div>
                      <img
                        className="w-full mb-2 mt-9 max-h-24 max-w-[96px]"
                        src={form.values.logo}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div>
                      <Text>Logo</Text>
                      <MiuracImage
                        app={app}
                        updateFirestore={true}
                        editConfig={{ aspectX: 1, aspectY: 1 }}
                        setUrlFunc={(url) => {
                          if (typeof url === 'string')
                            form.setFieldValue('logo', url);
                        }}
                        allowMultiple={false}
                        cropId={'logo-client-form'}
                      />
                    </div>
                  )}
                  <Text color={'red'} size="sm">
                    {form.errors['logo']}
                  </Text>
                  <TextInput
                    label="Full Address"
                    // className='col-span-2'
                    placeholder="No.00, ABCD street, your area, your city"
                    required
                    error={form.errors['address']}
                    {...form.getInputProps('address')}
                  />
                  <TextInput
                    label="Pincode"
                    // className='col-span-2'
                    placeholder="000000"
                    required
                    error={form.errors['pincode']}
                    {...form.getInputProps('pincode')}
                  />
                  <TextInput
                    label="Contact"
                    // className='col-span-2'
                    description="only Indian number"
                    placeholder="12346548484"
                    icon={<span>+91</span>}
                    required
                    error={form.errors['phone']}
                    {...form.getInputProps('phone')}
                  />
                  <TextInput
                    label="Whatsapp"
                    // className='col-span-2'
                    description="only Indian number"
                    placeholder="12346548484"
                    icon={<span>+91</span>}
                    required
                    error={form.errors['whatsapp']}
                    {...form.getInputProps('whatsapp')}
                  />
                  <TextInput
                    label="official email"
                    defaultValue={user?.email ?? ''}
                    // className='col-span-2'
                    placeholder="abc@org.com"
                    required
                    error={form.errors['officialMail']}
                    {...form.getInputProps('officialMail')}
                  />
                </div>
                <Button type="submit" loading={loading}>
                  Save
                </Button>
                &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp;
                &ensp;&ensp;&ensp;&ensp;
                {!inTab && <Button
                  variant="outline"
                  color="red"
                  onClick={() => signOut(auth)}
                  type="submit"
                >
                  Logout
                </Button>}
              </div>
            </form>
          </Tabs.Panel>
          <Tabs.Panel value="kyc">
            <KYCForm />
          </Tabs.Panel>
        </Tabs>
      </div>
    </Container>
  );
}
