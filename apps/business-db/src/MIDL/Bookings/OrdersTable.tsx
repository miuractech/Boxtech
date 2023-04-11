import { Badge, Button, Stepper, Text } from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons';
import React, { useState } from 'react'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component'
import spacetime from 'spacetime';

export const OrdersTable = ({ orderData }: {
    orderData: any[]
}) => {


    const columns = [
        {
            name: 'Created At',
            selector: (row: any) => spacetime(row.createdAt.seconds * 1000).format('nice'),
        },
        {
            name: 'Email',
            selector: (row: any) => row.email,
        },
        {
            name: 'Status',
            selector: (row: any) => {
                switch (row.status) {
                    case "Created":
                        return <Badge>{row.status}</Badge>
                    default: return <Badge>{row.status}</Badge>
                }
            },
        },
        {
            name: 'Phone',
            selector: (row: any) => row.phone,
        },
       
        {
            name: 'Config',
            selector: (row: any) => row.config,
        },
        {
            name: 'Quotation',
            selector: (row: any) => <Button size='xs' variant='outline'>View Quotation</Button>,
        },
    ];

    const ExpandedComponent: React.FC<ExpanderComponentProps<any>> = ({ data }) => {
        return (
            <div className='grid md:grid-cols-2'>
                <div className='px-5 py-10'>
                    <Stepper
                        active={-1}
                        orientation="vertical"
                        allowNextStepsSelect={false}
                    >
                        <Stepper.Step
                            allowStepClick={false}
                            allowStepSelect={false}
                            icon={<IconCurrentLocation color='teal' />}
                            description={<div>
                                <Text>{data.directions?.from?.address1}</Text>
                                <Text>{data.directions?.from?.address2}</Text>
                                <Text>{data.directions?.from?.landmark}</Text>
                            </div>}
                        />
                        <Stepper.Step
                            icon={<IconCurrentLocation color='teal' />}
                            description={<div>
                                <Text>{data.directions?.to?.address1}</Text>
                                <Text>{data.directions?.to?.address2}</Text>
                                <Text>{data.directions?.to?.landmark}</Text>
                            </div>}
                        />
                    </Stepper>
                </div>
            </div>
        )
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={orderData}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    )
}
