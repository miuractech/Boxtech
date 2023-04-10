import { Button } from "@mantine/core";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../configs/firebaseconfig";

export default function Home() {
  return (
    <div>
         <Button
        onClick={() => {
          addDoc(collection(db, 'mail'), {
            message: {
              html: '<p>avfafvfvfv</p>',
              subject: 'test',
              text: 'test message',
            },
            to: ['sanjeevexpo1@gmail.com'],
          });
        }}
      >
        send mail
      </Button>
    </div>
  )
}