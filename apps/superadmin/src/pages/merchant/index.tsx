import React, { useEffect, useState } from 'react';
import DataTable, { ConditionalStyles } from 'react-data-table-component';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { generalInfo } from '@boxtech/shared-constants';
import { Button, Select, Title } from '@mantine/core';
import MerchantExpanded from './merchantExpanded';
import { Link } from 'react-router-dom';
export default function Merchant() {
  const [data, setData] = useState<any>([]);
  const [merchantCount, setMerchantCount] = useState<number>(0);

  useEffect(() => {
    let unsubscribe: any = () => null;
    const fetchData = async () => {
      const clientCollection = collection(db, 'clients');
      const clientCollectionQuery = query(
        clientCollection,
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      unsubscribe = onSnapshot(clientCollectionQuery, (snapshot) => {
        const clientList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(clientList);
      });

      const clientCountshot = await getDoc(doc(clientCollection, 'meta'));
      const count = clientCountshot.data() as { totalClient: number };
      setMerchantCount(count.totalClient);
    };
    fetchData();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="px-5 py-8 bg-transparent rounded-2xl ">
      <Title order={2} className="text-center">
        Merchants
      </Title>
      <DataTable
        className="bg-transparent "
        columns={columns}
        data={data}
        pagination
        conditionalRowStyles={conditionalRowStyles}
        paginationPerPage={10}
        paginationTotalRows={Math.floor(merchantCount / 10)}
        expandableRows
        expandableRowsComponent={(data) => (
          <MerchantExpanded data={data.data} />
        )}
      />
    </div>
  );
}

const columns = [
  {
    name: 'Name',
    selector: (row: generalInfo) => row.corporateName,
  },
  {
    name: 'DOJ',
    selector: (row: any) => row.createdTime,
  },
  {
    name: 'State',
    selector: (row: generalInfo) => row.address,
  },
  {
    name: 'Contact',
    selector: (row: generalInfo) => row.officialMail,
  },
  {
    name: 'actions',
    cell: (row: generalInfo) => (
      <Select
        value={row.status}
        className="bg-inherit"
        classNames={{
          input: 'bg-inherit',
          root: 'bg-inherit',
          wrapper: 'bg-inherit',
        }}
        data={['created', 'disabled', 'banned', 'kyc error', 'active']}
        onChange={(e) => {
          if (e) {
            updateDoc(
              doc(collection(db, 'clients'), row.clientId),
              'status',
              e
            );
          }
        }}
      />
    ),
  },
  {
    name: 'usage',
    cell: (row: generalInfo) => (
      <Link to={`/stats/${row.clientId}`}>
        <Button color="indigo" variant="light" sx={{ fontWeight: 300 }}>
          Usage
        </Button>
      </Link>
    ),
  },
];

const conditionalRowStyles = [
  {
    when: (row: generalInfo) => row.status === 'active',
    style: { backgroundColor: '#BCEBBF' },
  },
  // {
  //   when: (row: generalInfo) => row.status === 'created',
  //   style: { backgroundColor: '#eee' },
  // },
  {
    when: (row: generalInfo) => row.status === 'banned',
    style: { color: '#FF2C2C' },
  },
  {
    when: (row: generalInfo) => row.status === 'disabled',
    style: { backgroundColor: '#FC814A' },
  },
  {
    when: (row: generalInfo) => row.status === 'kyc error',
    style: { backgroundColor: '#FFA5DA' },
  },
];
