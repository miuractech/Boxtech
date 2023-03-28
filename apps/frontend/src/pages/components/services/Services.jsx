import React from "react";
import './services.css';

const Services = () => {

  const options = [
    {heading:'Pickup Scheduling',desc:'Customers can schedule pickup, book a slot for loading and unloading  the freight.'},
    {heading:'Automatic Quotation Generation',desc:'Generate automatic quotations with the help of software.'},
    {heading:'Pricing management and Payment',desc:'Manage pricing and payments all in one integrated dashboard.'},
    {heading:'Analytics and Customer review',desc:'Analyze your sales, revenue. Record your customer feedback to know them better.'}
  ];

  return (
    <div className="w-full h-auto p-[5%] " id="#products">
      <div className="p-[6%]">
        <div>
          <h1>
            What <span style={{ color: "#ffbe23" }}>We Offer?</span>
          </h1>
          <div className="my-[20px] md:w-[45%] w-[100%] text-justify leading-[25px]">
            <p id="quote-sol">
                Software that can manage packing and moving business. Let your
                customers select their valuables to be shifted and schedule a pickup
                and pay online.
            </p>
          </div>
          <div className="flex justify-center   items-start py-[18px] flex-wrap">
            {/* <div></div>
            <div></div>
            <div></div>
            <div></div> */}
            {
                options.map((item) => 
                  <div id="card" className='md:mr-[20px] p-[8px] md:w-[260px] md:h-full h-[150px] mr-[12px] md:my-[12px] my-4 '>
                    <h3 className='text-xl font-bold tracking-[1px] text-[20px] px-[8px] md:h-[80px] h-[25px]' >{item['heading']}</h3>
                        <p>{item['desc']}</p>
                    </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
