import { NumberInput, Radio, Text, Checkbox, Collapse } from '@mantine/core';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BackandNextButton from '../component/BackandNextButton';
import { auth, db } from '../configs/firebaseconfig';
import { RootState } from '../store';
import { useForm } from '@mantine/form';
import { IconX } from '@tabler/icons';
import { doc, updateDoc } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';

export default function LiftFacilityPage() {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state: RootState) => state.User);
  const navigate = useNavigate();
  const { orderId } = useParams();

  const form = useForm({
    initialValues: {
      floorNumber: 0,
      lift: false,
      coverAge: false,
      coverAgeAmount: 1000
    }
  });

  return (
    <div className="p-3 max-w-md m-auto pt-10">
      <form onSubmit={form.onSubmit(async (values) => {
        try {
          if (!orderId) return
          setLoading(true)
          await updateDoc(doc(db, "Orders", orderId), {
            queryDetails: form.values,
            status: "queryComplete",
          })
        } catch (error) {
          showNotification({
            id: `reg-err-${Math.random()}`,
            autoClose: 5000,
            title: "Error",
            message: "Something went wrong try again",
            color: "red",
            icon: <IconX />,
            loading: false,
          });
        }
      })}>
        <div className='space-y-10'>
          <div className='space-y-2'>
            <div className="flex gap-6 items-center ">
              <div className="font-semibold">Enter your Floor number?</div>
              <NumberInput
                min={0}
                withAsterisk
                {...form.getInputProps("floorNumber")}
              />
            </div>
            <div className=''>
              <Text size={12} className="w-full md:max-w-md pb-5">
                Note: If the floor number is less than 3, no charges will be
                applied. If the floor number greater than 3 additional charges will
                be applied.
              </Text>
              <Collapse in={form.values.floorNumber > 0}>
                <div className="">
                  <div className="font-semibold">
                    Does your place has lift facility ?
                  </div>
                  <Radio.Group
                    name="lift query"
                    description="the lift should be usable for shifting and moving"
                    withAsterisk
                    {...form.getInputProps("lift")}
                  >
                    <div className='space-y-5 mt-3'>
                      <Radio value="true" label="Yes" />
                      <Radio value="false" label="No" />
                    </div>
                  </Radio.Group>
                </div>
              </Collapse>
            </div>
          </div>
          <div className='space-y-5'>
            <Checkbox
              {...form.getInputProps("coverAge")}
              label={
                <span className="font-semibold">
                  Do you want to cover Transit risk coverage ? Enter the
                  coverage amount :{' '}
                </span>
              }
            />
            <div className='space-y-3'>
              <NumberInput
                min={1000}
                disabled={!form.values.coverAge}
                className="w-48"
                withAsterisk
                {...form.getInputProps("coverAgeAmount")}
              />
              <Text size={12} className="w-full md:max-w-md">
                Note: i&#41; Enter the amount which you feel is the value of your
                items.
                <br />
                ii&#41; The transit risk coverage will be 3.00% of the total goods
                values of the entered amount.
              </Text>
            </div>
          </div>
        </div>
        <div className="my-10 md:w-72 mx-auto w-full">
          <BackandNextButton
            nextDisabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
