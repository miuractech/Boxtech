import React from 'react';
import './navbar.css';
import { useState } from 'react';
import OverlayCnt from '../overlay/OverlayCnt';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../../assets/img/boxtech.png"
import { Button, Drawer, Text } from "@mantine/core";
export const Navbar = () => {


  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [userDetails, setUserDetails] = useState(null);


  const auth = getAuth();
  const navigate = useNavigate();




  const handleClick = () => {
    setShowOverlay(!showOverlay);
  }



  const closeOverlay = () => {
    setShowOverlay(false);
  }

  const handleLogout = () => {
    try {
      auth.signOut();
      navigate('/');
      alert('Logged out successfully...!')
      setUserDetails(null);
    } catch (error) {
      alert(error.message);
    }
  }


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserDetails(user);
    })
  });



  return (
    <div>
      <div className='pl-8 sm:pl-0 sm:pr-0 fixed bg-white w-full shadow-md z-50 '>
        <nav className="navigation" >
          <Link to="/" className="brand-name" >
            <div className='flex gap-3'>
              <img src={logo} alt="logo" className="h-14 self-center" />
              <div className='self-center'>
                <Text size={20} weight={700}>boxtech</Text>
                <Text size={10}>Book. Schedule. Pickup.</Text>
              </div>
            </div>
          </Link>
          <button
            className="hamburger"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            {/* icon from Heroicons.com */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="white"
            >
              {!isNavExpanded ? <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
                : <>

                  <line x1="2" y1="20"
                    x2="18" y2="4"
                    stroke="white"
                    stroke-width="2" />
                  <line x1="2" y1="4"
                    x2="18" y2="20"
                    stroke="white"
                    stroke-width="2" />
                </>
              }
            </svg>
          </button>
          {/* {showOverlay &&
          <OverlayCnt onClickFunction={closeOverlay} />
        } */}

          <Drawer position='top' opened={isNavExpanded} classNames={{ drawer: 'h-auto' }} onClose={() => setIsNavExpanded(false)} withCloseButton={false} >
            <ul className='items-center justify-center list-none gap-y-4 flex flex-col py-16'>

              <li className=''>
                <Link to="/" className='text-[16px] sm:text-[16px] text-black no-underline'>Home</Link>
              </li>
              <li>
                {/* <Link to="/checkout"> */}
                <button
                  onClick={() => {
                    window.location.href = "https://admin.boxtech.miurac.com/"
                  }}
                  className='bg-[#edbd0f] color-white p-2 rounded-[5px] text-[16px] text-white w-[130px]'>
                  Get Started
                </button>
                {/* </Link> */}
              </li>
            </ul>
          </Drawer>

          <div
            className={
              "navigation-menu mr-5"
            }
          >
            <ul className='mr-[25px] sm:mr-[0] items-center justify-center'>
              <li>
                <Link to="/" className='text-[16px] sm:text-[16px]'>
                  <Button variant='white'>
                    Home
                  </Button>
                </Link>
              </li>
              {/* <li>
                <Link to="#products" className='text-[16px] sm:text-[16px]'>Product</Link>
              </li>
              <li>
                <Link to="/pricing-plans" className='text-[16px] sm:text-[16px]'>Pricing Plans</Link>
              </li>
              <li>
                <Link to="#footer" className='text-[16px] sm:text-[16px]'>Contact</Link>
              </li>
              {
                userDetails
                    ? <div style={{'display':'flex' , 'alignItems':'center','justifyContent':'center'}}>
                            <li>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{
                                      backgroundImage:
                                      userDetails.photoURL
                                      ? `url(${userDetails.photoURL})`
                                      : `url('images/icons/user.png')`,
                                      backgroundSize : 'cover',
                                      backgroundPosition:'center',
                                      height:'35px',
                                      width:'35px',
                                      borderRadius:'50%',
                                    }}

                                  >
                                    <img src={userDetails.photoURL} alt='profile pic' className='cursor-pointer rounded-[50%] w-full h-full'/>
                                    <MenuItem className='text-[16px]'>
                                      <Link to='/account'>
                                          My Account
                                      </Link>
                                    </MenuItem>
                                    <MenuItem className='text-[16px]'>
                                      <Link to='/subscriptions'  >
                                          My Subscription
                                      </Link>
                                    </MenuItem>
                                    <MenuItem>
                                    <li onClick={handleLogout}>
                                      <button className='text-[16px]' onClick={handleLogout}>
                                          Logout
                                      </button>
                                    </li>
                                    </MenuItem>
                                  </Select>
                            </li>
                      </div>
                    : <li className='cursor-pointer'>
                        <button className='text-[16px] sm:text-[16px]' onClick={handleClick}>
                            Login
                        </button>
                      </li>
              }    */}
              <li>
                {/* <Link to="/checkout"> */}
                <Button
                  onClick={() => {
                    window.location.href = "https://admin.boxtech.miurac.com/"
                  }}
                  className=''>
                  Get Started
                </Button>
                {/* </Link> */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
