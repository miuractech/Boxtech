import { useState } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { Button, Modal, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import { db } from '../../configs/firebaseconfig';

const initialValues = {
  range: '',
  amount: '',
  remark: '',
};

const validationSchema = yup.object().shape({
  range: yup.string().required('Range is required'),
  amount: yup.number().required('Amount is required'),
  remark: yup.string().required('Remark is required'),
});

function AddLedgerData({
  clientId,
  setLedgerData,
}: {
  clientId: string;
  setLedgerData: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues,
    validate: yupResolver(validationSchema),
  });

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add</Button>
      <Modal
        title="Add Ledger Data"
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            setLoading(true);
            const ledgerRef = collection(db, 'ledger');
            const timestamp = serverTimestamp();
            const document = await addDoc(ledgerRef, {
              ...values,
              timestamp,
              clientId,
            });
            setLedgerData((t: any) => [
              {
                ...values,
                timestamp: Timestamp.now().toDate(),
                clientId,
                id: document.id,
              },
              ...t,
            ]);
            setIsModalOpen(false);
            setLoading(false);
            form.reset();
          })}
        >
          <TextInput
            label="Range"
            error={form.errors['range']}
            {...form.getInputProps('range')}
          />
          <TextInput
            label="Amount"
            type="number"
            error={form.errors['amount']}
            {...form.getInputProps('amount')}
          />
          <TextInput
            label="Remark"
            error={form.errors['remark']}
            {...form.getInputProps('remark')}
          />
          <br />
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddLedgerData;
