import { Loader, ActionIcon } from '@mantine/core';
import { useSelector } from 'react-redux';
import userInfoImg from '../../assets/img/auth.jpg';
import usePhoneAuth from '../../component/auth';
import { app, auth } from '../../configs/firebaseconfig';
import { RootState } from '../../store';
import FormUserInfo from './FormUserInfo';
import VerifyOtp from './VerifyOtp';
import { IconArrowLeft } from '@tabler/icons';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from "yup"
import { useState } from 'react';

export default function UserInfo() {  
  const { loading, step } = useSelector((state: RootState) => state.User);
  const { orderDetails } = useSelector((state: RootState) => state.orderDetails);
  const { sendOtp, verifyOtp } = usePhoneAuth(app);
  const [id, setId] = useState<null | string>(null)
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: orderDetails.phoneNumber.slice(3),
    },
    validate: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phoneNumber: yup.number().min(1000000000).max(9999999999).required(),
      })
    ),
  });

  const currentComponent = () => {
    switch (step) {
      case 'phone':
        return <FormUserInfo sendOtp={sendOtp} form={form} setId={setId} />;
      case 'otp':
        return <VerifyOtp verifyOtp={verifyOtp} data={form.values} id={id} />;
      default:
        return <>unknown error</>;
    }
  };

  return (
    <div className="bg-[#EDF2FF] py-10 px-3">
      <div className=" bg-white rounded-md sm:w-1/2 md:w-3/4  lg:w-3/4 xl:w-7/12 m-auto grid grid-cols-1 md:grid-cols-2 justify-center">
        <div style={{ backgroundImage: `url(${userInfoImg})` }} className=" bg-cover bg-center h-80 md:min-h-[550px] rounded-tl-md rounded-bl-md">
          <ActionIcon variant='light' className='m-5' size="lg">
            <IconArrowLeft color='black' />
          </ActionIcon>
        </div>
        <div className=" p-3 grid items-center">
          {loading ? (
            <div
              className=' p-3 flex justify-center items-center'
            >
              <Loader className='mx-auto' />
            </div>
          ) : (
            currentComponent()
          )}
        </div>
      </div>
      <div id="sign-in-button"></div>
    </div>
  );
}
