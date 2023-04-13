import { Checkbox, Divider } from '@mantine/core';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { categoryItemType } from '../Landing';
import {
  addOrRemoveQuntity,
  addSelectedCategory,
  removeSelectedCategory,
} from '../../store/orderSlice';
import { IconLine, IconMinus, IconPlus } from '@tabler/icons';
type categoryItemProps = {
  item: categoryItemType;
};
export default function CategoryItem(props: categoryItemProps) {
  const { selectedItems } = useSelector(
    (state: RootState) => state.orderDetails
  );
  const { item } = props;
  const isChecked =
    selectedItems.filter((it) => it['id'] === item['id']).length > 0;
  const selectedItem = selectedItems.filter((it) => it['id'] === item['id'])[0];
  const [quantity, setQuantity] = useState(
    selectedItem ? selectedItem['quantity'] : 0
  );
  const dispatch = useDispatch();

  const handelItemClick = () => {
    if (!item['total']) {
      if (!item['quantity']) item['quantity'] = 1;
      item['total'] = Number(item['quantity']) * Number(item['Price']);
    }
    if (!isChecked) {
      dispatch(addSelectedCategory(item));
      setQuantity(1);
    } else {
      dispatch(removeSelectedCategory(item['id']));
      setQuantity(0);
    }
  };

  const handelArrowClick = (val: number) => {
    const qyt = quantity + val;
    if (qyt < 0) return;
    setQuantity(qyt);
    if (qyt > 0) {
      const it = { ...item };
      it['quantity'] = qyt;
      if (!isChecked) dispatch(addSelectedCategory(item));
      else {
        dispatch(addOrRemoveQuntity({ id: it['id'], quantity: qyt }));
      }
    } else if (qyt === 0) {
      dispatch(removeSelectedCategory(item['id']));
      setQuantity(0);
    }
  };

  return (
    <>
      <div
        className=" flex items-center py-3 cursor-pointer text-[#5C5F66]"
        onClick={handelItemClick}
      >
        <div className="w-8">
          <Checkbox checked={isChecked} />
        </div>
        <div className="grow font-semibold text-sm md:text-base">
          {item['Name']}
          <div className="font-thin text-xs">
            {item['Length']} x {item['Breadth']} x {item['Height']}
          </div>
        </div>

        <div
          className="w-24 flex gap-3 items-center justify-center align-middle"
          onClick={(e) => e.stopPropagation()}
        >
          <IconMinus
          size={14}
            className="text-[#F26E6E]"
            onClick={(e) => {
              handelArrowClick(-1);
              e.stopPropagation();
            }}
          />
            {/* -
          </IconLine> */}
          <div className="text-xl">{quantity} </div>
          <IconPlus
          size={14}
            className="text-[#099D5F]"
            onClick={(e) => {
              handelArrowClick(1);
              e.stopPropagation();
            }}
          />
          
        </div>
      </div>
      <Divider />
    </>
  );
}
