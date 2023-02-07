import { Button, Divider, Text, Switch, Badge } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX, IconEdit } from '@tabler/icons';
import { defaultErrorMessage } from '../../../constants';
import { environment } from '../../../environments/environment.prod';
import { doc, updateDoc } from 'firebase/firestore';
import { setCategory } from '../../../store/categorySlice';
import { db } from '../../../configs/firebaseconfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useMediaQuery } from '@mantine/hooks';
import { IconGridDots } from '@tabler/icons';
import React from 'react';
import { CatergoryType } from '@boxtech/shared-constants';
export const ItemComponent = ({
  cat,
  edit,
  dragProps,
  key
}: {
  cat: CatergoryType;
  edit: (id: string) => void;
  dragProps:any
  key:string
}) => {
  const { category } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  const mediaQuery = useMediaQuery('(min-width: 640px)');

  const toggle = async () => {
    try {
      if (!category) return;
      const docRef = doc(db, 'Categories', cat.id);
      await updateDoc(docRef, {
        enabled: !cat.enabled,
      });
      const copy = [...category];
      const filter = copy.filter((ele) => ele.id !== cat.id);

      dispatch(setCategory([...filter, { ...cat, enabled: !cat.enabled }]));
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: 'Success!',
        message: `Items ${!cat.enabled ? 'Enabled' : 'Disabled'}`,
        color: 'green',
        icon: <IconCheck />,
        loading: false,
      });
    } catch (error: any) {
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: 'Error!',
        message: environment.production ? defaultErrorMessage : error.message,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
    }
  };

  return (
    <React.Fragment key={key} >
      <div className="p-3 flex gap-3 bg-white items-center" key={key}>
        <div className='w-10 cursor-grab' {...dragProps} key={key}>
          <IconGridDots  />
        </div>
        <div className='grow' >
          <Text align='left' className="text-sm sm:text-base">{cat.Name}</Text>
          {!mediaQuery && (
            <Text color="gray" size={8}>
              {cat.Length} X {cat.Breadth} X {cat.Height}
            </Text>
          )}
        </div>
        <div className="hidden w-28 sm:block text-left">
          <Badge>
            {cat.Length} X {cat.Breadth} X {cat.Height}
          </Badge>
        </div>
        <div className=" w-16 md:w-32 text-left">
          <Text className="text-sm  sm:text-base">{cat.Price}</Text>
        </div>
        <div className="grid grid-cols-2 items-center sm:gap-x-5 w-18 md:w-[200px] ">
          {mediaQuery ? (
            <Button
              onClick={() => edit(cat.id)}
              size={mediaQuery ? 'sm' : 'xs'}
              fullWidth
              variant="outline"
            >
              Edit
            </Button>
          ) : (
            <IconEdit onClick={() => edit(cat.id)} />
          )}

          {mediaQuery ? (
            <Button
              fullWidth
              size={mediaQuery ? 'sm' : 'xs'}
              color={cat.enabled ? 'green' : 'red'}
              variant="outline"
              onClick={toggle}
            >
              {cat.enabled ? 'Enable' : 'Disable'}
            </Button>
          ) : (
            <div>
              <Switch checked={cat.enabled} onClick={toggle} />
            </div>
          )}
        </div>
      </div>
      <Divider size="xs" />
    </React.Fragment>
  );
};
