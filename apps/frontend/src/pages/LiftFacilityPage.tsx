import { NumberInput, Radio, Text, Checkbox } from '@mantine/core';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BackandNextButton from '../component/BackandNextButton';
import { auth } from '../configs/firebaseconfig';
import { RootState } from '../store';
import {
  setFloorNumber,
  setInsurance,
  setLiftFacility,
} from '../store/OrderReducer';

export default function LiftFacilityPage() {
  const { hasLiftFacility, floorNumber, insurance } = useSelector(
    (state: RootState) => state.order
  );
  const { user } = useSelector((state: RootState) => state.User);
  const navigate = useNavigate();
  const params = useParams();
  const handelNextBtn = async () => {
    if (floorNumber) {
      if (user) {
        await signOut(auth);
      }
      navigate(`/${params['clientId']}/userInfo`);
    }
  };
  const dispatch = useDispatch();

  return (
    <div className="p-3">
      <div className="md:w[80vw] min-h-[500px] md:min-h-[60vh]  flex justify-center items-center align-middle">
        <div>
          <div className="flex gap-6 items-center ">
            <div className=" font-semibold">Enter your Floor number?</div>
            <div className="">
              <NumberInput
                value={floorNumber}
                min={0}
                onChange={(e) => {
                  if (e && e >= 0) dispatch(setFloorNumber(e));
                }}
                // placeholder="Your age"
                // label="Your age"

                withAsterisk
              />
            </div>
          </div>
          <Text size={12} className="w-full md:max-w-md">
            Note: If the floor number is less than 3, no charges will be
            applied. If the floor number greater than 3 additional charges will
            be applied.
          </Text>
          {floorNumber > 1 && (
            <>
              <div className="text-center my-10"></div>
              <div className="mt-8 mb-2">
                <div className="font-semibold">
                  Does your place has lift facility ?
                </div>
                <div className=" flex relative">
                  <Radio.Group
                    name="lift query"
                    // label="Select your favorite framework/library"
                    description="the lift should be usable for shifting and moving"
                    withAsterisk
                    value={hasLiftFacility ? 'true' : 'false'}
                    onChange={(e) =>
                      dispatch(setLiftFacility(e === 'true' ? true : false))
                    }
                  >
                    <Radio value={'true'} label="Yes" />
                    <Radio value="false" label="No" />
                  </Radio.Group>
                </div>
              </div>
            </>
          )}
          <div className="mt-12 gap-4 grid">
            <Checkbox
              value={'true'}
              checked={Boolean(insurance)}
              // classNames={{body:'flex items-center'}}
              label={
                <span className="font-semibold">
                  {' '}
                  Do you want to cover Transit risk coverage ? Enter the
                  coverage amount :{' '}
                </span>
              }
              onChange={(e) => {
                if (e.target.checked) dispatch(setInsurance(1000));
                else dispatch(setInsurance(null));
              }}
            />
            <NumberInput
              value={insurance ?? 0}
              min={1000}
              disabled={!insurance}
              onChange={(e) => {
                if (e && e >= 1000) dispatch(setInsurance(e));
              }}
              className="w-48"
              // placeholder="Your age"
              // label="Your age"

              withAsterisk
            />
          </div>
          <Text size={12} className="w-full md:max-w-md">
            Note: i&#41; Enter the amount which you feel is the value of your
            items.
            <br />
            ii&#41; The transit risk coverage will be 3.00% of the total goods
            values of the entered amount.
          </Text>
        </div>
      </div>
      <div className="my-10 md:w-72 mx-auto w-full">
        <BackandNextButton
          nextDisabled={!floorNumber}
          handelNextBtn={handelNextBtn}
        />
      </div>
    </div>
  );
}
