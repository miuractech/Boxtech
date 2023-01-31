import React, { useState, useEffect } from 'react'
import { Button, Text, TextInput, Title, Select } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconCheck, IconCircleMinus, IconCirclePlus, IconX } from "@tabler/icons"
import { AddButton } from '../../../utils/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../configs/firebaseconfig';
import { v4 as uuid } from 'uuid';
import { environment } from '../../../environments/environment.prod';
import { defaultErrorMessage } from '../../../constants';
import { showNotification } from '@mantine/notifications';
import { RootState } from '../../../store';

export const AddTrasportationCost = ({ editDetails, activeTab, setModal }: { editDetails: any, activeTab: any, setModal: any }) => {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.user)


    const form = useForm({
        initialValues: {
            propertyType: "",
            peopleCount: "",
            Price: ""
        },

        validate: {
            propertyType: (value) => (value.length < 3 ? 'Property type is requried' : null),
            peopleCount: (values) => (Number(values) <= 0 ? 'People count cannot be 0' : null),
            Price: (values) => (Number(values) <= 0 ? 'Price cannot be a negitive number or 0' : null)
        },
    });

    const countFunction = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        const id = event.currentTarget.id
        if (id === "add") {
            setCount(prev => prev + 1)
            form.setFieldValue("peopleCount", JSON.stringify(count + 1))
        } else if (id === "minus") {
            if (count === 0) return
            setCount(prev => prev - 1)
            form.setFieldValue("peopleCount", JSON.stringify(count - 1))
        }
    }

    console.log(form.errors);
        

    return (
        <form onSubmit={form.onSubmit(async(values) => {
            try {
                setLoading(true)
                const id = uuid()
                const docRef = doc(db, "Cost", id)
                await setDoc(docRef, {
                    ...values,
                    id,
                    category: activeTab,
                    updatedAt: serverTimestamp(),
                    createdBy: user?.email,
                    enabled: false,
                })
                showNotification({
                    id: `reg-err-${Math.random()}`,
                    autoClose: 5000,
                    title: "Success!",
                    message: "Cost added successfully",
                    color: "green",
                    icon: <IconCheck />,
                    loading: false,
                });
                setLoading(false)
                setModal(false)
            } catch (error:any) {
                showNotification({
                    id: `reg-err-${Math.random()}`,
                    autoClose: 5000,
                    title: "Error!",
                    message: environment.production ? defaultErrorMessage : error.message,
                    color: "red",
                    icon: <IconX />,
                    loading: false,
                });
                setModal(false)
                setLoading(false)
            }
        })}>
            <div className='space-y-5 p-5 pt-0'>
                <Title align='center' order={3}>Add Labour Cost</Title>
                <div className='space-y-5'>
                    {/* <Text className='self-center'>Property Type </Text> */}
                    <Select
                        label='Property Type'
                        // className='col-span-2'
                        placeholder="Property Type"
                        data={[
                            { value: '1 BHK', label: '1 BHK' },
                            { value: '2 BHK', label: '2 BHK' },
                            { value: '3 BHK', label: '3 BHK' },
                            { value: '4 BHK', label: '4 BHK' },
                            { value: '5 BHK', label: '5 BHK' },
                        ]}
                        {...form.getInputProps('propertyType')}
                    />
                    <div className='space-y-3'>
                        <Text size={14} weight={600} className='self-center'>People Count </Text>
                        <div className='col-span-2'>
                            <div
                                className='flex gap-x-10'
                            >
                                <IconCircleMinus onClick={(event) => countFunction(event)} id="minus" className='text-red-500 cursor-pointer hover:text-red-800 active:text-red-200' />
                                <Text className='font-bold'>{count}</Text>
                                <IconCirclePlus onClick={(event) => countFunction(event)} id="add" className='text-green-500 cursor-pointer hover:text-green-800 active:text-green-200' />
                            </div>
                            {form.errors['peopleCount'] && <Text color="red" size={12}>{form.errors['peopleCount']}</Text>}
                        </div>
                    </div>
                    {/* <Text className='self-center'>Price </Text> */}
                    <TextInput
                        label='Price'
                        className='col-span-2'
                        placeholder='Price'
                        type="number"
                        {...form.getInputProps('Price')}
                    />
                </div>
                <div className='flex justify-center gap-10'>
                    <Button className='w-24' onClick={() => setModal(false)} variant='outline'>Cancel</Button>
                    <AddButton loading={loading} style={{ width: "96px" }} icon={false} text="Save" />
                </div>
            </div>
       </form>
    )
}
