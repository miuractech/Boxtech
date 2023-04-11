import React, { useState } from 'react';
import { Button, Title, Text } from '@mantine/core';
import OtpInput from 'react-otp-input';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStep } from '../../store/authSlice';

type Props = {
  verifyOtp: (
    otp: string,
    success: (user: User) => void,
    failure: (error: FirebaseError) => void
  ) => void;
  id: string | null;
  data:any
};

export default function VerifyOtp({ verifyOtp, id, data }: Props) {
  const matches = useMediaQuery('(min-width: 768px)');
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [OTPerror, setOTPerror] = useState<FirebaseError | null>(null);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      otp: '',
    },

    validate: {
      otp: (value) => (value.length === 6 ? null : 'Invalid OTP'),
    },
  });

  const success = async (user: User) => {
    try {
      if ( !orderId) return;
      await setDoc(doc(collection(db, "Users"),user.uid), {
        ...data,
        createdAt: serverTimestamp(),
        verified: true,
        userId: user.uid,
      })
      await updateDoc(doc(db, 'Orders', orderId), {
        status: 'userVerified',
        userId: user.uid,
      });
      setLoading(false);
    } catch (error) {
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: 'Error',
        message: 'Something went wrong try again',  
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  };

  const failure = (error: FirebaseError) => {
    console.log(error);
    setOTPerror(error);
    setLoading(false);
  };

  return (
    <div className="w-11/12 m-auto space-y-5">
      <Title align="center" order={2} color="#222629" weight={700}>
        OTP Verification
      </Title>
      <Text className="text-sm" color="gray">
        We have sent a verification code to your phone starts with{' '}
        {data.phone}
      </Text>
      <form
        onSubmit={form.onSubmit((values) => {
          try {
            setLoading(true);
            verifyOtp(values.otp, success, failure);
          } catch (error) {
            console.log(error);
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Error',
              message: 'Something went wrong try again',
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
          }
        })}
      >
        <OtpInput
          {...form.getInputProps('otp')}
          numInputs={6}
          className="w-full"
          inputStyle={{
            width: '100%',
            height: matches ? '50px' : '35px',
            borderRadius: 4,
            border: '0px',
            backgroundColor: '#EEEEEE',
            margin: '0px 5px',
            fontWeight: 900,
            fontSize: '20px',
          }}
          isInputNum
          hasErrored={Boolean(OTPerror)}
          errorStyle={{
            border: '1px solid red',
          }}
        />
        {Boolean(OTPerror) && (
          <Text className="text-red-500 text-xs mt-1">
            Incorrect OTP! Please enter correct OTP
          </Text>
        )}
        <div className="text-right">
          <Button size="xs" variant="white">
            Resend OTP?
          </Button>
        </div>
        <Button type="submit" loading={loading} fullWidth>
          Verify
        </Button>
        <br />
        <Button
          variant="light"
          disabled={loading}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // window.recaptchaVerifier = null;
            dispatch(setStep('phone'));
          }}
          fullWidth
        >
          Back
        </Button>
      </form>
    </div>
  );
}
