import { useEffect, useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Button, Title, SegmentedControl } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons';
import dayjs from 'dayjs';
import axios from 'axios';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { useNavigate } from 'react-router-dom';
// const timeSlot = [
//   { start: '6Am', end: '8Am' },
//   { start: '11Am', end: '1Pm' },
//   { start: '3Pm', end: '6Am' },
// ];

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, seterror] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [isBooked, setIsBooked] = useState(false);
  const [value, setValue] = useState('11 AM');
  const navigate = useNavigate();
  const [upcommingSlots, setUpcommingSlots] = useState<any>();

  const { order } = useSelector((state: RootState) => state);
  const { name, phoneNumber, email, user } = useSelector(
    (state: RootState) => state.User
  );

  const [timeSlot, setTimeSlot] = useState([
    {
      start: '6 AM',
      disabled: false,
    },
    {
      start: '11 AM',
      disabled: false,
    },
    {
      start: '3 PM',
      disabled: false,
    },
  ]);

  const {
    from,
    to,
    config,
    costDetails,
    transportationCost,
    hasLiftFacility,
    selectedItems,
    userInfo,
    floorNumber,
    insurance
  } = order;
  // const isLogIn = true;
  const dateTimeIn24Format = (selectedTime: string) => {
    if (!date) return;
    let time = Number(selectedTime.slice(0, -2));

    if (selectedTime[selectedTime.length - 2] === 'P') {
      time += 12;
      time %= 24;
    }
    const eventDateTime = new Date(date).setHours(time);

    return new Date(eventDateTime);
  };
  function convertTZ(date: string, tzString: string) {
    return new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString(
        'en-US',
        { timeZone: tzString }
      )
    );
  }
  const displayRazorpay = async (amount: number) => {
    const options = {
      key: 'rzp_test_iZ0M7mcNocV9mG',
      amount: amount,
      name: 'PAM',
      description: 'Tutoring / Coaching Service',
      handler: function (response: any) {
        console.log(response);
        navigate('/payment');
      },
      prefill: {
        name: user?.displayName,
        email: user?.email,
        contact: user?.phoneNumber,
      },
    };
    const _window: any = window;
    const paymentObject = await _window.Razorpay(options);
    const data = await paymentObject.open();
    console.log(data);
  };

  const handelBookSlot = async () => {
    try {
      setLoading(true);
      const startDateTime = dateTimeIn24Format(value);
      const url = await axios.post(
        'https://asia-south1-miurac-pam.cloudfunctions.net/createEvent',
        {
          startDateTime: startDateTime,
          endDateTime: startDateTime,
        }
      );
      displayRazorpay(order.costDetails.grandTotal * 100);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      seterror(true);
      setTimeout(() => {
        seterror(false);
      }, 5000);
      console.log(error);
    }
  };

  const saveOrderInfo = async () => {
    if (!user) return;
    await addDoc(collection(db, 'Orders'), {
      userid: user.uid,
      status: 'Created',
      timeStamp: serverTimestamp(),
      from,to,
      costDetails,
      transportationCost,
      config,
      hasLiftFacility,
      selectedItems,
      ...userInfo,
      floorNumber,
      insurance
    });
  };

  const handelConfirm = async () => {
    try {
      handelBookSlot();
      saveOrderInfo();
    } catch (error) {
      setLoading(false);
      seterror(true);
    }
  };

  const getUpCommingEvents = async () => {
    try {
      if (!date) return;
      const res = await axios.get(
        'https://asia-south1-miurac-pam.cloudfunctions.net/getUpCommingEvents'
      );
      const data = res.data;

      setUpcommingSlots(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      } catch (error) {
        console.log('error', error);
      }
    })();
    getUpCommingEvents();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!date) return;

        const timeSlotBooked = [false, false, false];

        upcommingSlots?.events?.forEach((event: any) => {
          if (new Date(event.start.dateTime).getDate() === date.getDate()) {
            const timeString = convertTZ(
              event.start.dateTime,
              event.start.timeZone
            )
              .toLocaleString()
              .split(',')[1];

            const timeVal =
              timeString.split(' ')[1].split(':')[0] +
              ' ' +
              timeString.split(' ')[2];
            console.log(timeVal);

            const newTimeSlot = timeSlot.map((time, i) => {
              console.log('here', time.start);
              if (timeVal === time.start) {
                timeSlotBooked[i] = true;
              }
              return time;
            });
            setTimeSlot(newTimeSlot);
          }
        });

        setTimeSlot(
          timeSlot.map((item, i) => {
            item.disabled = timeSlotBooked[i];
            return item;
          })
        );
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, [date]);

  return (
    <div>
      <div className="w-full min-h-[80vh] bg-[#EDF2FF] flex justify-center items-center mt-5">
        <div className="w-full md:w-[800px] md:mt-10  gap-10  bg-white min-h-[400px] grid md:grid-cols-2 grid-cols-1 rounded-md md:px-4 py-5 mx-4  ">
          <div className="col-span-1 gird-col-1 mx-auto   ">
            <div className="">
              <Title order={4}> Book your date and select slot </Title>
              <div className="shadow-md inline-block p-1 mt-4">
                <Calendar
                  value={date}
                  minDate={dayjs(new Date()).toDate()}
                  onChange={setDate}
                  size="md"
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center">
            <div className="">
              <Title order={4}>
                Available Slots on {date?.toDateString()}{' '}
              </Title>
              <div className="w-32 m-auto pt-5">
                {/* <Radio.Group
                  name="favoriteFramework"
                  orientation="vertical"
                  spacing="xl"
                  offset="md"
                  size="md"
                  withAsterisk
                >
                  {timeSlot.map((item, i) => (
                    <Radio value={item.start} label={item.start} />
                  ))}
                </Radio.Group> */}
                <SegmentedControl
                  orientation="vertical"
                  fullWidth
                  transitionDuration={500}
                  transitionTimingFunction="linear"
                  color="blue"
                  value={value}
                  className="flex gap-7 bg-white"
                  onChange={setValue}
                  data={timeSlot.map((item) => ({
                    label: item.start,
                    value: item.start,
                    disabled: item.disabled,
                  }))}
                />
                {/* {timeSlot.map((item, i) => (
                  <div
                    className={`${
                      selected === i
                        ? 'bg-[#339AF0]  text-white '
                        : i % 2 === 0
                        ? 'bg-[#F8F9FA] text-[#949494] '
                        : ' text-[#949494] bg-[#CED4DA] pointer-events-none '
                    }mx-auto text-center font-medium rounded w-32 cursor-pointer h-10 flex justify-center items-center`}
                    onClick={() => {
                      setSelected(i);
                    }}
                  >
                    {item.start}
                  </div>
                ))} */}
              </div>

              <div className="flex justify-between my-5">
                <Button
                  leftIcon={<IconChevronLeft />}
                  variant="outline"
                  color="#228BE6"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <Button
                  onClick={handelConfirm}
                  loading={loading}
                  loaderPosition="right"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-96 ">
        {status && (
          <Notification
            icon={<IconCheck size={18} />}
            color="teal"
            title=" Booked Successfully"
          >
            This is teal notification with icon
          </Notification>
        )}

        {error && (
          <Notification icon={<IconX size={18} />} color="red">
            Something went wrong !!
          </Notification>
        )}
      </div>
    </div>
  );
}
export const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
