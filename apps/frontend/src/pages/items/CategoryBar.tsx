import { categories } from '@boxtech/shared-constants';
import { Button } from '@mantine/core';
import { Text } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { SegmentedControl } from '@mantine/core';
import { Box } from '@mantine/core';
import { Center } from '@mantine/core';
import { IconChevronRight, IconEye, IconSearch, IconX } from '@tabler/icons';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../configs/firebaseconfig';
import { categoryRef } from '../../constants';
import { categoryItemType } from '../Landing';
import CategoryItem from './item';

let data: categoryItemType[] = [];
export default function CategoryBar() {
  const [categoryList, setCategoryList] = useState<categoryItemType[]>([]);
  // const categoryD
  const [activeCat, setActiveCat] = useState(categories[0].name);
  const [searchItem, setSearchItem] = useState('');
  const params = useParams();
  console.log(params);

  const getCategoryList = async () => {
    try {
      const categoryQ = query(
        categoryRef,
        where('clientId', '==', params['clientId'])
      );
      const res = await getDocs(categoryQ);
      data = res.docs.map((doc) => doc.data()) as categoryItemType[];
      setCategoryList(data.filter((item) => item['Category'] === activeCat));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {
    setCategoryList(data.filter((item) => item['Category'] === activeCat));
  }, [activeCat]);

  useEffect(() => {
    if (!searchItem) {
      setCategoryList(data.filter((item) => item['Category'] === activeCat));
    } else {
      const regex = new RegExp(searchItem, 'i');
      setCategoryList(data.filter((item) => item['Name']?.match(regex)));
    }
  }, [searchItem]);

  return (
    <div>
      <div className="flex justify-center my-3 gap-2">
        <TextInput
          placeholder="Search Items Here"
          // description="Description below the input"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
          className="w-64 "
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          rightSection={
            !searchItem ? (
              <IconSearch />
            ) : (
              <IconX
                className="cursor-pointer"
                onClick={() => setSearchItem('')}
              />
            )
          }
        />
        {/* <Button onClick={handelSearch}>Search</Button> */}
      </div>
      <div className="sm:max-w-sm md:max-w-md lg:max-w-lg sm:w-full mx-auto w-[328px] overflow-x-scroll gap-4 mb-4 rounded-md cursor-pointer">
        <SegmentedControl
          className="mx-auto bg-gray-50"
          color={'primary'}
          data={categories.map((v) => ({
            label: (
              <Center className="m-1">
                {v.icon}
                <Box className="hidden md:block" ml={10}>
                  {v.name}
                </Box>
              </Center>
            ),
            value: v.name,
          }))}
          onChange={(cat) => setActiveCat(cat)}
        />
        {/* {categories.map((cat) => (
          <div
            className={
              (cat === activeCat ? ' rounded-md' : '') +
              '  h-12 flex justify-center items-center px-4 py-3 font-medium transition-all  no-underline text-center'
            }
          >
            <div className="w-32 text-center" onClick={() => setActiveCat(cat)}>
              {cat}
            </div>
          </div>
        ))} */}
      </div>
      {/* list of Furniture */}
      <div className=" pt-6 px-4 rounded-xl">
        <div className="pt-4 mt-8 font-bold rounded-lg px-4 w-full  md:text-sm">
          {/* list header selector name dimenision */}
          <div className="flex items-center text-[#2C2E33]">
            <div className="w-8">
              {/* <span className="hidden md:block">Selector</span> */}
            </div>
            <div className=" grow">Name of Item</div>
            {/* <div className="w-20 ">
              Dimension <div> (LtxBtxHt)</div>
            </div> */}
            <div className="w-20 text-center">Quantity</div>
          </div>

          <div className="font-light overflow-y-scroll">
            {/* list all category item*/}
            {categoryList.length
              ? categoryList.map((item) => <CategoryItem item={item} />)
              : 'No Items'}
          </div>
        </div>
      </div>
    </div>
  );
}
