import React, { useState } from 'react'
import Lottie from "lottie-react";
import success from "../assets/json/paymentSuccess.json"
import { ActionIcon, Button, CopyButton, Text, Title, Tooltip, Textarea, Rating } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { IconCheck, IconCopy } from '@tabler/icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../configs/firebaseconfig';

const SuccessPage = () => {
  const { orderId } = useParams()
  const [loading, setLoading] = useState(false)
  return (
    <div className='bg-[#EDF2FF]'>
      <div className='p-5 w-fit m-auto bg-white'>
        <Lottie animationData={success} loop={true} className="h-72" />
        <Title align='center' order={2} color="green">Quotation Generated</Title>
        <div className='mt-10 space-y-5'>
          <div className=''>
            <div className='justify-self-end'>
              <Text className='text-gray-500 text-sm'>Order ID :</Text>
            </div>
            <div className='flex gap-5'>
              <Text className='text-md font-semibold'>{orderId}</Text>
              <CopyButton value={orderId ?? ""} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                      {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </div>
          </div>
          <div className=''>
            <div className='justify-self-end'>
              <Text className='text-gray-500 text-sm'>Quotation Link :</Text>
            </div>
            <div className='flex gap-5'>
              <Text className='text-md font-semibold'>localhost:4202/{orderId}/quoation</Text>
              <CopyButton value={`https://localhost:4202/order/${orderId}/quoation`} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                      {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </div>
          </div>
        </div>
        <div className='text-center my-10'>
          <Button
            loading={loading}
            onClick={async () => {
              if (!orderId) return
              setLoading(true)
              await updateDoc(doc(db, "Orders", orderId), {
                status: "bookingConfirmed",
              })
              setLoading(false)
            }}>Go Back</Button>
        </div>
        <div className='max-w-2xl m-auto space-y-5'>
          <Rating
            defaultValue={2}
            size="xl"
            className='m-auto'
          />
          <Textarea
            label="FeedBack"
            placeholder='Optional'
          />
        </div>
      </div>
    </div>
  )
}

export default SuccessPage;
