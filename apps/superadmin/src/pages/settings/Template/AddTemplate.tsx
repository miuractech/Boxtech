import { Badge, Button, Card, Group, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import RichTextEditor from '@mantine/rte';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/index';
import { useSelector } from 'react-redux';
import BackButton from '../../../utils/backButton';

export const AddTemplate = () => {
    const mediaQuery = useMediaQuery('(min-width: 600px)');
    const navigate = useNavigate()
    const {Templates} = useSelector((state:RootState)=>state.templates)

    return (
        <div className={`${mediaQuery ? ' p-10' : ' p-3'} rounded-lg`}>
            <div className="w-full flex mb-4 justify-between">
                <BackButton />
                <Title align="center" order={3} className="text-gray-700">
                    Custom Templates
                </Title>
                <div></div>
            </div>
            <div className='grid lg:grid-cols-3 gap-5'>
                {Templates && Templates.map(tem => (
                    <div key={tem.id}>
                        <Card className='hover:shadow-2xl duration-500'>
                            {/* <div className=' overflow-hidden'>
                                <RichTextEditor onChange={() => 0} readOnly value={tem.html} />
                            </div> */}
                            <Group position="apart" mt="md" p={16} mb="lg">
                                <Text weight={500}>{tem.id}</Text>
                                <Badge color="green" variant="light">
                                    live
                                </Badge>
                            </Group>
                            <Button className='active:bg-cyan-100' variant="light" color="blue" fullWidth mt="md" radius="md"
                                onClick={() => navigate(`/settings/mailtemplates/${tem.id}`)}
                            >
                                Edit
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const templates = [
    {
        name: "%20Tutor%20accepted",
        includes: ["{{name}}"],
        subject:"Test Result from Edufeat"
    },
    {
        name: "%20Tutor%20rejected",
        includes: ["{{name}}"],
        subject: "Test Result from Edufeat"
    },
    // {
    //     name: "Test Score",
    //     includes: ["{{name}}", "{{score}}"],
    //     subject: "Test Scores from Edufeat"    
    // },
    {
        name: "%20Sign%20Up",
        includes: [],
        subject: "Become an Edufeat Subject Matter Expert today!"
    }
]