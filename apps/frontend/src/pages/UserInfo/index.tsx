import { useSelector } from 'react-redux';
import userInfoImg from '../../assets/img/auth.jpg';
import usePhoneAuth from '../../component/auth';
import { app } from '../../configs/firebaseconfig';
import { RootState } from '../../store';
import FormUserInfo from './FormUserInfo';
import VerifyOtp from './VerifyOtp';

export default function UserInfo() {  
  const { loading, error,step } = useSelector((state: RootState) => state.User);
  // console.log(step);
  // let step: 'phone' | 'otp' = 'otp';
  const { sendOtp, verifyOtp } = usePhoneAuth(app);
  const currentComponent = () => {
    switch (step) {
      case 'phone':
        return <FormUserInfo sendOtp={sendOtp} />;
      case 'otp':
        return <VerifyOtp verifyOtp={verifyOtp} sendOtp={sendOtp} />;
      default:
        return <>unknown error</>;
    }
  };
console.log(step);

  return (
    <div className="w-full min-h-[80vh] bg-[#EDF2FF] flex justify-center items-center">
      <div className=" md:mt-10 w-fit bg-white min-h-[400px] rounded-md px-4 py-5 mx-4 flex">
        <div style={{backgroundImage:`url(${userInfoImg})`}} className=" bg-cover bg-center mx-auto h-[520px] w-96 overflow-hidden">
          {/* <img src={} className=" " alt="awef" /> */}
        </div>
        <div className=" p-3">
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              loading
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
