import React, { useEffect, useState } from 'react';
import './startcnt.css';
import { Link } from 'react-router-dom';
import { IconArrowsMaximize, IconLink, IconLockOpen } from '@tabler/icons';
import mainimage from "../../../assets/img/mainimg.jpg"
import { Button, Text, Title, Transition } from '@mantine/core';
import security from "../../../assets/img/security.png"
import flexiable from "../../../assets/img/flexibility.png"
import autopayment from "../../../assets/img/fintech.png"

const StartCnt = () => {
    const [first, setfirst] = useState(false)

    useEffect(() => {
        setfirst(true)
    }, [])


    const adv = {
        names: [
            { icon: security, name: 'Speed and Security' },
            { icon: flexiable, name: 'Flexibility and Scalability' },
            { icon: autopayment, name: 'Automated Payments' }
        ]
    }

    return (
        <div id="seperate-container" className="min-h-[630px] w-[100%] sm:h-auto">
            <div>
                <div className="my-[10%] mx-8 md:mx-[10%] md:my-[15%] space-y-10">
                    <Transition mounted={first} transition="slide-right" duration={1000} timingFunction="ease">
                        {(styles) => (<div style={styles}>
                            <div className='space-y-5'>
                                <Title order={1}>Best Packing & Moving software for your business!</Title>
                                <Text color='gray'>We provide an effective and powerful way to manage your operations like pickup scheduling, quotation generation, pricing, customer review, payment, etc.</Text>
                                <Button
                                    className='transform transition duration-500 hover:scale-110'
                                    size='lg'
                                    onClick={() => {
                                        window.location.href = "https://admin.boxtech.miurac.com/"
                                    }}>
                                    Start for free
                                </Button>
                            </div>
                        </div>)}
                    </Transition>
                    <Transition mounted={first} transition="slide-up" duration={1000} timingFunction="ease">
                        {(styles) => (<div style={styles}>
                            <div className="grid md:grid-cols-3 gap-5 md:gap-0">
                        {
                            adv.names.map((item) =>
                                <div className="flex gap-3">
                                    <img className='h-10 self-center' src={item.icon} alt='' />
                                    <Text className='self-center text-gray-500 font-semibold md:w-1/2' size="xs">{item.name}</Text>
                                </div>
                            )
                        }
                    </div>
                        </div>)}
                    </Transition>
                </div>
            </div>
            <div>
                <Transition mounted={first} transition="slide-up" duration={500} timingFunction="ease">
                    {(styles) => (<div style={styles}>
                        <img className='block m-auto w-full lg:w-3/5' src={mainimage} alt="Alt img" />
                    </div>)}
                </Transition>
            </div>
        </div>
    )
}

export default StartCnt