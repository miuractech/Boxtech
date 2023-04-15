<<<<<<< HEAD
import { Container, LoadingOverlay } from '@mantine/core';
import React from 'react';
import AuthForm from './authForm';

export default function Admin() {
=======
import {
  Button,
  Center,
  Container,
  Grid,
  LoadingOverlay,
  Skeleton,
} from '@mantine/core';
import React from 'react';
import LazyImage from '../../utils/LazyImage';
import LOGINIMG from '../../assets/img/auth.svg';
import GOOGLEIMG from '../../assets/img/Google.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, functions } from '../../configs/firebaseconfig';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { environment } from '../../environments/environment';
import { defaultErrorMessage } from '../../constants';
import { httpsCallable } from 'firebase/functions';

const provider = new GoogleAuthProvider();
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function Admin({}: Props) {
>>>>>>> 4fa18d9 (business db products and setting completed)
  return (
    <React.Suspense
      fallback={<LoadingOverlay visible={true} overlayBlur={2} />}
    >
<<<<<<< HEAD
      <Container
        className="mx-auto w-screen p-0 overflow-hidden bg-gray-50"
        fluid
      >
        <div className="flex xl:flex-row flex-col-reverse">
          <div className="w-full  xl:w-2/3 min-h-screen flex items-center justify-center">
            <div className="">
              <div className=" text-4xl my-5 font-semibold">Plans</div>
              <div className="flex gap-3 px-1 flex-wrap justify-center">
                {plans.map((plan, index) => (
                  <PriceCard key={index} {...plan} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-1/2 xl:w-1/3">
            <div className="px-4">
              <AuthForm />
            </div>
          </div>
        </div>
=======
      <Container className="mx-auto" p={0} fluid>
        <Grid p={0}>
          <Grid.Col xs={12} md={8} p={0}>
            <div className="h-screen bg-gray-500 p-10">
              <div className=" text-xl my-5">benefits</div>
              <div className="flex gap-3">
              <Skeleton height={450}  />
              <Skeleton height={450}  />
              </div>
            </div>
          </Grid.Col>
          <Grid.Col xs={12} md={4}>
            <div className="px-4">
              {/* <Center className="flex h-full min-h-[450px] justify-center align-middle mx-10"> */}
              {/* <LazyImage
                  SkeletonProps={{ width: 600 }}
                  imageProps={{
                    src: LOGINIMG,
                    className: 'w-[600px] block mt-24',
                  }}
                  alt="Edufeat-signup"
                /> */}
              <Skeleton h={500} className="mt-20 mb-10" />
              {/* </Center> */}
              {/* <div>
                <Button
                onClick={()=>{
                  const setAdmin = httpsCallable(functions, 'addAdmin')
                  setAdmin({ email: 'giriprathap995@gmail.com' });
                }}
                >set</Button>
              </div> */}
              <Button
                // size="lg"

                className="bg-slate-100 hover:bg-slate-300 text-black m-auto block"
                leftIcon={<img src={GOOGLEIMG} alt="google sign in" />}
                onClick={async () => {
                  try {
                    await signInWithPopup(auth, provider);
                  } catch (error: any) {
                    showNotification({
                      id: `reg-err-${Math.random()}`,
                      autoClose: 5000,
                      title: 'Not Authorised!',
                      message: environment.production
                        ? defaultErrorMessage
                        : error.message,
                      color: 'red',
                      icon: <IconX />,
                      loading: false,
                    });
                  }
                }}
              >
                <span className="font-extrabold">Continue with Google</span>
              </Button>
            </div>
          </Grid.Col>
        </Grid>
>>>>>>> 4fa18d9 (business db products and setting completed)
      </Container>
    </React.Suspense>
  );
}
<<<<<<< HEAD

const PriceCard = ({
  planName,
  price,
  features,
  validity,
  ctaText,
}: planType) => {
  return (
    <div className="bg-yellow-400 rounded-lg shadow-md p-8 text-center w-80">
      <h2 className="text-black font-bold text-2xl mb-4">{planName}</h2>
      <h3 className="text-black font-bold text-4xl mb-8">{price}</h3>
      <ul className="text-left mb-8">
        {features.map((feature, index) => (
          <li key={index} className="mb-4">
            <span className="text-black">{feature}</span>
          </li>
        ))}
      </ul>
      <p className="text-black font-bold text-sm mb-4">
        Valid for {validity}
      </p>
      <button className="bg-black hover:bg-gray-700 text-yellow-400 font-bold py-2 px-4 rounded">
        {ctaText}
      </button>
    </div>
  );
};

const plans = [
  {
    planName: 'Basic',
    price: 'Free',
    features: [
      'Unlimited leads',
      'google map integration',
      'pricing management',
      'OTP verified users',
      'Slot booking',
      'Advance payment',
    ],
    validity: 'forever',
    ctaText: 'Sign up',
  },
  {
    planName: 'Premium',
    price: '₹499/month',
    features: [
      'everything in basic',
      'staff accounts',
      'Full payment',
      'Free website',
      'Analytics',
      'Proirity support',
    ],
    validity: 'forever',
    ctaText: 'Sign up',
  },
];

type planType = {
  planName: string;
  price: string;
  features: string[];
  validity: string;
  ctaText: string;
};
=======
>>>>>>> 4fa18d9 (business db products and setting completed)
