import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { db } from '../../../configs/firebaseconfig';

const MySubscriptions = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);

    const auth = getAuth();


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUserDetails(user);
        });
    });


    if (userDetails != null) {
        getDoc(doc(db, "subscriptions", userDetails.email)).then(docSnap => {
            if (docSnap.exists()) {
                setSubscriptions(docSnap.data());

            } else {
                console.log("No such document!");
            }
        })

    }

    const cancelSubscription = () => {
        alert('Subscription cancelled successfully');
        deleteDoc(doc(db, "subscriptions", userDetails.email));
        setSubscriptions([]);
    }


    return (
        <div>
            {
                userDetails
                    ? (<div>
                        <div className='w-[80%] mx-auto sm:w-[95%]'>
                            <div className='w-[80%] mx-auto sm:w-full'>
                                { /* Top banner */}
                                <div className='bg-[#edbd0f] h-[300px] flex flex-col justify-end'>
                                    <div className='flex items-end w-[80%] mx-auto p-3'>
                                        <div className='rounded-[50%] h-[90px] w-[90px] mx-3'>
                                            {
                                                userDetails.photoURL
                                                    ? <img src={userDetails.photoURL} alt="User Profile" className='rounded-[50%] h-full w-full' />
                                                    : <div className='rounded-[50%] h-full w-full bg-black text-center text-white'>
                                                        userDetails.displayName.split(' ')[0].charAt(0)
                                                    </div>

                                            }
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-[25px] tracking-[1px] pb-[12px]'>{userDetails.displayName}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='m-2 p-2'>
                                        <Link to="/account">
                                            My Account
                                        </Link>
                                    </div>
                                    <div className='m-2 border-b-2 border-black p-2'>
                                        <Link to="/subscriptions">
                                            My Subscriptions
                                        </Link>
                                    </div>
                                </div>
                                <div className='my-4 border-b-2 border-black flex justify-between items-center'>
                                    <div>
                                        <h1 className='text-[20px] p-2'>My Subscriptions</h1>
                                        <p className='text-[16px] p-2'>View and manage your subscriptions you've purchased</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className='font-bold text-black text-[18px] p-2'>Purchased plans</h2>
                                    {
                                        subscriptions.length !== 0
                                            ? <div className='border-2 p-2 rounded-[5px] my-2 border-grey'>
                                                <div className='flex justify-between items-center'>
                                                    <h5 className='text-[14px]'>{subscriptions.plan}</h5>
                                                    <h5 className='text-[14px]'>Free plan</h5>
                                                    <h5 className='px-2 py-1 bg-[#90EE90] text-[12px] rounded-[8px]'>Active</h5>
                                                </div>
                                                <h5 className='text-[14px] py-2'>Purchased on : {subscriptions.date}</h5>
                                                <h5 className='text-[14px] text-[grey] py-2'>Valid till : {subscriptions.validity}</h5>
                                                <button
                                                    onClick={cancelSubscription}
                                                    className='underline black text-[12px] bg-[#2b295c] text-white p-2 my-2 rounded-[5px]'>
                                                    Cancel Subscription
                                                </button>
                                            </div>
                                            : <div className='border-2 border-grey rounded-[5px] p-3 m-2s'>
                                                <h5 className='p-2 text-center'>You've not subscribed to any of the packs yet!</h5>
                                                <button className='bg-black text-white text-[14px] p-2 mx-auto block rounded-[6px] m-2'>
                                                    <Link to='/checkout'>
                                                        Purchase Now
                                                    </Link>
                                                </button>
                                            </div>
                                    }
                                </div>


                            </div>
                        </div>
                    </div>)
                    : <div className='text-center'>
                        Loading....
                    </div>
            }
        </div>

    )
}

export default MySubscriptions