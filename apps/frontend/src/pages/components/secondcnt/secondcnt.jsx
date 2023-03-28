import React from 'react';
import './secondcnt.css';
import comp from "../../../assets/img/mob.jpg"

const SecondCnt = () => {

    return (
        <div id="cont" className='md:h-[70vh] w-full flex flex-col-reverse md:flex-row h-auto'>
            <div className='w-full md:w-1/2' >
                <div className=" p-[12%]">
                    <h1 className="text-[28px]">
                        With the Right Software, Scale your Business Rapidly
                    </h1>
                    <p id='quote'>
                        Easy to setup and go online in few minutes. Cross browser compatability, works seamlessly across different platforms.
                    </p>
                </div>
            </div>
            <div className='w-full md:w-1/2'>
                <img src={comp} className="mx-auto block md:max-w-lg w-full mt-16 md:mt-8" alt="computer and mobile screen" />
            </div>
        </div>
    )
}

export default SecondCnt