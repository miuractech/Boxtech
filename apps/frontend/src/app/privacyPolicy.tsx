import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../configs/firebaseconfig';
import { RichTextEditor } from '@mantine/rte';
type Props = {
  path: string;
};

export default function PrivacyPolicy({ path }: Props) {
  const [policy, setPolicy] = useState('');

  useEffect(() => {
    getDoc(doc(collection(db, 'meta'), path)).then((t) =>
      setPolicy(t.data()?.[path] as unknown as string)
    );

    return () => {
      setPolicy('');
    };
  }, []);

  return (
    <div className='p-4 md:p-10' >
      <RichTextEditor className='border-none' value={policy} readOnly id={path} />
    </div>
  );
}
