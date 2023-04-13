import React from 'react';
import { Title, Button, Text } from '@mantine/core';
import { ClientDataType } from '../../pages/Quoatation/priceCalculation';
import { IconMail, IconPhone } from '@tabler/icons';
export const Footer = ({
  clientData,
}: {
  clientData: ClientDataType | null;
}) => {
  return (
    <div className="bg-[#222629] md:px-6 font-thin xl:px-60">
      <div className="grid grid-cols-12 text-white">
        <div className="p-10 col-span-12 md:col-span-3  ">
          <Title className="">{clientData?.brandName}</Title>
          <Text>{clientData?.address}</Text>
          <Text>{clientData?.pincode}</Text>
        </div>
        <div className="p-10 col-span-12 md:col-span-9 justify-self- md:justify-self-end">
          <div>
            <Button>Terms and Conditions</Button>
          </div>
          <div>
            <Button>Privacy policy</Button>
          </div>
          <a href={`mailto:${clientData?.officialMail}`} >
          <Button className="flex items-center ">
            <IconMail size={20} stroke={1} /> &ensp; {clientData?.officialMail}
          </Button>
          </a>
          <a href={`tel:${clientData?.phone}`} >
          <Button className="flex items-center">
            <IconPhone size={20} stroke={1} /> &ensp; {clientData?.phone}
          </Button>
          </a>
        </div>
      </div>
      <div className="pt-10 pb-3">
        <Text className="text-white" align="center" size={10}>
          Copyright © 2022 Miurac Pvt Ltd. All Rights Reserved.
        </Text>
      </div>
    </div>
  );
};
