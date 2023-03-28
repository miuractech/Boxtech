import React from 'react';
import './startcnt.css';
import { Link } from 'react-router-dom';
import { IconArrowsMaximize, IconLink, IconLockOpen } from '@tabler/icons';
import mainimage from "../../../assets/img/mainimg.jpg"

const StartCnt = () => {

    const adv = {
        names: [
            { icon: <IconLockOpen style={{ 'color': 'white' }} />, name: 'Speed & Security' },
            { icon: <IconArrowsMaximize style={{ 'color': 'white' }} />, name: 'Flexibility and Scalability' },
            { icon: <IconLink style={{ 'color': 'white' }} />, name: 'Automated Payments' }
        ]
    }

    return (
        <div id="seperate-container" className="min-h-[800px] w-[100%] sm:h-auto">
            <div>
                <div className="my-[10%] mx-8 md:mx-[10%] md:my-[15%]">
                    <h1 className="font-bold text-[38px] tracking-[1px] sm:text-[28px]">Best Packing & Moving software for your business!</h1>
                    <p className="text-justify sm:py-[12px] tracking-[1px] p-[10px] sm:p-0">We provide an effective and powerful way to manage your operations like pickup scheduling, quotation generation, pricing, customer review, payment, etc.</p>
                    {/* <Link to='/pricing-plans'> */}
                    <button
                        onClick={() => {
                            window.location.href = "https://admin.boxtech.miurac.com/"
                        }}
                        className="bg-[#edbd0f] rounded-[5px] p-[10px] my-[20px] text-white w-full sm:w-56">
                        Start for free
                    </button>
                    {/* </Link> */}
                    <div className="flex my-[8px] justify-start md:justify-center items-center flex-wrap md:h-[200px] w-auto">
                        {
                            adv.names.map((item) =>
                                <div className="flex text-left md:mx-[15px] mr-4 my-[15px] w-[235px] justify-start items-center">
                                    <div className='p-[4px] bg-black'>{item.icon}</div>
                                    <h2 className="text-[14px] tracking-[1px] ml-[8px]">{item.name}</h2>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
            <div>
                <img className='w-3/4 block mx-auto' src={mainimage} alt="Alt img" />
            </div>
        </div>
    )
}

export default StartCnt