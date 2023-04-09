import { useEffect, useState } from 'react';
import { Button, Title, SegmentedControl, Text } from '@mantine/core';
import { Calendar, DatePicker } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons';
import dayjs from 'dayjs';
import axios from 'axios';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addDoc, collection, doc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { useNavigate, useParams } from 'react-router-dom';
import { uuidv4 } from '@firebase/util';
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
  const [value, setValue] = useState('11 AM');
  const navigate = useNavigate();
  const [upcommingSlots, setUpcommingSlots] = useState<any>();
  const { orderId } = useParams()

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

  const handelBookSlot = async () => {
    try {
      setLoading(true);
      const startDateTime = dateTimeIn24Format(value);
      console.log(startDateTime);

      await axios.post(
        'https://asia-south1-miurac-pam.cloudfunctions.net/createEvent',
        {
          startDateTime: startDateTime,
          endDateTime: startDateTime,
        }
      );
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


  const handelConfirm = async () => {
    try {
      handelBookSlot();
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
        console.log('data',data);
        
      setUpcommingSlots(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpCommingEvents();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (!date) return;
  //       const timeSlotBooked = [false, false, false];
  //       upcommingSlots?.events?.forEach((event: any) => {
  //         if (new Date(event.start.dateTime).getDate() === date.getDate()) {
  //           const timeString = convertTZ(
  //             event.start.dateTime,
  //             event.start.timeZone
  //           )
  //             .toLocaleString()
  //             .split(',')[1];

  //           const timeVal =
  //             timeString.split(' ')[1].split(':')[0] +
  //             ' ' +
  //             timeString.split(' ')[2];
  //           const newTimeSlot = timeSlot.map((time, i) => {
  //             if (timeVal === time.start) {
  //               timeSlotBooked[i] = true;
  //             }
  //             return time;
  //           });
  //           setTimeSlot(newTimeSlot);
  //         }
  //       });
  //       setTimeSlot(
  //         timeSlot.map((item, i) => {
  //           item.disabled = timeSlotBooked[i];
  //           return item;
  //         })
  //       );
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   })();
  // }, [date]);

  return (
    <div>
      <div className="w-full min-h-[80vh] bg-[#EDF2FF] flex justify-center items-center mt-5">
        <div className="w-full md:w-[800px] md:mt-10  gap-10  bg-white min-h-[400px] grid md:grid-cols-2 grid-cols-1 rounded-md md:px-4 py-5 mx-4  ">
          <div className="col-span-1 gird-col-1 mx-auto   ">
            <div className="">
              <Title order={4} align='center'> Book your date and select slot </Title>
              <div className="shadow-md inline-block p-1 mt-4">
                <DatePicker
                  value={date}
                  onChange={setDate}
                  minDate={dayjs(Timestamp.now().toDate()).toDate()}
                  maxDate={dayjs(Timestamp.now().toDate()).add(90, 'day').toDate()}
                  className='p-5'
                  // getDayProps={(e) => {
                  //   return console.log(e);
                  // }}
                />
              </div>
            </div>
          </div>
          <div className="grid items-center">
            <div className="space-y-5">
              <Title order={3} align='center'>Booking</Title>
              <div className='grid grid-cols-2 justify-center'>
                <Text className='justify-self-end pr-1 font-medium'>
                  Available Slots on
                </Text>
                <Text className='font-medium'>{date?.toDateString()}</Text>
              </div>
              <div className="w-32 m-auto">
                <SegmentedControl
                  orientation="vertical"
                  fullWidth
                  transitionDuration={500}
                  transitionTimingFunction="linear"
                  color="primary"
                  value={value}
                  radius="lg"
                  size='md'
                  classNames={{ root: "flex gap-3" }}
                  onChange={setValue}
                  data={timeSlot.map((item) => ({
                    label: item.start,
                    value: item.start,
                    disabled: item.disabled,
                  }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 px-10 md:px-16 md:mt-0 mt-10">
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
