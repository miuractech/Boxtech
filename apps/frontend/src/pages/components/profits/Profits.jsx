import React from 'react'
import profit from "../../../assets/img/profit-photo.png"

const Profits = () => {
    return (
        <div className="h-auto w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center w-[70%] sm:w-[100%]">
                <div>
                    <p className="text-[38px] tracking-[2px] text-center p-[25px] sm:p-[2%] sm:text-[28px]">
                        Get Ready to Maximize Your Profits With Our
                        Software.
                    </p>
                    <a href="https://admin.boxtech.miurac.com">
                        <button className='bg-[#edbd0f] p-[10px] my-[20px] sm:my-[12px] text-white rounded-[5px] tracking-[1px] flex mx-auto'>
                            Start for Free
                        </button>
                    </a>
                </div>
            </div>
            <div className="w-full bg-[#FFBF23] border-b border-t-0 border-x-0 border-b-black border-solid p-0 m-0">
                <img src={profit} alt='boxtech' className="w-full " />
            </div>
        </div>
    )
}

export default Profits