import React, { useState } from 'react';
import { ActionIcon, TextInput } from '@mantine/core';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { IconCheck, IconX } from '@tabler/icons';
import { doc, updateDoc } from 'firebase/firestore';
import { costRef, defaultErrorMessage } from '../../../constants';
import { setCost } from '../../../store/categorySlice';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environments/environment.prod';
import { Text } from '@mantine/core';


export default function PackingCost() {
  const { cost } = useSelector((state: RootState) => state.category);
  const { user } = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState<number | null>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className='bg-white p-3'>
      <Text component={'h1'} align='left' className='px-3' >Packing cost</Text>

      <TextInput
      label="Distance cost per KM"
      className="max-w-md text-left px-3"
      classNames={{ rightSection: 'w-16' }}
      defaultValue={cost?.packingCostPerCubeM}
      left="₹"
      value={value??cost?.packingCostPerCubeM}
      rightSection={
        value && (
          <div className="flex -m-10">
            <ActionIcon color={'violet'} variant="light"
            loading={loading}
            onClick={async()=>{
              try {
                setLoading(true);
                const docRef = doc(costRef, user?.uid);
                await updateDoc(docRef, {
                  packingCostPerCubeM:value
                });
                dispatch(setCost({...cost,packingCostPerCubeM:value}))
                showNotification({
                  id: `reg-err-${Math.random()}`,
                  autoClose: 5000,
                  title: 'Success!',
                  message: 'Cost updated successfully',
                  color: 'green',
                  icon: <IconCheck />,
                  loading: false,
                });
                setValue(null)
                setLoading(false);
              } catch (error: any) {
                showNotification({
                  id: `reg-err-${Math.random()}`,
                  autoClose: 5000,
                  title: 'Error!',
                  message: environment.production
                    ? defaultErrorMessage
                    : error.message,
                  color: 'red',
                  icon: <IconX />,
                  loading: false,
                });
                setLoading(false);
              }
            }}
            >
              <IconCheck />
            </ActionIcon>
            <ActionIcon color={'red'} variant="light" onClick={()=>setValue(null)} disabled={loading} >
              <IconX />
            </ActionIcon>
          </div>
      )
    }
    onChange={(e) => {
      if (e.target.value) setValue(parseInt(e.target.value));
    }}
    placeholder="0"
    type="number"
    />
    </div>
  )
}