import React from "react";
import './creativecnt.css';
import { IconFileExport, IconLockOpen, IconPaint } from "@tabler/icons";
import creative from "../../../assets/img/creative-section.png"

const CreativeCnt = () => {

  const adv = {
    names: [
      { icon: <IconLockOpen style={{ 'color': 'white' }} />, name: 'All-In-One Software' },
      { icon: <IconFileExport style={{ 'color': 'white' }} />, name: 'Store your customer data' },
      { icon: <IconPaint style={{ 'color': 'white' }} />, name: 'Customer Design' }
    ]
  }

  return (
    <div className="grid grid-cols-2 w-[full] h-[90vh] sm:h-auto sm:flex sm:flex-col">
      <div>
        <img className="w-full h-full" src={creative} alt="phot" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div id="desc-card">
          <h1 className="w-[100%] text-[32px] sm:text-[25px] sm:p-[5%]">Built for <span style={{ 'color': '#ffbe23' }}>Businesses</span>, by <span style={{ 'color': '#ffbe23' }}>Creatives.</span></h1>
          <div className="w-[60%] my-[18px] sm:w-[100%] sm:p-[5%] sm:my-[0]" >
            <p className="text-justify">
              Manage your Staff, Bookings, Customers, Pricing, Payments, Analytics,
              Support, Enquiries all in one integrated dashboard. Let software
              handle all the manual work.
            </p>
          </div>
        </div>
        <div className="flex my-[8px] justify-start items-center w-[100%] flex-wrap mx-auto sm:h-[200px] sm:p-[10px]">
          {
            adv.names.map((item) =>
              <div className="flex text-left mt-[10px] px-[10px] justify-start items-center">
                <div className='p-[4px] bg-black'>{item.icon}</div>
                <h2 className="text-[14px] tracking-[1px] ml-[20px] pr-[8px] ">{item.name}</h2>
              </div>
            )
          }
        </div>
      </div>

    </div>
  );
};

export default CreativeCnt;
