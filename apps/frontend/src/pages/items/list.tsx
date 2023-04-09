import { Title } from '@mantine/core';
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BackandNextButton from '../../component/BackandNextButton';
import { RootState } from '../../store';
import MylListItem from './MylListItem';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';

export default function List() {
  const { selectedItems } = useSelector((state: RootState) => state.orderDetails)
  const { orderId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="p-4 ">
      <div className="rounded-xl overflow-hidden max-w-3xl mx-auto">
        <div className="bg-black ">
          <Title
            size={16}
            className="flex justify-center items-center font-medium text-white h-[43px] "
          >
            My List
          </Title>
        </div>
        <div className="  bg-[#F8F9FA]">
          <div className="pt-4 px-4 ">
            <div className="grid grid-cols-4">
              <div className="col-span-2 text-[#2C2E33]">
                Name of Item ( Size )
              </div>
              <div className="col-span-1 ml-4 text-[#2C2E33] text">
                Quantity
              </div>
              <div className="col-span-1  text-[#2C2E33] text-center">
                Remove
              </div>
            </div>

            <div className={`overflow-y-scroll scrollbar mt-4`}>
              {/* list all selected Items*/}
              {selectedItems.map((item) => (
                <MylListItem item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="m-5">
          <BackandNextButton
            nextDisabled={selectedItems.length === 0}
          handelNextBtn={async () => {
            try {
              if (!orderId) return
              await updateDoc(doc(db, "Orders", orderId), {
                status: "itemsSelected",
                selectedItems
              })
              navigate(`/${orderId}`)
            } catch (error) {
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: "Error",
                message: "Something went wrong try again",
                color: "red",
                icon: <IconX />,
                loading: false,
              });
            }
            }}
          />
        </div>
    </div>
  );
}
