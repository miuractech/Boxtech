/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { Button, Divider, Loader, Popover, Table } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {
  collection,
  query,
  where,
  Timestamp,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { useParams } from 'react-router-dom';
import Ledger from './Ledger';
import AddLedgerData from './AddLedger';

function OrdersCount() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [lastMonthCount, setLastMonthCount] = useState<number | undefined>(
    undefined
  );
  const [thisMonthCount, setThisMonthCount] = useState<number | undefined>(
    undefined
  );
  const { clientId } = useParams();

  const handleDateRangeChange = async (values: [Date | null, Date | null]) => {
    setStartDate(values[0]);
    setEndDate(values[1]);
    if (!startDate || !endDate) {
        return;
      }
  
      setLoading(true);
  
      const startTimestamp = Timestamp.fromDate(startDate);
      const endTimestamp = Timestamp.fromDate(endDate);
  
      const q = query(
        collection(db, 'Orders'),
        where('clientId', '==', clientId),
        where('timeStamp', '>=', startTimestamp),
        where('timeStamp', '<=', endTimestamp)
      );
  
      const querySnapshot = await getDocs(q);
      const count = querySnapshot.size;
      setCount(count);
  
      setLoading(false);
  };


  useEffect(() => {
    const currentDate = new Date();
    const lastMonthStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const thisMonthStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastMonthStartTimestamp = Timestamp.fromDate(lastMonthStartDate);
    const lastMonthEndTimestamp = Timestamp.fromDate(lastMonthEndDate);
    const thisMonthStartTimestamp = Timestamp.fromDate(thisMonthStartDate);

    const lastMonthQuery = query(
        collection(db, 'Orders'),
        where('clientId', '==', clientId),
      where('timeStamp', '>=', lastMonthStartTimestamp),
      where('timeStamp', '<=', lastMonthEndTimestamp)
    );

    const thisMonthQuery = query(
      collection(db, 'Orders'),
      where('clientId', '==', clientId),
      where('timeStamp', '>=', thisMonthStartTimestamp)
    );

    getDocs(lastMonthQuery).then((querySnapshot) => {
      const count = querySnapshot.size;
      setLastMonthCount(count);
    });

    getDocs(thisMonthQuery).then((querySnapshot) => {
      const count = querySnapshot.size;
      setThisMonthCount(count);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Popover>
          <Popover.Target>
            <Button onClick={() => setIsDatePickerOpen(true)}>
              Select date range
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker
              // label="Select date range"
              placeholder="Select date range"
              type="range"
              // @ts-ignore
              value={[startDate, endDate]}
              // @ts-ignore
              onChange={handleDateRangeChange}
              color="gray"
              variant="filled"
            />
          </Popover.Dropdown>
        </Popover>
      </div>
      {loading && <Loader />}
      {startDate && endDate &&  count !== undefined && (
        <div className="mt-4">
          <p>
            Number of orders created between {startDate?.toLocaleDateString()}{' '}
            and {endDate?.toLocaleDateString()}: {count}
          </p>
        </div>
      )}
      {loading && (
        <Loader />
      ) }
      {lastMonthCount !== undefined && thisMonthCount !== undefined && (
        <div className="mt-4">
          <Table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>This month</td>
                <td>{thisMonthCount}</td>
              </tr>
              <tr>
                <td>Last month</td>
                <td>{lastMonthCount}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
      <br />
      <Divider />
      <br />
      {clientId && 
      <Ledger clientId={clientId} />
      }
    </div>
  );
}

export default OrdersCount;
