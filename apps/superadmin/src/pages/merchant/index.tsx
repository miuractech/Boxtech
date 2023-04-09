import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { generalInfo } from "@boxtech/shared-constants"
import { Title } from '@mantine/core';
import MerchantExpanded from './merchantExpanded';
export default function Merchant() {
    const [data, setData] = useState<any>([]);
    const [merchantCount, setMerchantCount] = useState<number>(0);

    useEffect(() => {
      const fetchData = async () => {
        const clientCollection = collection(db, 'clients');
        const clientCollectionQurey = query(clientCollection,orderBy('createdAt','asc'));
        const clientSnapshot = await getDocs(clientCollectionQurey);
        const clientCountshot = await getDoc(doc(clientCollection,'meta'));
        const clientList = clientSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const count = clientCountshot.data() as {totalClient:number}
        setData(clientList);
        setMerchantCount(count.totalClient)
      };
      fetchData();
    }, []);
  
    return (
        <div className="px-5 py-8 bg-transparent rounded-2xl ">
            <Title order={2} className='text-center' >
            Merchants
            </Title>
            <DataTable
            className='bg-transparent'
              columns={columns}
              data={data}
              pagination
              paginationPerPage={10}
              paginationTotalRows={Math.floor(merchantCount/10)}
              expandableRows 
              expandableRowsComponent={(data)=><MerchantExpanded data={data.data} />}
            />
        </div>
    );
}

const columns = [
    {
      name: 'Name',
      selector: (row:generalInfo)=>row.corporateName,
    },
    {
      name: 'DOJ',
      selector: (row:any)=>row.createdTime,
    },
    {
      name: 'State',
      selector: (row:generalInfo)=>row.address,
    },
    {
      name: 'Contact',
      selector: (row:generalInfo)=>row.officialMail,
    },
  ];
  


  