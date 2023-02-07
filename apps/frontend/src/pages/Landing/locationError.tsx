import { Modal } from '@mantine/core';
import { Title } from '@mantine/core';
import { IconCurrentLocationOff } from '@tabler/icons';
import React from 'react';
import Guide1 from "../../assets/img/locationGuide1.png"
import Guide2 from "../../assets/img/locationGuide2.png"
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationError({ open, setOpen }: Props) {
  return (
    <Modal opened={open} onClose={() => setOpen(false)} title={<Title order={5} className="self-center flex items-center">
    <IconCurrentLocationOff color="red" size={18} />
    &ensp;
    &ensp;
    <span>Location Access denied</span>
  </Title>}>
      <div>
        <div>
        Step 1
        </div>
        <img src={Guide1} className='w-full' alt="guide1" />
      </div>
      <div>
        <div>
        Step 2
        </div>
        <img src={Guide2} className='w-full' alt="guide2" />
      </div>
    </Modal>
  );
}
