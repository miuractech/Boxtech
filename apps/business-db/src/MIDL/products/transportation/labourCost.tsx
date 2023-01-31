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
  labourCount: 0,
  cost: '',
  config: '',
};
export default function LabourCost() {
  const { cost } = useSelector((state: RootState) => state.category);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const mediaQuery = useMediaQuery('(min-width: 640px)');
  const [editDetails, setEditDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  console.log(cost);

  const form = useForm({
    initialValues,
    validate: {
      labourCount: (values) =>
        Number(values) <= 0 ? 'People count cannot be 0' : null,
      cost: (values) =>
        Number(values) <= 0 ? 'Price cannot be a negitive number or 0' : null,
    },
  });

  const countFunction = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const id = event.currentTarget.id;
    if (id === 'add') {
      form.setFieldValue('labourCount', form.values.labourCount + 1);
    } else if (id === 'minus') {
      if (form.values.labourCount === 0) return;
      form.setFieldValue('labourCount', form.values.labourCount - 1);
    }
  };

  useEffect(() => {
    if (editDetails) form.setValues(editDetails);
    else form.setValues(initialValues);

    return () => {
      form.setValues(initialValues);
    };
  }, [editDetails]);

  return (
    <div className="p-3 md:p-5 bg-white rounded-md ">
      <Text component={'h1'} align='left' className='px-3' >Labour cost</Text>
      <div className="flex gap-3 p-3 font-bold items-center border-b text-blue-700">
        <div className="grow text-left">Config</div>
        <div className="w-20  text-left">Labours</div>
        <div className="w-20">Cost</div>
        <div className="w-20">Action</div>
      </div>
      <Divider size="xs" />
      {HouseTypes.map((config) => (
        <>
          <div className="p-3 flex gap-3 bg-white items-center border-b">
            <div className="grow text-left">{config}</div>
            <div className="w-20 text-left">
              {cost?.labourCost ? cost.labourCost[config].labourCount : 0}
            </div>
            <div className="w-20">
              {cost?.labourCost ? cost.labourCost[config].cost : 0}
            </div>
            <div className="w-20">
              {mediaQuery ? (
                <Button
                  onClick={() =>
                    setEditDetails({ ...cost?.labourCost[config], config })
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
                    setEditDetails({ ...cost?.labourCost[config], config })
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
                labourCost: {
                  ...cost?.labourCost,
                  [form.values.config]: {
                    cost: form.values.cost,
                    labourCount: form.values.labourCount,
                  },
                },
              });
              dispatch(
                setCost({
                  ...cost,
                  labourCost: {
                    ...cost?.labourCost,
                    [form.values.config]: {
                      cost: form.values.cost,
                      labourCount: form.values.labourCount,
                    },
                  },
                })
              );
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: 'Success!',
                message: 'Cost added successfully',
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
              Add Labour Cost
            </Title>
            <div className="space-y-5">
              <div className="space-y-3">
                <Text size={14} weight={600} className="self-center">
                  People Count{' '}
                </Text>
                <div className="col-span-2">
                  <div className="flex gap-x-10">
                    <IconCircleMinus
                      onClick={(event) => countFunction(event)}
                      id="minus"
                      className="text-red-500 cursor-pointer hover:text-red-800 active:text-red-200"
                    />
                    <Text className="font-bold">{form.values.labourCount}</Text>
                    <IconCirclePlus
                      onClick={(event) => countFunction(event)}
                      id="add"
                      className="text-green-500 cursor-pointer hover:text-green-800 active:text-green-200"
                    />
                  </div>
                  {form.errors['labourCount'] && (
                    <Text color="red" size={12}>
                      {form.errors['labourCount']}
                    </Text>
                  )}
                </div>
              </div>
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
