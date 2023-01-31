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
              name: i,
              id: i,
              label: i,
              value: i,
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
            data={categories.map((i) => ({ value: i, label: i }))}
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

const categories = [
  'Furniture',
  'Large Appliances',
  'Small Appliances',
  'Kitchen Items',
  'IT Equipment',
  'Misc',
];
