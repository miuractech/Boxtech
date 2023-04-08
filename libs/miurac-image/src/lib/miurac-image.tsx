import { Button } from '@mantine/core';
import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { ReactNode, useState } from 'react';
import EditImage from './editImage';
import ManageImages from './manageImages';
import './miurac-image.css';
import SimpleModal from './utils/simple-modal';

export type editConfigType = {
  aspectX: number;
  aspectY: number;
};
export interface MiuracImageProps {
  app: FirebaseApp;
  authComponent?: React.ReactElement;
  updateFirestore: boolean;
  editConfig: editConfigType | null;
  setUrlFunc: (url: string | string[]) => unknown | void;
  buttonComponent?: ReactNode;
  minHeight?: number;
  minWidth?: number;
  allowMultiple?: boolean;
  count?:(current:number, total:number)=>void;
  cropId:string
}

export type stateUrl = { url: string; fileName: string };

export function MiuracImage({
  app,
  authComponent,
  updateFirestore,
  editConfig,
  setUrlFunc,
  buttonComponent,
  allowMultiple,
  count,
  cropId
}: MiuracImageProps) {
  const user = getAuth(app).currentUser;
  const [url, setUrl] = useState<stateUrl | null>(null);
  const [open, setOpen] = useState(false);
  const editMode = Boolean(editConfig);

  const getUrl = (url: string | string[]) => {
    setUrlFunc(url);
    setUrl(null);
    setOpen(false);
  };
  if (user) {
    return (
      <div>
        <SimpleModal open={open} onClose={() => setOpen(false)}>
          <ManageImages
            app={app}
            updateFirestore={updateFirestore}
            editMode={editMode}
            setUrl={setUrl}
            getUrl={getUrl}
            count={count}
            allowMultiple={allowMultiple ?? false}
            cropId={cropId}
            optionOrder={["Uploads", "Recent Uploads"]}
          />
          {editConfig && url && url.url && (
            <SimpleModal open={Boolean(url)} onClose={() => setUrl(null)} >
              <EditImage
                url={url}
                updateFirestore={updateFirestore}
                editConfig={editConfig}
                getUrl={getUrl}
                // setUrl = {setUrl}
                app={app}
                onClose={() => setUrl(null)}
                cropId={cropId}
                // minHeight={minHeight}
                // minWidth={minWidth}
              />
            </SimpleModal>
          )}
        </SimpleModal>
        {buttonComponent ? (
          <div
            // style={{ display: 'inline-block' }}
            onClick={() => setOpen(true)}
          >
            {buttonComponent}
          </div>
        ) : (
          <Button variant="filled" onClick={() => setOpen(true)}>
            Upload Image
          </Button>
        )}
      </div>
    );
  } else {
    return authComponent ?? <>You're not authenticated</>;
  }
}

export default MiuracImage;
