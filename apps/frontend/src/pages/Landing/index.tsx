import { CatergoryType, HouseTypes } from '@boxtech/shared-constants';
import {
  Button,
  Center,
  Divider,
  Select,
  TextInput,
  Title,
} from '@mantine/core';
import { addDoc, collection, DocumentData, serverTimestamp } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HeroImg from '../../assets/img/Hero.jpg';
import { RootState } from '../../store';
import { costDetailsType, setConfig } from '../../store/OrderReducer';
import { setPhone } from '../../store/authSlice';
import { GetLocation } from './getPlace';
import { db } from '../../configs/firebaseconfig';
import { useState } from 'react';

export default function Landing() {
  const dispatch = useDispatch();
  const { config } = useSelector((state: RootState) => state.order);
  const [phone, setNumber] = useState<any>(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { order } = useSelector((state: RootState) => state);
  const { phoneNumber } = useSelector((state: RootState) => state.User);
  const { clientId } = useParams()
  const {
    from,
    to,
    costDetails,
    transportationCost,
    hasLiftFacility,
    selectedItems,
    userInfo,
    floorNumber,
    insurance
  } = order;
  return (
    <div
      style={{
        background: `url(${HeroImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: window.innerHeight,
      }}
      className="w-full"
    >
      <div className="w-full md:w-1/2 h-full">
        <div className=" py-10 flex items-end md:items-center justify-center h-full text-center">
          <div className="w-full">
            <Title order={1} className="text-white text-shadow mb-4">
              Moving Your Valuables!
            </Title>
            <div className="bg-white rounded-2xl w-11/12 md:w-96 p-8 mx-auto ">
              <GetLocation placeHolder="Enter Pickup Location" field="from" />
              {/* <TextInput placeholder="Enter Pickup Location" /> */}
              <Divider
                orientation="vertical"
                color={'dark'}
                className="h-9 w-1 ml-8 border-l-2"
              />
              {/* <TextInput placeholder="Enter Drop Location" /> */}
              <GetLocation placeHolder="Enter Drop Location" field="to" />
              <Select
                className="my-10"
                placeholder="Select Configuration"
                value={config}
                data={HouseTypes.map((config) => ({
                  value: config,
                  label: config,
                }))}
                onChange={(e) => {
                  dispatch(setConfig(e ?? ''));
                }}
              />
              <TextInput
                placeholder='Enter Phone Number'
                type="number"
                max={9}
                onChange={(e) => {
                  setNumber(e.target.value)
                }}
              />
              <Button
                className="mt-10"
                fullWidth
                onClick={async () => {
                  if (!clientId) return
                  const data = await addDoc(collection(db, "Orders"), {
                    status: 'Created',
                    timeStamp: serverTimestamp(),
                    from,
                    to,
                    config,
                    phone,
                    clientId
                  })
                  navigate(`/quote/${data.id}`)
                  // console.log(pathname.replace("/",''));
                  // navigate('/'+pathname.replace("/",'') + '/items');
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type GooglePlacesType = {
  [x: string]: any;
  coordinates: {
    lat: null | number;
    lng: null | number;
  };
  placeId: null | string;
  addressLine:string;
  address1: string;
  address2: string;
  landmark: string;
};

export type masterFormType = {
  from: GooglePlacesType;
  to: GooglePlacesType;
  config: string;
  selectedItems: categoryItemType[];
  hasLiftFacility: boolean;
  floorNumber: number;
  transportationCost: number;
  costDetails: costDetailsType;
  insurance: number | null;
  userInfo: userInfoType;
};

export type userInfoType = {
  name: string;
  phone: string;
  email: string;
};
export interface categoryItemType extends CatergoryType {
  quantity: number;
  total: number;
}
