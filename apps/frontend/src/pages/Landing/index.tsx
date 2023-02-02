import { Center, Divider, TextInput, Title } from '@mantine/core';
import React from 'react';
import HeroImg from '../../assets/img/Hero.jpg';
import { GetLocation } from './getPlace';

export default function Landing() {
  return (
    <div
      style={{ background: `url(${HeroImg})`, backgroundPosition: 'center' }}
      className="w-full h-screen bg-contain"
    >
      <div className="w-full md:w-1/2 h-full">
        <div className=" flex items-end md:items-center justify-center h-full text-center">
          <div>
            <Title order={1} className="text-white text-shadow mb-4">
              Moving Your Valuables!
            </Title>
            <div className="bg-white rounded-md w-full md:w-96 p-8 ">
                <GetLocation />
              {/* <TextInput placeholder="Enter Pickup Location" /> */}
              <Divider
                orientation="vertical"
                color={'dark'}
                className="h-9 w-1 ml-8 border-l-2"
              />
              <TextInput placeholder="Enter Drop Location" />
              test
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
