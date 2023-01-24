import React, { useEffect, useState } from 'react';
import './secondcnt.css';
import comp from "../../../assets/img/mob.jpg"
import { Title, Transition } from '@mantine/core';
import { useInView } from "react-intersection-observer";

const SecondCnt = () => {
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

    return (
        <div id="cont" className='md:h-[70vh] w-full flex flex-col-reverse md:flex-row h-auto'>
            <div className='w-full md:w-1/2' >
                <div ref={ref} className=" p-[12%]">
                    <Transition mounted={first} transition="slide-right" duration={2000} timingFunction="ease">
                        {(styles) => (<Title style={styles} className='max-w-sm'>
                            With the Right Software, Scale your Business Rapidly
                        </Title>)}
                    </Transition>
                    <Transition mounted={first} transition="fade" duration={2000} timingFunction="ease">
                        {(styles) => (<p style={styles} id='quote'>
                            Easy to setup and go online in few minutes. Cross browser compatability, works seamlessly across different platforms.
                        </p>)}
                    </Transition>
                </div>
            </div>
            <Transition mounted={first} transition="slide-left" duration={2000} timingFunction="ease">
                {(styles) => (<div style={styles} className='w-full md:w-1/2'>
                    <img src={comp} className="mx-auto block md:max-w-lg w-full mt-16 md:mt-8" alt="computer and mobile screen" />
                </div>)}
            </Transition>
        </div>
    )
}

export default SecondCnt