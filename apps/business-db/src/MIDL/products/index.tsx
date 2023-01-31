/* eslint-disable no-empty-pattern */
import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Category from './category';
import Storage from './storage';
import {TransportationCost} from './transportation';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../configs/firebaseconfig';
import { setCategory, setCost } from '../../store/categorySlice';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../environments/environment';
import { categoryRef, defaultErrorMessage, costRef } from '../../constants';
import { IconX } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const TopPanel = [
  {
    name: 'Transportation Cost',
    component: <TransportationCost />,
  },
  {
    name: 'Storage Cost',
    component: <Category />,
  },
  // {
  //   name: 'Storage Cost',
  //   component: <Storage />,
  // },
];
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export default function Products({}: Props) {
  const desktopScreen = useMediaQuery('(min-width:900px)');
  const dispatch = useDispatch();
  // const [fetchData, setFetchData] = useState(true);
  const { category } = useSelector((state: RootState) => state.category);
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const categoryReference = query(categoryRef,where("clientId","==",user?.uid));
        const labourCostReference = doc(costRef,user?.uid);
        const res = await getDocs(categoryReference);
        const res2 = await getDoc(labourCostReference);
        const data = res.docs.map((doc) => ({ ...doc.data() }));
        const data2 = res2.data();
        // console.log(data);
        dispatch(setCategory(data));
        dispatch(setCost(data2));
        // setFetchData(false);
      } catch (error: any) {
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Not Authorised!',
          message: environment.production ? defaultErrorMessage : error.message,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
        // setFetchData(false);
      }
    };
    if (!category) {
      getCategory();
    }
  }, []);
  return (
    <div className="w-full">
      <Tabs
        radius="xs"
        defaultValue={TopPanel[0].name}
        variant="pills"
        // orientation={desktopScreen?'horizontal':"vertical"}
        className="p-2 block"
      >
        <Tabs.List
          grow
          position="center"
          className={`rounded-lg bg-white ${desktopScreen ? 'p-2' : 'p-0'}`}
        >
          {TopPanel.map((tab) => (
            <Tabs.Tab
              className={`rounded-md text-xs ${desktopScreen ? '' : 'p-2'}`}
              key={tab.name}
              value={tab.name}
            >
              {tab.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <div className="">
          {TopPanel.map((tab) => (
            <Tabs.Panel value={tab.name} pt="xs">
              {tab.component}
            </Tabs.Panel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
