import React from 'react';
import { getAuth, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '@mantine/core';
import { provider } from '../../../configs/firebaseconfig';



const Login = (props) => {

    const [showEmail, setShowEmail] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [email, setEmailValue] = React.useState('');
    const [password, setPasswordValue] = React.useState('');

    const auth = getAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        try {
            signInWithPopup(auth, provider)
                .then((data) => {
                    setValue(data.user.email);
                    localStorage.setItem('email', data.user.email)
                });
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogin = () => {
        try {
            signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(
        () => {
            setValue(localStorage.getItem('email'))
        }, []
    );



    return (
        <div>
            <h1 className='text-center text-[35px] p-3'>Login</h1>
            <h3 className='text-[16px] text-center'>
                <span>Not a Member? </span>
                <span className='text-[blue]'>
                    <button onClick={props.clickFunction}>Sign Up</button>
                </span>
            </h3>
            {
                showEmail
                    // login code ui
                    ? <div className='w-[100%]'>
                        <div className='w-[100%] flex flex-col justify-center items-center'>
                            <div className='m-2'>
                                <TextInput
                                    label="Email"
                                    variant="outlined"
                                    name='email'
                                    onChange={(e) => setEmailValue(e.target.value)}
                                />
                            </div>
                            <div className='m-2'>
                                <TextInput
                                    label="Password"
                                    variant="outlined"
                                    name='password'
                                    type="password"
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleLogin}
                                className='bg-[orange] w-full mx-2 rounded-[5px] p-2 text-white my-3'>
                                Login
                            </button>
                            <div>
                                <h3 className='text-center text-[18px] py-3'>or login with</h3>
                                <div className='flex justify-center items-center'>
                                    <button className='p-3'>
                                        <img src="images/icons/fb-icon.png" alt='fb icon' className='w-[40px] h-[40px]' />
                                    </button>
                                    <button className='p-3' onClick={handleClick}>
                                        <img src="images/icons/google-icon.png" alt='google icon' className='w-[40px] h-[40px]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <div className='flex flex-col justify-center items-center'>
                            <button className='bg-[#1e4dab] text-white text-[14px] p-2 my-3 rounded-[5px]'>
                                <div className='flex items-center justify-center w-[200px] tracking-[1px]'>
                                    <img src="images/icons/fb-icon.png" alt='fb icon' className='w-[25px] h-[25px]' />
                                    <p className='p-2'>Login with Facebook</p>
                                </div>
                            </button>
                            <button
                                onClick={handleClick}
                                className='bg-[#6795f0] text-white text-[14px] p-2 my-3 rounded-[5px]'>
                                <div className='flex items-center justify-center w-[200px] tracking-[1px]'>
                                    <img src="images/icons/google-icon.png" alt='google icon' className='w-[25px] h-[25px]' />
                                    <p className='p-2'>Login with Google</p>
                                </div>
                            </button>
                        </div>
                        <div>
                            <h3 className='text-center my-4'>Or</h3>
                            <button
                                onClick={() => setShowEmail(!showEmail)}
                                className='bg-white text-black text-[14px] border-black border-2 p-2 my-3 rounded-[5px]'>
                                <div className='flex items-center justify-center w-[200px] tracking-[1px]'>
                                    <img src="images/icons/mail-icon.png" alt='google icon' className='w-[25px] h-[25px]' />
                                    <p className='p-2'>Login with Mail</p>
                                </div>
                            </button>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Login