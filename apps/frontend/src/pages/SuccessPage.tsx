import React from 'react'
import Lottie from "lottie-react";
import success from "../assets/json/paymentSuccess.json"
import { ActionIcon, Button, CopyButton, Text, Title, Tooltip } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { IconCheck, IconCopy } from '@tabler/icons';

export default () => {
  const { clientId, id, razorpayID } = useParams()
  const navigate = useNavigate()
  return (
      <div className='pb-10'>
      <Lottie animationData={success} loop={true} className="h-72" />
      <Title align='center' order={2} color="green">Payment Successfull</Title>
      <div className='max-w-3xl m-auto mt-10 space-y-5'>
        <div className='grid grid-cols-2'>
          <div className='justify-self-end'>
            <Text className='w-32'>Order ID :</Text>
          </div>
          <div className='flex gap-5'>
          <Text>{id}</Text>
            <CopyButton value={id??""} timeout={2000}>
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
            <Text className='w-32'>Razor pay ID :</Text>
          </div>
          <div className='flex gap-5'>
            <Text>{razorpayID}</Text>
            <CopyButton value={razorpayID ?? ""} timeout={2000}>
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
        <Button onClick={() => navigate(`/${clientId}`)}>Back to Home</Button>
      </div>
    </div>
  )
}
