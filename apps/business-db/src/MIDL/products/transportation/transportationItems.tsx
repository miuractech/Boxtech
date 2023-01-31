import { useMediaQuery } from '@mantine/hooks';
import { AddButton } from '../../../utils/AddButton';
import React, { useState } from 'react';
import { Title, Modal } from '@mantine/core';
import LabourCost from './labourCost';
type Props = {
  active: string;
};

export default function TransportationItems({ active }: Props) {
  const mediaQuery = useMediaQuery('(min-width: 640px)');
  const [modal, setModal] = useState(false);
  return (
    <div className="pt-5 sm:p-5 bg-white sm:mb-5 rounded-2xl ">
      <div className="flex justify-end">
        <div>
          <AddButton
            size={!mediaQuery ? 'xs' : 'md'}
            onClick={() => setModal(true)}
            icon={true}
            text={!mediaQuery ? 'Add' : 'Add Cost'}
          />
        </div>
      </div>
      <div className="p-4 md:p-6">
        {active === 'Labour cost' && <LabourCost />}
        {active === 'Vehicle cost' && <LabourCost />}
        {active === 'Cost per km' && <LabourCost />}
      </div>
    </div>
  );
}
