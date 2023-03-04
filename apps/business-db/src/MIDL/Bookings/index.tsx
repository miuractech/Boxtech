import { Title } from '@mantine/core'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/firebaseconfig'
import { Actions } from './Actions'
import { OrdersTable } from './OrdersTable'

export const Booking = () => {
    const [orderData, setOrderData] = useState<any[]>([])


    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "Orders"), orderBy("timeStamp", "asc")), (snapshot) => {
            setOrderData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        return () => unsub()
    }, [])


    return (
        <div>
            <Title order={2} className="text-gray-500">Booking</Title>
            <Actions />
            <OrdersTable orderData={orderData} />
        </div>
    )
}
