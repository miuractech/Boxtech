import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../configs/firebaseconfig';
import { RichTextEditor } from '@mantine/rte';
type Props = {
  path: string;
  title:string
};

export default function PrivacyPolicy({ path, title }: Props) {
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
    <div className='min-h-screen pb-8' >
      <div className="py-4 pl-12 bg-[#ffd7ef] text-[35px]">
        <h1 className="m-0">{title}</h1>
      </div>
      <div
        style={{ borderBottomRightRadius: '80%' }}
        className="bg-[#ffd7ef] h-[100px]"
      ></div>
      <div className="md:w-[70%] mx-8 mr-[40%] mt-[40px] w-[90%] md:mx-auto my-[18px]">
        <RichTextEditor
          className="border-none"
          value={policy}
          readOnly
          id={path}
        />
      </div>
    </div>
  );
}
