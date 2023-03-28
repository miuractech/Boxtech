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
    <div className="md:grid md:grid-cols-2 w-[full] md:h-[90vh] h-auto flex flex-col">
      <div>
        <img className="w-full h-full" src={creative} alt="phot" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div id="desc-card">
          <h1 className="w-full md:text-[32px] text-[25px] p-8">Built for <span style={{ 'color': '#ffbe23' }}>Businesses</span>, by <span style={{ 'color': '#ffbe23' }}>Creatives.</span></h1>
          <div className="md:w-[60%] md:my-[18px] w-full px-8  my-[0]" >
            <p className="text-justify">
              Manage your Staff, Bookings, Customers, Pricing, Payments, Analytics,
              Support, Enquiries all in one integrated dashboard. Let software
              handle all the manual work.
            </p>
          </div>
        </div>
        <div className="flex my-[8px] justify-start items-center w-[100%] flex-wrap mx-auto h-[200px] p-8">
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
