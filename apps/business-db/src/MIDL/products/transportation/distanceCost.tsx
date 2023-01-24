/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { ActionIcon, TextInput } from '@mantine/core';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { IconCheck, IconX } from '@tabler/icons';
import { doc, updateDoc } from 'firebase/firestore';
import { costRef, defaultErrorMessage } from '../../../constants';
import { setCost } from '../../../store/categorySlice';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environments/environment';
import { Text } from '@mantine/core';
import { HouseTypes, homeType } from '@boxtech/shared-constants';

export default function DistanceCost() {
  const { cost } = useSelector((state: RootState) => state.category);
  const { user } = useSelector((state: RootState) => state.user);
  const [values, setValues] = useState<homeType>({
    '1 BHK': 0,
    "2 BHK": 0,
    '3 BHK': 0,
    '4 BHK & more': 0,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (value: number, name: string) => {
    // const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(cost);

  useEffect(() => {
    if (cost?.distanceCostPerKM['1 BHK']) setValues(cost.distanceCostPerKM);
  }, [cost]);

  const handleSubmit = async (bhk: keyof homeType) => {
    if (cost) {
      try {
        setLoading(true);
        const docRef = doc(costRef, user?.uid);
        await updateDoc(docRef, {
          [`distanceCostPerKM.${bhk}`]: values[bhk],
        });
        dispatch(
          setCost({
            ...cost,
            distanceCostPerKM: values,
          })
        );
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Success!',
          message: 'Cost updated successfully',
          color: 'green',
          icon: <IconCheck />,
          loading: false,
        });
        setValues((prevState) => ({
          ...prevState,
          [bhk]: '',
        }));
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Error!',
          message: environment.production ? defaultErrorMessage : error.message,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      }
    }
  };

  const handleCancel = (bhk: keyof homeType) => {
    setValues((prevState) => ({
      ...prevState,
      [bhk]: cost?.distanceCostPerKM[bhk],
    }));
  };
  return (
    <div className="bg-white p-3">
      <Text component={'h1'} align="left" className="px-3">
        Distance cost
      </Text>
      {Object.keys(values).map((bhk) => (
        <TextInput
          key={bhk}
          label={`Distance cost per KM for ${bhk}`}
          // @ts-ignore
          defaultValue={cost?.distanceCostPerKM[bhk]}
          className="max-w-md text-left px-3"
          classNames={{ rightSection: 'w-16' }}
          left="₹"
          // @ts-ignore
          value={values[bhk]}
          onChange={(e) => handleInputChange(parseFloat(e.target.value), bhk)}
          rightSection={
            // @ts-ignore
            values[bhk] && (
              <div className="flex -m-10">
                <ActionIcon
                  color={'violet'}
                  variant="light"
                  loading={loading}
                  // @ts-ignore
                  onClick={() => handleSubmit(bhk)}
                >
                  <IconCheck />
                </ActionIcon>
                <ActionIcon
                  color={'red'}
                  variant="light"
                  // @ts-ignore
                  onClick={() => handleCancel(bhk)}
                >
                  <IconX />
                </ActionIcon>
              </div>
            )
          }
          type="number"
        />
      ))}
    </div>
  );
}
