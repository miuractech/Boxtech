import { CostType } from '@boxtech/shared-constants'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../configs/firebaseconfig'
import { ClientDetails } from './clientDetails'
import { PriceBreakup } from './priceBreakup'
import { QuoatTable } from './quoatTable'
import { UserDetails } from './userDetails'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'
import { ClientDataType, priceCalculation } from './priceCalculation'
import Lottie from "lottie-react";
import truck from "../../assets/json/truck-loading.json"

export default function Quoatation() {
    const { orderId } = useParams()
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const [clientData, setClientData] = useState<ClientDataType | null>(null)
    const [clientCostData, setClientCostData] = useState<CostType | null>(null)
    const [calculatePrice, setCalculatePrice] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const res = await getDoc(doc(db, "clients", orderDetails.clientId))
                if (res.exists()) {
                    const data = res.data() as ClientDataType
                    setClientData(data)
                    const costResponse = await getDoc(doc(db, "Cost", orderDetails.clientId))
                    if (costResponse.exists()) {
                        const data = costResponse.data() as CostType
                        setClientCostData(data)
                        setCalculatePrice(true)
                    }
                }
            } catch (error) {
                showNotification({
                    id: `reg-err-${Math.random()}`,
                    autoClose: 5000,
                    title: "Error",
                    message: "Something went wrong try again",
                    color: "red",
                    icon: <IconX />,
                    loading: false,
                });
            }
        })()
    }, [orderDetails.clientId, orderId, orderDetails.status])


    useEffect(() => {
        if (calculatePrice && orderDetails && clientData && clientCostData && orderId) {
            priceCalculation(orderDetails, clientData, clientCostData, orderId)
        }
    }, [calculatePrice])

    if (orderDetails.quotation) {
        return (
            <div className='bg-[#EDF2FF] pt-8'>
                <div className='bg-white pb-5 p-3 rounded-lg space-y-5 max-w-5xl m-auto'>
                    <ClientDetails />
                    <div className='md:w-10/12 m-auto'>
                        <UserDetails />
                        <QuoatTable />
                        <PriceBreakup  clientData={clientData} />
                    </div>
                </div>
            </div>
        )
    } 

    return (
        <div className='h-screen flex justify-center items-center'>
            <Lottie animationData={truck} loop={true} className="h-72" />
        </div>
    )
}
