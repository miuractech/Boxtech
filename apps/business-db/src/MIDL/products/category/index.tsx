import { categories } from '@boxtech/shared-constants';
import { SegmentedControl, Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';
import ItemsTable from './itemsTable';

export default function Category() {
  const desktopScreen = useMediaQuery('(min-width:900px)');
  const [activeTab, setActiveTab] = useState<string>('Furniture');
  const [isReodrded, setIsReodrded] = useState(false);
  return (
    <div>
      <div className="text-center">
        {desktopScreen ? (
          <SegmentedControl
            className="bg-[#e3e4ea]"
            fullWidth
            orientation={'horizontal'}
            value={activeTab}
            onChange={(v)=>{
              setIsReodrded(false)
              setActiveTab(v)
            }}
            data={categories.map((i) => ({
              name: i.name,
              id: i.name,
              label: <span className='flex items-center justify-center' >{i.icon}{i.name}</span>,
              value: i.name,
            }))}
          />
        ) : (
          <Select
            value={activeTab}
            onChange={(e) => {
              if (e) {
                setActiveTab(e);
              }
            }}
            data={categories.map((i) => ({ value: i.name, label: i.name }))}
          />
        )}
        <div>
          <ItemsTable
            section={activeTab}
            setIsReodrded={setIsReodrded}
            isReodrded={isReodrded}
          />
        </div>
      </div>
    </div>
  );
}

