import { Button, Select, TextInput } from '@mantine/core'
import { IconFilter } from '@tabler/icons'
import React from 'react'

export const Actions = () => {
    return (
        <div className='grid grid-cols-12 gap-5 my-10 p-5 border-solid bottom-1 border-blue-100 rounded-2xl shadow-sm'>
            <div className='grid grid-cols-8 gap-5 col-span-6'>
                <Select
                    className='col-span-2'
                    classNames={{ input: "bg-gray-200 border-none" }}
                    placeholder="Pick one"
                    data={[
                        { value: 'react', label: 'React' },
                        { value: 'ng', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'vue', label: 'Vue' },
                    ]}
                />
                <TextInput
                    className='col-span-6'
                    classNames={{ input: "bg-gray-200 border-none" }}
                    placeholder='Search here..'
                />
            </div>
            <Button
                className='bg-gray-200 hover:bg-gray-300 active:text-black active:bg-gray-500 text-gray-600 font-extrabold'
            >
                <IconFilter />
                &nbsp;
                Filter
            </Button>
        </div>
    )
}
