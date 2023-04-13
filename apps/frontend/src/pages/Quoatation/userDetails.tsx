import { Text } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { QuotationDataType } from './priceCalculation';
import spacetime from 'spacetime';

export const UserDetails = () => {
  const { orderDetails } = useSelector(
    (state: RootState) => state.orderDetails
  );
  const quotation = orderDetails.quotation as QuotationDataType;
  console.log(new Date(quotation.to.movementDate.seconds));
  
  return (
    <div className="space-y-5">
      <div className="bg-[#EDF2FF] p-3 rounded-lg text-sm overflow-hidden">
        <Text className="font-semibold pb-1">To,</Text>
        <div className="grid md:grid-cols-2">
          <span className="grid grid-cols-2 md:flex gap-3">
            <Text className="font-semibold">Mr./ Mrs./ Miss :</Text>
            <Text>{quotation.to.name}</Text>
          </span>
          <span className="grid grid-cols-2 md:flex gap-3">
            <Text className="font-semibold">Email :</Text>
            <Text>{quotation.to.email}</Text>
          </span>
          <span className="grid grid-cols-2 md:flex gap-3">
            <Text className="font-semibold">Phone :</Text>
            <Text>{quotation.to.phoneNumber}</Text>
          </span>
        
          <span className="grid grid-cols-2 md:flex gap-3">
            <Text className="font-semibold">Movement Date :</Text>
            <Text>
              {
                spacetime(quotation.to.movementDate.seconds*1000)
                  .format('nice')
                  .split(',')[0]
              }
              , {quotation.to.movementTime}
            </Text>
          </span>
          <span className="grid grid-cols-2 md:flex gap-3">
            <Text className="font-semibold">From:</Text>
            <Text>{quotation.fromAndTo.from.address1}, {quotation.fromAndTo.from.address2}, {quotation.fromAndTo.from.addressLine}</Text>
          </span>
          <span className="grid grid-cols-2 md:flex gap-3">
            <Text className="font-semibold">To:</Text>
            <Text>{quotation.fromAndTo.to.address1}, {quotation.fromAndTo.to.address2}, {quotation.fromAndTo.to.addressLine}</Text>
          </span>
        </div>  
        <div>
          {quotation.to.landmark}
        </div>
      </div>
      <div>
        <Text className="font-bold text-sm py-5">
          TRANSPORTATION OF USED HOUSEHOLD GOODS FOR PERSONAL USE (GTA)
          SAC-996511
        </Text>
        <Text className="text-sm font-semibold  ">Dear Sir/Madam, </Text>
        <Text className="text-sm">
          We thank you for your valuable enquiry for transportation of used
          household goods from{' '}
          {/* <span className="font-semibold">{quotation.fromAndTo.from.address2}</span> to{' '}
          <span className="font-semibold">{quotation.fromAndTo.to.address2}</span>  */}
          . We
          are pleased to quote our rates for the same as under:
        </Text>
      </div>
    </div>
  );
};
