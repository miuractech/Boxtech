import { Divider, Text } from '@mantine/core'
import React from 'react'
import { QuotationDataType, SelectedItem } from './priceCalculation'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

export const QuoatTable = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType
    return (
        <div className='space-y-3'>
            <Text className='font-bold text-center'>Quoatation</Text>
            <div className='text-sm font-semibold  p-1 bg-[#EDF2FF] grid grid-cols-3'>
                <Text>List of items</Text>
                <Text className='justify-self-center'>Dimensions(ft)</Text>
                <Text className='justify-self-center'>Qty</Text>
            </div>
            {quotation.selectedItems.map(item => (
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
