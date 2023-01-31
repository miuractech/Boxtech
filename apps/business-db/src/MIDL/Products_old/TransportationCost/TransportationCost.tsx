import { Tabs, Text, SegmentedControl } from '@mantine/core'
import React, { useState, useEffect } from 'react'
// import { Content } from './Content'
import { IconCaretLeft, IconCaretRight } from "@tabler/icons"
import { TransportContent } from './TransportContent';

export const TransportationCost = () => {
  const [activeTab, setActiveTab] = useState<string>('Labour cost');
  const [tab, setTab] = useState<number>(1)

  const clicked = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const side = event.currentTarget.id
    if (side === "left" && tab > 1) {
      setTab(prev => prev - 1)
    } else if (side === "right" && tab <= 2) {
      setTab(prev => prev + 1)
    }
  }

  console.log(activeTab);

  useEffect(() => {
    setActiveTab(array[tab - 1].name)
  }, [tab])

  return (
    <div>
      <div className="hidden sm:block text-center">
        <SegmentedControl
          className='bg-[#e3e4ea]'
          fullWidth
          value={activeTab}
          onChange={setActiveTab}
          data={array}
        />
        <TransportContent activeTab={activeTab} />
      </div>
      <div className='sm:hidden'>
        <div className='h-12 px-5 text-blue-900 grid grid-cols-5 items-center bg-[#dbdde9] '>
          <IconCaretLeft id='left' className='cursor-pointer' onClick={(event) => clicked(event)} />
          <Text align='center' className='col-span-3'>{activeTab}</Text>
          <IconCaretRight id='right' className='justify-self-end cursor-pointer' onClick={(event) => clicked(event)} />
        </div>
        <TransportContent activeTab={activeTab} />
      </div>
    </div>
  )
}

const array = [
  {
    name: "Labour cost",
    id: "Labour cost",
    label: "Labour cost",
    value: "Labour cost",
  },
  {
    name: "Vehicle cost",
    id: "Vehicle cost",
    label: "Vehicle cost",
    value: "Vehicle cost"

  },
  {
    name: "Cost per km",
    id: "Cost per km",
    label: "Cost per km",
    value: "Cost per km"
  }
]
