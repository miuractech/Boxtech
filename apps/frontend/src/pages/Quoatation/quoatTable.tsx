import { clientInfoType, orderType, SelectedItem } from '@boxtech/shared-constants'
import { Divider, Text } from '@mantine/core'
import React from 'react'

export const QuoatTable = ({ clientData, data }: { data: orderType, clientData: clientInfoType }) => {
    return (
        <div className='space-y-3'>
            <Text className='font-bold text-center'>Quoatation</Text>
            <div className='text-sm font-semibold  p-1 bg-[#EDF2FF] grid grid-cols-3'>
                <Text>List of items</Text>
                <Text className='justify-self-center'>Dimensions(ft)</Text>
                <Text className='justify-self-center'>Qty</Text>
            </div>
            {data.selectedItems.map(item => (
                <Items item={item} />
            ))}
        </div>
    )
}

const Items = ({ item }: { item: SelectedItem }) => {
    return (
        <div>
            <div className='grid grid-cols-3 text-sm p-1'>
                <Text>{item.Name}</Text>
                <Text className='justify-self-center'>{item.Length}x{item.Breadth}x{item.Height}</Text>
                <Text className='justify-self-center'>{item.quantity}</Text>
            </div>
            <Divider />
        </div>
    )
}
