import React from 'react';
import { DocumentData } from 'firebase/firestore';
type qutationPropsType = {
  item: DocumentData;
  type: boolean;
};
export default function QuoatationItem(props: qutationPropsType) {
  const type = props.type;
  const { item } = props;
  return (
    <div className="border-solid border-0 border-b border-[#CED4DA]">
      <div className="bg-white text-[#343A40]  grid grid-cols-6 my-3 rounded">
        <div className="col-span-3  px-4 py-2">
          <div className="capitalize">{!type && item['Name']}</div>
          {type && (
            <div className="md:flex gap-4 capitalize">
              <div className="w-32"> {item['category']} </div>
              {item['propertyType'] && <div className="">2 BHK </div>}
            </div>
          )}
        </div>
        <div className="col-span-1 text-center px-4 py-2">
          Rs.{item['Price']}
        </div>

        <div className="col-span-1 sm:block hidden   text-center px-4 py-2">
          {item['quantity']}
        </div>

        <div className="sm:col-span-1 col-span-2  text-center  px-4 py-2">
          Rs.
          {`${item['total']}`}
        </div>
      </div>
    </div>
  );
}
