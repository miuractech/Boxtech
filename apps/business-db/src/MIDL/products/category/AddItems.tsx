import { Button, Text, TextInput, Title } from '@mantine/core';
import { AddButton } from '../../../utils/AddButton';
import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { IconCurrencyRupee, IconX, IconCheck } from '@tabler/icons';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../configs/firebaseconfig';
import { defaultErrorMessage } from '../../../constants';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environments/environment.prod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { v4 as uuidv4 } from 'uuid';
import {
  addCategory,
  // CatergoryType,
  setCategory,
} from '../../../store/categorySlice';
import { CatergoryType } from '@boxtech/shared-constants';

export const AddItems = ({
  setModal,
  activeTab,
  editDetails,
}: {
  editDetails: CatergoryType | null;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string | null;
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { category } = useSelector((state: RootState) => state.category);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      Name: '',
      Category: activeTab,
      Length: '',
      Breadth: '',
      Height: '',
      Price: '',
    },

    validate: {
      Name: (value) =>
        value.length < 3 ? 'Categor name must have at least 3 letters' : null,
      Length: (values) =>
        Number(values) <= 0 ? 'Length cannot be a negitive number or 0' : null,
      Breadth: (values) =>
        Number(values) <= 0 ? 'Breadth cannot be a negitive number or 0' : null,
      Height: (values) =>
        Number(values) <= 0 ? 'Length cannot be a negitive number or 0' : null,
      Price: (values) =>
        Number(values) <= 0 ? 'Price cannot be a negitive number or 0' : null,
    },
  });

  useEffect(() => {
    if (editDetails) {
      form.setValues(editDetails);
    }
  }, [editDetails]);

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          if (!category) return;
          const typeLength = category?.filter(
            (cat) => cat.Category === activeTab
          );
          if (!activeTab) return;
          setLoading(true);
          const id = uuidv4();
          const docRef = doc(db, 'Categories', id);
          const data = {
            ...values,
            updatedAt: serverTimestamp(),
            // createdBy: user?.email,
            id: id,
            enabled: true,
            index: typeLength ? typeLength.length : 0,
            clientId: user?.uid,
          };
          // console.log(data);
          if (editDetails) {
            const docRef = doc(db, 'Categories', editDetails.id);
            await updateDoc(docRef, {
              ...values,
              clientId: user?.uid,
              updatedAt: serverTimestamp(),
            });
            const copy = [...category];
            const findItem = copy.find((item) => item.id === editDetails.id);
            const filteredItems = copy.filter(
              (item) => item.id !== editDetails.id
            );
            dispatch(
              setCategory([
                ...filteredItems,
                {
                  ...findItem,
                  ...values,
                },
              ])
            );
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Success!',
              message: 'Item updated successfully',
              color: 'green',
              icon: <IconCheck />,
              loading: false,
            });
          } else {
            // console.log(data);

            // const collectionRef = collection(db, 'Categories');
            // await addDoc(collectionRef, data);

            await setDoc(docRef, data);
            dispatch(addCategory(data));
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Success!',
              message: 'Item added successfully',
              color: 'green',
              icon: <IconCheck />,
              loading: false,
            });
          }
          setLoading(false);
          setModal(false);
        } catch (error: any) {
          console.log(error);
          showNotification({
            id: `reg-err-${Math.random()}`,
            autoClose: 5000,
            title: 'Error!',
            message: environment.production
              ? defaultErrorMessage
              : error.message,
            color: 'red',
            icon: <IconX />,
            loading: false,
          });
          setModal(false);
          setLoading(false);
        }
      })}
    >
      <div className="space-y-5  pt-0">
        <Title align="center" order={3}>
          Add Items
        </Title>
        <div className="gap-y-5">
          <TextInput
            label="Name"
            // className='col-span-2'
            placeholder="Item Name"
            {...form.getInputProps('Name')}
          />
          {/* <TextInput
            label="Category"
            placeholder="Category Name"
            value={activeTab ?? ''}
            {...form.getInputProps('Categories')}
          /> */}
          <div className="flex gap-3">
            <TextInput
              label="Length"
              placeholder="Length"
              rightSection={'ft'}
              type="number"
              {...form.getInputProps('Length')}
            />
            <TextInput
              label="Breadth"
              // className='col-span-2'
              placeholder="Breadth"
              rightSection={'ft'}
              type="number"
              {...form.getInputProps('Breadth')}
            />
            <TextInput
              label="Height"
              // className='col-span-2'
              placeholder="Height"
              rightSection={'ft'}
              type="number"
              {...form.getInputProps('Height')}
            />
          </div>
          <TextInput
            label="Price"
            // className='col-span-2'
            placeholder="Price"
            {...form.getInputProps('Price')}
            icon={<IconCurrencyRupee size={18} color="black" />}
            type="number"
          />
        </div>
        <div className="flex justify-center gap-10">
          <Button
            className="w-24"
            onClick={() => setModal(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <AddButton
            loading={loading}
            style={{ width: '96px' }}
            icon={false}
            text="Save"
          />
        </div>
      </div>
    </form>
  );
};
