import React, { useEffect, useState } from "react";
import './creativecnt.css';
import { IconFileExport, IconLockOpen, IconPaint } from "@tabler/icons";
import creative from "../../../assets/img/creative-section.png"
import computer from "../../../assets/img/computer.png"
import custom from "../../../assets/img/customdesign.png"
import db from "../../../assets/img/server.png"
import { useInView } from "react-intersection-observer";
import { Transition } from "@mantine/core";


const CreativeCnt = () => {

  const [first, setfirst] = useState(false)
  const [ref, inView] = useInView({
    /* Optional options */
    triggerOnce: true,
    rootMargin: '0px 0px',
  })

  useEffect(() => {
    if (inView) {
      setfirst(true)
    }
  }, [inView])

  const adv = {
    names: [
      { icon: computer, name: 'All-In-One Software' },
      { icon: db, name: 'Store your customer data' },
      { icon: custom, name: 'Customer Design' }
    ]
  }

  return (
    <div className="md:grid md:grid-cols-2 w-[full] md:h-[90vh] h-auto flex flex-col mb-20">
      <Transition mounted={first} transition="slide-left" duration={2000} timingFunction="ease">
        {(styles) => <div style={styles}>
          <img className="w-full h-full" src={creative} alt="phot" />
        </div>}
      </Transition>
      <Transition mounted={first} transition="slide-right" duration={2000} timingFunction="ease">
        {(styles) => <div style={styles}>
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
            <div className="my-[8px] justify-start items-center w-[100%] flex-wrap mx-auto h-[200px] p-8">
              {
                adv.names.map((item) =>
                  <div className="flex text-left mt-[10px] px-[10px] justify-start items-center">
                    <img src={item.icon} alt="" className="h-10" />
                    <h2 className="text-[14px] tracking-[1px] ml-[20px] pr-[8px] ">{item.name}</h2>
                  </div>
                )
              }
            </div>
          </div>
        </div>}
      </Transition>
      <div ref={ref} />
    </div>
  );
};

export default CreativeCnt;
