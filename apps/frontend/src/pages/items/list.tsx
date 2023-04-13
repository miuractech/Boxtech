import { Divider, Title } from '@mantine/core';
import {Fragment, useEffect} from 'react';
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

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate(`/order/${orderId}`)
    }
  }, [selectedItems])


  return (
    <div className="p-4 ">
      <div className="rounded-xl overflow-hidden max-w-3xl mx-auto  min-h-[80vh]">  
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
            <div className="grid grid-cols-4 h-12 items-start px-4 text-[#2C2E33]">
              <div className="col-span-2 ">
                Name of Item 
                <div className="text-xs">

                ( Size )
                </div>
              </div>
              <div className="col-span-1 ">
                Quantity
              </div>
              <div className="col-span-1   text-center">
                Remove
              </div>
            </div>
            <Divider />
            <div className={`overflow-y-scroll scrollbar`}>
              {/* list all selected Items*/}
              {selectedItems.map((item) => (
                <Fragment key={item.id}>
                  <MylListItem item={item} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="m-5 max-w-lg mx-auto">
          <BackandNextButton
            nextDisabled={selectedItems.length === 0}
            backButton={()=>navigate(-1)}
          handelNextBtn={async () => {
            try {
              if (!orderId) return
              await updateDoc(doc(db, "Orders", orderId), {
                status: "itemsSelected",
                selectedItems
              })
              setTimeout(() => {
                navigate(`/order/${orderId}`)
              }, 500);
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
