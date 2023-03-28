import { clientInfoType, orderType } from '@boxtech/shared-constants'
import { Text } from '@mantine/core'
import React from 'react'

export const ClientDetails = ({ clientData }: { clientData: clientInfoType }) => {
    return (
        <div className='border-[1px] border-solid border-[#c7cbcd] p-3 rounded-lg'>
            <div className='grid md:grid-cols-3'>
                <div className='text-center md:order-2'>
                    <img src={clientData.logo} alt="logo" className='h-16' />
                </div>
                <div className='grid grid-cols-2 md:order-1 w-fit m-auto'>
                    <div>
                        <Text className='text-sm font-semibold'>PAN No :</Text>
                        <Text className='text-sm font-semibold'>Phone :</Text>
                        <Text className='text-sm font-semibold'>Date :</Text>
                    </div>
                    <div>
                        <Text className='text-sm'>{clientData.panNumber}</Text>
                        <Text className='text-sm'>{clientData.phone}</Text>
                        <Text className='text-sm'>{new Date().toDateString()}</Text>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:order-3 w-fit m-auto'>
                    <div>
                        <Text className='text-sm font-semibold'>GST IN :</Text>
                        <Text className='text-sm font-semibold'>Email Id :</Text>
                        <Text className='text-sm font-semibold'>Quotation :</Text>
                    </div>
                    <div>
                        <Text className='text-sm'>{clientData.gstNumber}</Text>
                        <Text className='text-sm'>{clientData.officialMail}</Text>
                        <Text className='text-sm'>d7XeNri</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}