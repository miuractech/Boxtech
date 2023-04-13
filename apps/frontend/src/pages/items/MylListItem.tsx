import React from 'react';
import deleteIcon from '../../assets/deleteIcon.svg';
import topArrowIcon from '../../assets/Arrowtop.svg';
import bottomArrowIcon from '../../assets/Arrowbottom.svg';
import { DocumentData } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { IconTrash } from '@tabler/icons';
import BackandNextButton from '../../component/BackandNextButton';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import {
  addOrRemoveQuntity,
  removeSelectedCategory,
} from '../../store/orderSlice';
type ListItemProps = {
  item: DocumentData;
};

export default function MylListItem(props: ListItemProps) {
  const { item } = props;
  const dispatch = useDispatch();
  const handelArrowClick = (val: number) => {
    let quantity = item['quantity'];
    quantity += val;

    if (quantity > 0) {
      dispatch(addOrRemoveQuntity({ id: item['id'], quantity: quantity }));
    } else {
      handelReomveItems();
    }
  };
  const handelReomveItems = () => {
    dispatch(removeSelectedCategory(item['id']));
  };
  return (
    <div>
      <div className="grid grid-cols-4 items-center py-3  px-4  border-b">
        <div className="col-span-2 text-[#ADB5BD] capitalize">
          {item['Name']}
          {item['Name']}
          <div className="text-xs">
            {item['Length']} x {item['Breadth']} x {item['Height']}
          </div>
        </div>
        <div className="col-span-1 text-[#ADB5BD]">
          <div className="flex  gap-3 items-center  align-middle">
            <div
              className="text-[#F26E6E] font-bold text-xl cursor-pointer"
              onClick={() => handelArrowClick(-1)}
            >
              -
            </div>
            <div className="text-xl w-8 text-center">{item['quantity']}</div>

            <div
              className="text-[#099D5F] font-bold text-xl cursor-pointer"
              onClick={() => handelArrowClick(1)}
            >
              +
            </div>
          </div>
        </div>
        <div
          className="col-span-1 text-[#ADB5BD] text-center ml-3"
          onClick={handelReomveItems}
        >
          <IconTrash color="red" stroke={1} />
        </div>
      </div>
    </div>
  );
}
