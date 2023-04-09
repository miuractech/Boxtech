import React, { useState } from 'react';
import { Button, Title } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import india from "../../assets/img/india.png"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

type propsType = {
  sendOtp: (phone: string, success: () => void, failure: () => void) => void;
  form: UseFormReturnType<{
    name: string;
    email: string;
    phoneNumber: string;
  }, (values: {
    name: string;
    email: string;
    phoneNumber: string;
  }) => {
    name: string;
    email: string;
    phoneNumber: string;
  }>
  setId: React.Dispatch<React.SetStateAction<string | null>>

};

export default function FormUserInfo(props: propsType) {
  const { sendOtp, form, setId } = props;
  const [loading, setLoading] = useState(false)

  const success = () => {
    setLoading(false)
  }

  const failure = () => {
    setLoading(false)
  }

  return (
    <form onSubmit={form.onSubmit(async (data) => {
      try {
        setLoading(true)
        sendOtp(`+91${data.phoneNumber}`, success, failure)
        const res = await addDoc(collection(db, "Users"), {
          ...data,
          createdAt: serverTimestamp(),
          verified: false
        })
        setId(res.id)
        setLoading(false)
      } catch (error) {
        console.log(error);
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: "Error",
          message: "Something went wrong try again",
          color: "red",
          icon: <IconX />,
          loading: false,
        });
      }
    })}>
      <div className="w-11/12 m-auto space-y-5">
        <Title align="center" order={2} color="#222629" weight={700}>
          Details
        </Title>
        <TextInput
          withAsterisk
          classNames={{ input: "text-lg font-medium" }}
          placeholder="Enter your Name"
          label="Full Name"
          name='name'
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          placeholder="abc@email.com"
          classNames={{ input: "text-lg font-medium" }}
          label="Email"
          name='email'
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Phone Number"
          classNames={{ input: "text-lg font-medium" }}
          withAsterisk
          placeholder='Enter Phone Number'
          type="number"
          icon={<img src={india} alt="in" className='w-full px-2' />}
          {...form.getInputProps("phoneNumber")}
        />
        <Button loading={loading} size='md' fullWidth type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
