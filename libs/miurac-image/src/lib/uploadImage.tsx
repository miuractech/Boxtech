import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import usePreviewImage from './hooks/previewHook';
import useStorage from './hooks/useStorage';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons';
import { stateUrl } from './miurac-image';
import { Button, Group, Progress, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
type Props = {
  editMode: boolean;
  setUrl: React.Dispatch<React.SetStateAction<stateUrl | null>>;
  app: FirebaseApp;
  getUrl: (url: string | string[]) => unknown | void;
  updateFirestore: boolean;
  allowMultiple: boolean;
  count?: (current: number, total: number) => void;
};

export default function UploadImage({
  editMode,
  setUrl,
  app,
  getUrl,
  updateFirestore,
  allowMultiple,
  count,
}: Props) {
  const [previewUpload, setpreviewUpload] = useState<null | string>(null);
  const [progress, setProgress] = useState({
    Total: 0,
    current: 0,
  });
  const user = getAuth(app).currentUser;
  const { upload, loading } = useStorage({ app, updateFirestore });
  const [acceptedFiles, setAcceptedFiles] = useState<any>();
  // const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
  //   useDropzone({
  //     accept: {     w
  //       'image/*': ['.png', '.svg', '.jpg', '.jpeg'],
  //     },
  //   });
  const previewUploads = usePreviewImage(acceptedFiles);

  const handlePreview = async () => {
    if (editMode) {
      setUrl({ url: previewUploads.preview, fileName: acceptedFiles[0]?.name });
    } else {
      try {
        if (allowMultiple) {
          const urls: string | string[] = [];
          let currentCount = 0;
          for (const acptFile of acceptedFiles) {
            currentCount = currentCount + 1;
            const url = (await upload({
              file: acptFile,
              path: `uploads/${user?.uid}/images`,
              fileName: acptFile.name,
            })) as string;
            urls.push(url);
            if (count) {
              count(currentCount, acceptedFiles.length);
              setProgress({
                current: currentCount,
                Total: acceptedFiles.length,
              });
            }
          }
          getUrl(urls);
        } else {
          const url = (await upload({
            file: acceptedFiles,
            path: `uploads/${user?.uid}/images`,
            fileName: acceptedFiles.name,
          })) as string;

          getUrl(url);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    if (previewUploads.preview) {
      handlePreview();
    }
  }, [previewUploads.preview]);

  if (loading) {
    return (
      <div>
        <Progress animate value={(progress.current / progress.Total) * 100} />
        <Text align="center">{progress.current + '/' + progress.Total}</Text>
      </div>
    );
  }
  return (
    <div>
      {previewUpload ? (
        <div>
          <img
            height={200}
            width={200}
            src={previewUpload}
            alt="uploaded img"
          />
          <div
            style={{
              display: 'flex',
              columnGap: '20px',
              justifyContent: 'center',
              paddingTop: '30px',
            }}
          >
            <Button variant="filled" onClick={() => setpreviewUpload('')}>
              Cancel
            </Button>
            <Button variant="filled">Save</Button>
          </div>
        </div>
      ) : (
        <Dropzone
          onDrop={(files) => setAcceptedFiles(files[0])}
          multiple={false}
          // className={"w-full"}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            position="center"
            spacing="xl"
            className="py-8"
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <span>
                <IconUpload size={50} stroke={1.5} />
              </span>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={50} stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline align="center">
                Drag Logo here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7} align="center">
                file should not exceed 1mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </div>
  );
}
