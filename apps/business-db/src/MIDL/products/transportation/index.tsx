import { Tabs, Text, SegmentedControl } from '@mantine/core';
import React, { useState, useEffect } from 'react';
// import { Content } from './Content'
import { IconCaretLeft, IconCaretRight } from '@tabler/icons';
import TransportationItems from './transportationItems';
import LabourCost from './labourCost';
import VehicalCost from './vehicalCost';
import DistanceCost from './distanceCost';
import PackingCost from './packingCost';
// import { TransportContent } from './TransportContent';

export const TransportationCost = () => {
  const [activeTab, setActiveTab] =
    useState<TransportationSegmentsType>('Labour cost');
  const [tab, setTab] = useState<number>(1);

  const clicked = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const side = event.currentTarget.id;
    if (side === 'left' && tab > 1) {
      setTab((prev) => prev - 1);
    } else if (side === 'right' && tab <= 3) {
      setTab((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setActiveTab(TransportationSegments[tab - 1]);
  }, [tab]);

  return (
    <div className='pb-12' >
      {/* <div className="hidden sm:block text-center"> */}
        {/* <SegmentedControl
          className="bg-[#e3e4ea]"
          fullWidth
          value={activeTab}
          onChange={(t: TransportationSegmentsType) => setActiveTab(t)}
          data={TransportationSegments.map((d) => ({
            name: d,
            id: d,
            label: d,
            value: d,
          }))}
        /> */}
{/*         
        {activeTab === 'Labour cost' && <LabourCost />}
        {activeTab === 'Vehicle cost' && <VehicalCost />}
        {activeTab === 'Distance cost' && <DistanceCost />}
        {activeTab === 'Packing cost' && <PackingCost />} */}
        <LabourCost />
         <VehicalCost />
        <DistanceCost />
         <PackingCost />
      {/* </div> */}
      {/* <div className="sm:hidden">
        <div className="h-12 px-5 text-blue-900 grid grid-cols-5 items-center bg-[#dbdde9] "> */}
          {/* <IconCaretLeft
            id="left"
            className="cursor-pointer"
            onClick={(event) => clicked(event)}
          />
          <Text align="center" className="col-span-3">
            {activeTab}
          </Text>
          <IconCaretRight
            id="right"
            className="justify-self-end cursor-pointer"
            onClick={(event) => clicked(event)}
          />
        </div> */}

        {/* <div className="p-4 md:p-6">
        <LabourCost />
         <VehicalCost />
        <DistanceCost />
         <PackingCost />
        </div>
      </div> */}
    </div>
  );
};
type TransportationSegmentsType =
  | 'Labour cost'
  | 'Vehicle cost'
  | 'Distance cost'
  | 'Packing cost';
const TransportationSegments: TransportationSegmentsType[] = [
  'Labour cost',
  'Vehicle cost',
  'Distance cost',
  'Packing cost',
];
