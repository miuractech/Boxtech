import { Button, Checkbox, Text } from '@mantine/core';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { setCostDetails, setTranspotationCost } from '../../store/OrderReducer';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons';
import QuoatationItem from './QuoatationItem';
import axios from 'axios';
import { db } from '../../configs/firebaseconfig';

export default function Quoatation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelNextBtn = () => {
    if (isLogIn) {
      navigate('/booking');
    } else {
      navigate('/userInfo');
    }
  };
  const { selectedItems, costDetails, from, to, config } = useSelector(
    (state: RootState) => state.order
  );
  const { user } = useSelector((state: RootState) => state.User);
  const [isAccecptedTerms, setIsAccecptedTerms] = useState(false);
  const [transportationCost, setTransportationCost] = useState(0);
  const [transportationCostDetails, setTransportationCostDetails] = useState<
    DocumentData[]
  >([]);
  // const addressData: any = address;
  const isLogIn = user ? true : false;
  const [distance, setDistance] = useState(0);
  const calculatDistance = async () => {
    try {
      const { data } = await axios.post(
        'https://asia-south1-miurac-pam.cloudfunctions.net/getDistances',
        {
          to: to?.data?.place_id,
          from: from?.data?.place_id,
        }
      );
      console.log(data);

      const dis: string = data.rows[0].elements[0].distance.text;
      const disKm = Number(dis.split(' ')[0]);
      setDistance(disKm);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateCost = (transportationCost: number) => {
    let itemsCost = 0;
    selectedItems.forEach((item) => {
      itemsCost += item['total'];
    });

    const subTotal = transportationCost + itemsCost;
    const gst = Math.round(subTotal * 0.18);
    dispatch(
      setCostDetails({
        gst,
        subTotal,
        grandTotal: subTotal + gst,
      })
    );
  };
  const getTranspotationCost = async () => {
    const costRef = query(
      collection(db, 'Cost'),
      where('propertyType', '==', config)
    );
    const res = await getDocs(costRef);
    let cost = res.docs.map((doc) => doc.data());
    console.log(cost);
    cost = cost.map((doc) => {
      doc['total'] = doc['Price'];
      if (doc['category'] === 'Labour cost') {
        doc['total'] = doc['Price'];
      }
      if (doc['category'] === 'Cost per km') {
        doc['total'] = Math.round(Number(doc['Price']) * distance);
      }
      return doc;
    });
    let TranspotationCost = 0;

    cost.forEach((item) => {
      TranspotationCost += +item['total'];
    });
    console.log(TranspotationCost);
    // TranspotationCost += Math.round(TranspotationCost);
    setTransportationCostDetails(cost);
    dispatch(setTranspotationCost(cost));

    setTransportationCost(TranspotationCost);
  };
  useLayoutEffect(() => {
    getTranspotationCost();
  }, [distance]);
  useEffect(() => {
    calculatDistance();
  }, []);
  useEffect(() => {
    calculateCost(transportationCost);
  }, [selectedItems, transportationCost, distance]);

  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="md:min-w-[80vw] md:max-w-[1000px] rounded-md bg-white my-10 py-8 px-4">
        <Text color={'#339AF0'} className="font-semibold text-xl text-center">
          Quoatation
        </Text>

        <div className="">
          <div className="bg-[#E7F5FF] text-[#343A40] font-medium grid grid-cols-6  my-3 rounded">
            <div className="col-span-3  px-4 py-2">Description</div>
            <div className="col-span-1 text-center px-4 py-2">Price</div>
            <div className="col-span-1 sm:block hidden  text-center px-4 py-2">
              Qty
            </div>
            <div className="sm:col-span-1 col-span-2 text-center  px-4 py-2">
              Total
            </div>
          </div>
          <div className="">
            {selectedItems.map((item) => (
              <QuoatationItem key={item['id']} item={item} type={false} />
            ))}

            <div className="px-3 font-medium my-3 text-[#454545]">
              Transportation Cost:
            </div>
            <div className="">
              {transportationCostDetails.map((item) => (
                <QuoatationItem type={true} item={item} />
              ))}
            </div>
          </div>
          <div className="my-2">
            <div className=" text-[#343A40]  grid grid-cols-6 rounded">
              <div className="sm:col-span-5 col-span-4  px-4 ">Sub Total </div>
              <div className="sm:col-span-1 text-center col-span-2 px-4 ">
                Rs.{costDetails.subTotal?.toLocaleString('en-US')}
              </div>
            </div>
            <div className=" text-[#343A40] mb-2 text-sm grid grid-cols-6 rounded">
              <div className="sm:col-span-5 col-span-4  px-4 ">
                Tax (GST) : 18%
              </div>
              <div className="sm:col-span-1 text-center col-span-2 px-4 ">
                Rs.{costDetails.gst?.toLocaleString('en-US')}
              </div>
            </div>
            <div className=" text-[#343A40] border-solid border-0 border-b-2 border-t-2 py-3 border-[#495057] font-bold  grid grid-cols-6 ">
              <div className="sm:col-span-5 col-span-4  px-4 ">GRAND TOTAL</div>
              <div className="sm:col-span-1 text-center col-span-2 px-4 ">
                Rs.{costDetails.grandTotal?.toLocaleString('en-US')}
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="text-[#141517] font-medium ">
              Trems & Conditions
            </div>
            <div className="text-sm text-[#A6A7AB] flex gap-3 mt-3 ">
              <Checkbox
                color="dark"
                onChange={(e) => setIsAccecptedTerms(e.target.checked)}
              />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Potenti
              ac eleifend don parcu nullam odio gravida ultrices dignissim.
              Donec erat mattis fusce est velit. Sed l
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="flex px-8 gap-6 justify-between">
            <Button
              leftIcon={<IconChevronLeft />}
              variant="outline"
              color="#228BE6"
              onClick={() => navigate('/lift')}
            >
              Back
            </Button>
            <Button
              rightIcon={<IconChevronRight />}
              disabled={!isAccecptedTerms}
              onClick={handelNextBtn}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
