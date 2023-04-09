/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import { Table, Pagination, Button } from '@mantine/core';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import AddLedgerData from './AddLedger';

function Ledger({ clientId }: { clientId: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize] = useState(10);
  const [ledgerData, setLedgerData] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (docId: string) => {
    setIsDeleting(true);
    const docRef = doc(db, 'ledger', docId);
    await deleteDoc(docRef);
    setLedgerData((d:any[])=>d.filter(v=>v.id !== docId))
    setIsDeleting(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const ledgerRef = collection(db, 'ledger');
      const ledgerQuery = query(
        ledgerRef,
        where('clientId', '==', clientId),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );
      const querySnapshot = await getDocs(ledgerQuery);
      const data = querySnapshot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data(),
        timestamp:doc.data().timestamp.toDate()
      }));
      setLedgerData(data);
      setPageCount(Math.ceil(querySnapshot.size / pageSize));
    };

    fetchData();
  }, [pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTableRows = () => {
    return ledgerData.map((row: any) => (
      <tr key={row.id}>
        <td>{row.timestamp.toLocaleString()}</td>
        <td>{row.amount}</td>
        <td>{row.range}</td>
        <td>{row.remark}</td>
        <td>
          {' '}
          <Button variant='outline' color='red' onClick={() => handleDelete(row.id)} loading={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Ledger</h1>
      <AddLedgerData clientId={clientId} setLedgerData={setLedgerData} />
      <Table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Amount</th>
            <th>Range</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{getTableRows()}</tbody>
      </Table>
      {pageCount > 1 && (
        <Pagination
          className="mt-4"
          //@ts-ignore
          currentPage={currentPage}
          onChange={handlePageChange}
          pagesCount={pageCount}
          variant="outline"
        />
      )}
    </div>
  );
}

export default Ledger;
