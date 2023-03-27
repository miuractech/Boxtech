import React from 'react';
import './secondcnt.css';
import comp from "../../../assets/img/mob.jpg"

const SecondCnt = () => {

    return (
        <div id="cont" className='h-[80vh] w-full flex sm:flex-col sm:h-auto'>
            <div>
                <div className="px-[20%] py-[20%] sm:p-[12%]">
                    <h1 className="text-[28px]">
                        With the Right Software, Scale your Business Rapidly
                    </h1>
                    <p id='quote'>
                        Easy to setup and go online in few minutes. Cross browser compatability, works seamlessly across different platforms.
                    </p>
                </div>
            </div>
            <div className='w-full p-[5%]'>
                <img src={comp} className="mx-auto w-80% h-full" alt="computer and mobile screen" />
            </div>
        </div>
    )
}

export default SecondCnt