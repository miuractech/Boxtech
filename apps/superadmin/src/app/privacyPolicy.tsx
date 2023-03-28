import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../configs/firebaseconfig';
import { RichTextEditor } from '@mantine/rte';
import { Button } from '@mantine/core';
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
    <div>
      <Button
        onClick={() =>
          setDoc(
            doc(collection(db, 'meta'), path),
            { [path]: policy },
            { merge: true }
          )
        }
      >
        save
      </Button>
      <RichTextEditor
        sticky
        style={{ minHeight: 400 }}
        // stickyOffset={80}
        value={policy}
        onChange={setPolicy}
        id={path}
      />
    </div>
  );
}
