import React from 'react'
import { ClientDataType } from '../../pages/Quoatation/priceCalculation'
import { Title } from "@mantine/core"

export const Nav = ({ clientData }: { clientData: ClientDataType | null }) => {

    return (
        <div className='h-16 flex px-10'>
            <img src={clientData?.logo} alt={clientData?.brandName} className='h-full' />
        </div>
    )
}
