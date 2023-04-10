import React from 'react'
import Lottie from "lottie-react";
import success from "../assets/json/paymentSuccess.json"
import { ActionIcon, Button, CopyButton, Text, Title, Tooltip, Textarea, Rating } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { IconCheck, IconCopy } from '@tabler/icons';

const SuccessPage = () => {
  const { orderId } = useParams()
  return (
      <div className='pb-10'>
      <Lottie animationData={success} loop={true} className="h-72" />
      <Title align='center' order={2} color="green">Quotation Generated</Title>
      <div className='max-w-3xl m-auto mt-10 space-y-5'>
        <div className='grid grid-cols-2'>
          <div className='justify-self-end'>
            <Text className='w-32'>Order ID :</Text>
          </div>
          <div className='flex gap-5'>
            <Text>{orderId}</Text>
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
        <div className='grid grid-cols-2'>
          <div className='justify-self-end'>
            <Text className='w-32'>Quotation Link :</Text>
          </div>
          <div className='flex gap-5'>
            <Text>localhost:4202/{orderId}/quoation</Text>
            <CopyButton value={`https://localhost:4202/${orderId}/quoation`} timeout={2000}>
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
        <Button onClick={() => {
          console.log('dv');
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
  )
}

export default SuccessPage;
