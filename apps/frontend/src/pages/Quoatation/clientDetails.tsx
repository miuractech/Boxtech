import { Text } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { QuotationDataType } from './priceCalculation'
import spacetime from 'spacetime';

export const ClientDetails = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType

    return (
        <div className='border-[1px] border-solid border-[#c7cbcd] p-3 rounded-lg'>
            <div className='grid md:grid-cols-3'>
                <div className='text-center md:order-2'>
                    <img src={quotation.header.logo} alt="logo" className='h-16' />
                </div>
                <div className='grid grid-cols-2 md:order-1 w-fit m-auto'>
                    <div>
                        <Text className='text-sm font-semibold'>PAN No :</Text>
                        <Text className='text-sm font-semibold'>Phone :</Text>
                        <Text className='text-sm font-semibold'>Date :</Text>
                    </div>
                    <div>
                        <Text className='text-sm'>{quotation.header.PAN}</Text>
                        <Text className='text-sm'>{quotation.header.phoneNumber}</Text>
                        {quotation.header.date &&
                            <Text className='text-sm'>{spacetime(quotation.header.date.seconds).format('nice')}</Text>}
                    </div>
                </div>
                <div className='grid grid-cols-2 md:order-3 w-fit m-auto'>
                    <div>
                        <Text className='text-sm font-semibold'>GST IN :</Text>
                        <Text className='text-sm font-semibold'>Email Id :</Text>
                        <Text className='text-sm font-semibold'>Quotation :</Text>
                    </div>
                    <div>
                        <Text className='text-sm'>{quotation.header.gstin}</Text>
                        <Text className='text-sm'>{quotation.header.email}</Text>
                        <Text className='text-sm'>{quotation.header.quotationNumber}</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}