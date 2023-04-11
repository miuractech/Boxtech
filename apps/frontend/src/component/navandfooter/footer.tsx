import React from 'react'
import { Title, Button, Text } from "@mantine/core"
import { ClientDataType } from '../../pages/Quoatation/priceCalculation'
export const Footer = ({ clientData }: { clientData: ClientDataType | null }) => {
    return (
        <div className='bg-[#222629]'>
            <div className='grid grid-cols-12'>
                <div className='p-10 col-span-3'>
                    <Title className='text-white'>{clientData?.brandName}</Title>
                </div>
                <div className='p-10 col-span-9 justify-self-center'>
                    <Button>Terms and Conditions</Button>
                    <Button>Privacy policy</Button>
                </div>
            </div>
            <div className='pt-10 pb-3'>
                <Text className='text-white' align='center' size={10}>Copyright © 2022 Miurac Pvt Ltd. All Rights Reserved.</Text>
            </div>
        </div>
    )
}
