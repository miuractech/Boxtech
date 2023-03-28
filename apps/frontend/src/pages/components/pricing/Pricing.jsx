import React from 'react';
import './pricing.css';
import { Link } from 'react-router-dom';

const Pricing = () => {
    return (
        <div className='md:h-auto w-full md:grid md:grid-cols-2 bg-[#F6F5F5] h-auto flex flex-col pt-12' id="pricing">
            <div className='flex flex-col justify-center items-center p-[5%]'>
                <div id='con1'>
                    <h1 className='my-[18px] md:w-[70%] w-[100%] text-[28px]'>Explore our <span style={{ 'color': '#FFBF23' }}>Pricing</span> Options</h1>
                    <p className='md:w-[80%] w-full'>Simple plans that grow with your business. No contracts. No Setup fees.</p>
                    <Link to='/checkout'>
                        <button className='bg-black px-[20px] py-[10px] my-[20px] text-white rounded-[5px] tracking-[1px] '>
                            See More
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <div className="md:py-[18%] md:px-4 p-[5%]">
                    <div className="md:my-[15px] m-[10px]" >
                        <h3 id="pricing" className="md:w-[60%] md:text-[30px] text-[22px] tracking-[2px] md:font-bold font-[500] w-[100%] my-[12px]">Choose your pricing plan</h3>
                    </div>
                    <div className="rounded-[10px] border-black border-[3px] h-full w-[330px] sm:w-[100%]">
                        <div className="bg-[#FFBF23] w-full md:w-96 p-6">
                            <h5 className="text-[20px] font-bold tracking-[2px] py-[4px]">Free</h5>
                            <h6 className='py-[4px]'><span className='text-[11px]'>Rs </span><span className='text-[28px] font-bold'>0</span> </h6>
                            <p className='py-[4px] text-[12px]'>Access to all features</p>
                            <p className='pt-[10px] pb-[5px] text-[10px]'>Valid for 3 months</p>
                            <button
                                onClick={() => {
                                    window.location.href = "https://admin.boxtech.miurac.com/"
                                }}
                                className="bg-black p-[10px] my-[20px] text-white rounded-[5px] tracking-[1px] block mx-auto sm:w-full">
                                Get Started
                            </button>
                        </div>
                        <div className="p-6 tracking-[1px] leading-[27px] w-full md:w-96 bg-[#FFD7EF]">
                            <h6 className="text-[12px]">Custom Branding</h6>
                            <h6 className="text-[12px]">Unlimited Bookings</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing