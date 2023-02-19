import { clientInfoType, orderType, SelectedItem } from '@boxtech/shared-constants'
import { Divider, Text } from '@mantine/core'
import React from 'react'

export const QuoatTable = ({ clientData, data }: { data: orderType, clientData: clientInfoType }) => {
    return (
        <div className='space-y-3'>
            <Text className='font-bold text-center'>Quoatation</Text>
            <div className='text-sm font-semibold flex justify-between p-1 bg-[#EDF2FF]'>
                <Text>List of items</Text>
                <Text>Dimensions(ft)</Text>
                <Text>Qty</Text>
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
            <div className='flex justify-between text-sm p-1'>
                <Text>{item.Name}</Text>
                <Text>{item.Length}x{item.Breadth}x{item.Height}</Text>
                <Text>{item.quantity}</Text>
            </div>
            <Divider />
        </div>
    )
}
