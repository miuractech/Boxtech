import React from 'react';
import { ClientDataType } from '../../pages/Quoatation/priceCalculation';
import { Button } from '@mantine/core';
import { IconPhone } from '@tabler/icons';

export const Nav = ({ clientData }: { clientData: ClientDataType | null }) => {
  return (
    <div className="flex px-10 bg-transparent items-center justify-between">
      <div className="h-16 ">
        <img
          src={clientData?.logo}
          alt={clientData?.brandName}
          className="h-full"
        />
      </div>

      <div>
      <a href={`tel:${clientData?.phone}`} >
        <Button variant="white" leftIcon={<IconPhone fill='black' stroke={1} size={18} />}>
          {clientData?.phone}
        </Button>

      </a>
      </div>
    </div>
  );
};
