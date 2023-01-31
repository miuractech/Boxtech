import React from 'react';
import { HouseTypes } from '@boxtech/shared-constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Divider } from '@mantine/core';
import { Button } from '@mantine/core';
import {
  IconCheck,
  IconCircleMinus,
  IconCirclePlus,
  IconEdit,
  IconX,
} from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { defaultErrorMessage, costRef } from 'apps/business-db/src/constants';
import { showNotification } from '@mantine/notifications';
import { environment } from 'apps/business-db/src/environments/environment.prod';
import { Title } from '@mantine/core';
import { Select } from '@mantine/core';
import { Text } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { AddButton } from 'apps/business-db/src/utils/AddButton';
import { useEffect } from 'react';
import { setCost } from 'apps/business-db/src/store/categorySlice';

const initialValues = {
  name: '',
  cost: 0,
  volumeinFtcube: 0,
  config: '',
};

export default function VehicalCost() {
  const { cost } = useSelector((state: RootState) => state.category);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const mediaQuery = useMediaQuery('(min-width: 640px)');
  const [editDetails, setEditDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues,
    validate: {
      volumeinFtcube: (values) =>
        Number(values) <= 0 ? 'volume cannot be 0' : null,
      name: (values) =>
        String(values).length <= 2 ? 'Name must be atleast 3 char long' : null,
      cost: (values) =>
        Number(values) <= 0 ? 'Price cannot be a negitive number or 0' : null,
    },
  });
  useEffect(() => {
    if (editDetails) form.setValues(editDetails);
    else form.setValues(initialValues);

    return () => {
      form.setValues(initialValues);
    };
  }, [editDetails]);
  return (
    <div className="p-3 md:p-5 bg-white rounded-md ">
      <Text component={'h1'} align='left' className='px-3' >Vehicle cost</Text>
      <div className="flex gap-3 p-3 font-bold items-center border-b text-blue-600">
        <div className="w-20 text-left">Config</div>
        <div className="grow text-left">Name</div>
        <div className="w-20  text-left">Volume</div>
        <div className="w-20">Cost</div>
        <div className="w-20">Action</div>
      </div>
      <Divider size="xs" />
      {HouseTypes.map((config) => (
        <>
          <div className="p-3 flex gap-3 bg-white items-center ">
            <div className="w-20 text-left">{config}</div>
            <div className="grow text-left">
              {cost?.vehicalCost ? cost.vehicalCost[config].name : ''}
            </div>
            <div className="w-20">
              {cost?.vehicalCost ? cost.vehicalCost[config].volumeinFtcube : 0}
            </div>
            <div className="w-20">
              {cost?.vehicalCost ? cost.vehicalCost[config].cost : 0}
            </div>
            <div className="w-20">
              {mediaQuery ? (
                <Button
                  onClick={() =>
                    setEditDetails({ ...cost?.vehicalCost[config], config })
                  }
                  size={mediaQuery ? 'sm' : 'xs'}
                  fullWidth
                  variant="outline"
                >
                  Edit
                </Button>
              ) : (
                <IconEdit
                onClick={() =>
                  setEditDetails({ ...cost?.vehicalCost[config], config })
                }
                />
              )}
            </div>
          </div>
          <Divider size="xs" />
        </>
      ))}
      <Modal
        opened={Boolean(editDetails)}
        onClose={() => {
          setEditDetails(null);
          // setEditDetails(null)
        }}
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              setLoading(true);
              const docRef = doc(costRef, user?.uid);
              await updateDoc(docRef, {
                vehicalCost: {
                  ...cost?.vehicalCost,
                  [form.values.config]: {
                    cost: form.values.cost,
                    volumeinFtcube: form.values.volumeinFtcube,
                    name: form.values.name,
                  },
                },
              });
              dispatch(setCost({...cost,vehicalCost:{
                ...cost?.vehicalCost,
                [form.values.config]:{
                  cost: form.values.cost,
                  volumeinFtcube: form.values.volumeinFtcube,
                  name: form.values.name,
                }
            }}))
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: 'Success!',
                message: 'Cost updated successfully',
                color: 'green',
                icon: <IconCheck />,
                loading: false,
              });
              setLoading(false);
              setEditDetails(null);
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
              setEditDetails(null);
              setLoading(false);
            }
          })}
        >
          <div className="space-y-5 p-5 pt-0">
            <Title align="center" order={3}>
              Update Vehicle Cost
            </Title>
            <div className="space-y-5">
              <TextInput
                label="Vehical Name"
                className="col-span-2"
                placeholder="Truck, Tempo, etc"
                type="text"
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Volume of vehicle"
                className="col-span-2"
                rightSection={
                  <span>
                    Ft<sup>3</sup>
                  </span>
                }
                placeholder="000"
                type="number"
                {...form.getInputProps('volumeinFtcube')}
              />
              {/* <Text className='self-center'>Price </Text> */}
              <TextInput
                label="Price"
                className="col-span-2"
                placeholder="Price"
                type="number"
                {...form.getInputProps('cost')}
              />
            </div>
            <div className="flex justify-center gap-10">
              <Button
                className="w-24"
                onClick={() => setEditDetails(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <AddButton
                loading={loading}
                style={{ width: '96px' }}
                icon={false}
                text="Save"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
