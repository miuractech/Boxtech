import React from 'react';
// import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputUserInfo from './InputUserInfo';
import { Button, Title } from '@mantine/core';
import { setEmail, setName, setPhone } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import { setUserInfo } from '../../store/OrderReducer';
type propsType = {
  sendOtp: (phone: string) => void;
};
const userInfo = {
  contact: '',
  email: '',
  fullName: '',
};
const signUpValidation = Yup.object({
  contact: Yup.number()
    .typeError('Enter only numbers')
    .positive('Cannot contain special characters')
    .integer('Cannot contain special characters')
    .min(6000000000, 'Enter valid phone number')
    .max(9999999999, 'Enter valid phone number')
    .required('Phone number is required'),
  email: Yup.string().email('You did something wrong!'),
  fullName: Yup.string()
    .required('You did something wrong!')

    .matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u, 'Insert only normal character'),
});

export default function FormUserInfo(props: propsType) {
  const { sendOtp } = props;
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.number().min(1000000000).max(9999999999).required(),
      })
    ),
  });
  return (
    <form onSubmit={form.onSubmit(data=>{
      setUserInfo(data)
      sendOtp('+91'+data.phone)
      // console.log(data);

    })} className="flex items-center h-full">
      <div className="w-72 gap-y-4 grid">
        <Title align="center" order={3} color="#222629" weight={700}>
          Details
        </Title>
        <TextInput
          withAsterisk
          placeholder="Enter your Name"
          label="Full Name"
          name='name'
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          placeholder="abc@email.com"
          label="Email"
          name='email'
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          placeholder="9999999999"
          label="Phone number"
          name='phone'
          {...form.getInputProps('phone')}
        />
        <Button className="px-4 py-2" type="submit">
          Get OTP
        </Button>
        {/* <Formik
          enableReinitialize
          initialValues={{
            fullName: '',
            email: '',
            contact: '',
          }}
          validationSchema={signUpValidation}
          onSubmit={(val:any) => {
            dispatch(setEmail(val.email));
            dispatch(setName(val.fullName));
            dispatch(setPhone(val.contact));
            console.log(val);
            sendOtp(`+91${val.contact}`);
          }}
        >
          {() => (
            <Form className="text-cemter">
              <InputUserInfo
                name="fullName"
                title="Full Name"
                placeholder="Enter your name"
              />
              <InputUserInfo name="email" title="Email" placeholder="Email id" />
              <InputUserInfo
                name="contact"
                title="Contact"
                placeholder="Enter your mobile number"
              />
              <div className="text-center">
                <Button className="px-4 py-2" type="submit">
                  Get OTP
                </Button>
              </div>
            </Form>
          )}
        </Formik> */}
      </div>
    </form>
  );
}
