import { Tabs, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';
// import { Category } from './';
import { IconCaretLeft, IconCaretRight } from '@tabler/icons';
import { TransportationCost } from './TransportationCost/TransportationCost';
import { StorageCost } from './storagecost';

const array = [
  {
    name: 'Categtory',
    // component: <Category />,
  },
  {
    name: 'Transportation Cost',
    component: <TransportationCost />,
  },
  {
    name: 'Storage Cost',
    component: <StorageCost />,
  },
];

export const Products = () => {
  const [activeTab, setActiveTab] = useState<string | null>('Categtory');
  const [tab, setTab] = useState<number>(1);

  const clicked = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const side = event.currentTarget.id;
    if (side === 'left' && tab > 1) {
      setTab((prev) => prev - 1);
    } else if (side === 'right' && tab <= 2) {
      setTab((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setActiveTab(array[tab - 1].name);
  }, [tab]);

  return (
    <div>
      <Tabs
        radius="xs"
        value={activeTab}
        onTabChange={setActiveTab}
        className="hidden sm:block"
      >
        <Tabs.List
          grow
          position="center"
          className="rounded-lg p-3 pb-0 shadow-lg bg-white"
        >
          {array.map((tab) => (
            <Tabs.Tab key={tab.name} value={tab.name}>
              {tab.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {array.map((tab) => (
          <Tabs.Panel value={tab.name} pt="xs">
            {tab.component}
          </Tabs.Panel>
        ))}
      </Tabs>
      <div className="sm:hidden">
        <div className="h-12 px-5 text-white grid grid-cols-5 items-center bg-[#212B52] ">
          <IconCaretLeft
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
        </div>
        {array.find((tab) => tab.name === activeTab)?.component}
      </div>
    </div>
  );
};
