import { Container, LoadingOverlay } from '@mantine/core';
import React from 'react';
import AuthForm from './authForm';

export default function Admin() {
  return (
    <React.Suspense
      fallback={<LoadingOverlay visible={true} overlayBlur={2} />}
    >
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
      </Container>
    </React.Suspense>
  );
}

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
