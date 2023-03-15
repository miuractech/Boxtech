import { clientInfoType, CostType, orderType } from '@boxtech/shared-constants'
import { Card, Loader, Text } from '@mantine/core'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../configs/firebaseconfig'
import { ClientDetails } from './clientDetails'
import { PriceBreakup } from './priceBreakup'
import { QuoatTable } from './quoatTable'
import { UserDetails } from './userDetails'

export default function Quoatation() {
    const { clientId, id } = useParams()
    const [data, setData] = useState<orderType | null>(null)
    const [clientData, setClientData] = useState<clientInfoType | null>(null)
    const [clientCostData, setClientCostData] = useState<CostType | null>(null)

    useEffect(() => {
        (async () => {
            if (!clientId || !id) return
            const clientDocument = await getDoc(doc(db, "clients", clientId))
            if (clientDocument.exists()) {
                const res = clientDocument.data() as clientInfoType
                setClientData(res)
                const orderDocument = await getDoc(doc(db, "Orders", id))
                if (orderDocument.exists()) {
                    const response = orderDocument.data() as orderType
                    setData(response)
                    const clientCostDoc = await getDoc(doc(db, "Cost", clientId))
                    if (clientCostDoc.exists()) {
                        const res = clientCostDoc.data() as CostType
                        setClientCostData(res)
                    }
                }
            } else {
                return
            }
        })()
    }, [])

    if (data && clientData && clientCostData) {
        return (
            <div className='bg-[#EDF2FF]'>
                <div className='bg-white  py-5 px-3 rounded-lg space-y-5 max-w-5xl m-auto'>
                    <ClientDetails clientData={clientData} />
                    <UserDetails data={data} />
                    <QuoatTable data={data} clientData={clientData} />
                    <PriceBreakup data={data} clientData={clientData} clientCostData={clientCostData} />
                </div>
            </div>
        )
    } 

    return (
        <div className='bg-[#EDF2FF] h-screen flex justify-center items-center'>
            <Loader />
        </div>
    )
}
