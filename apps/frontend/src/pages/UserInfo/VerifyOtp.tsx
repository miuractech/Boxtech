import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Input } from '@mantine/core';
import { RootState } from '../../store';
import { Button } from '@mantine/core';
// import { Form, Formik } from 'formik';
import OtpInput from 'react-otp-input';
type Props = {
  verifyOtp: (otp: string) => void;
  sendOtp: (phone: string) => void;
};

// eslint-disable-next-line no-empty-pattern
export default function VerifyOtp({ verifyOtp, sendOtp }: Props) {
  const { phoneNumber, error } = useSelector((state: RootState) => state.User);
  console.log(error);
  const [otp, setOtp] = useState<string>('');

  return (
    <div
      id="card"
      style={{ display: 'flex', gap: '30px', flexDirection: 'column' }}
    >
      <div className="text-center font-semibold mt-3">Enter your OTP</div>
      <div>Code is sent to {phoneNumber}</div>

      <div>
        <OtpInput
          value={otp}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={6}
          inputStyle={{
            width: '30px',
            height: '30px',
            margin: '0 8px',
            fontSize: '15px',
            borderRadius: 4,
            border: '0px',
            backgroundColor: '#EEEEEE',
          }}
          separator='-'
          isInputNum
          hasErrored={Boolean(error)}
          errorStyle={{
            border: '1px solid red',
          }}
        />
        {error && (
          <div className="text-red-500">
            Incorrect otp! Please enter correct OTP
          </div>
        )}
      </div>
      <div onClick={() => sendOtp(`${phoneNumber}`)}>
        <div className=" text-[#339AF0]">Resend OTP?</div>
      </div>
      <Button onClick={() => otp && verifyOtp(otp)}>Verify</Button>
    </div>
  );
}
