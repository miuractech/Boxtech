import {
  Button,
  Center,
  Container,
  Grid,
  LoadingOverlay,
  Skeleton,
} from '@mantine/core';
import React from 'react';
import LazyImage from '../../utils/LazyImage';
import LOGINIMG from '../../assets/img/auth.svg';
import GOOGLEIMG from '../../assets/img/Google.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, functions } from '../../configs/firebaseconfig';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { environment } from '../../environments/environment';
import { defaultErrorMessage } from '../../constants';
import { httpsCallable } from 'firebase/functions';

const provider = new GoogleAuthProvider();
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function Admin({}: Props) {
  return (
    <React.Suspense
      fallback={<LoadingOverlay visible={true} overlayBlur={2} />}
    >
      <Container className="mx-auto w-screen p-0 overflow-hidden" fluid>
        <Grid >
          <Grid.Col xs={12} md={8} >
            <div className="h-screen bg-gray-500 ">
              <div className=" text-xl my-5 text-white">Plans</div>
              <div className="flex gap-3 px-4">
              <PlansComponent   />
              <Skeleton height={450}  />
              </div>
            </div>
          </Grid.Col>
          <Grid.Col xs={12} md={4}>
            <div className="px-4">
              {/* <Center className="flex h-full min-h-[450px] justify-center align-middle mx-10"> */}
              {/* <LazyImage
                  SkeletonProps={{ width: 600 }}
                  imageProps={{
                    src: LOGINIMG,
                    className: 'w-[600px] block mt-24',
                  }}
                  alt="Edufeat-signup"
                /> */}
              <Skeleton h={500} className="mt-20 mb-10" />
              {/* </Center> */}
              {/* <div>
                <Button
                onClick={()=>{
                  const setAdmin = httpsCallable(functions, 'addAdmin')
                  setAdmin({ email: 'giriprathap995@gmail.com' });
                }}
                >set</Button>
              </div> */}
              <Button
                // size="lg"

                className="bg-slate-100 hover:bg-slate-300 text-black m-auto block"
                leftIcon={<img src={GOOGLEIMG} alt="google sign in" />}
                onClick={async () => {
                  try {
                    const authData = await signInWithPopup(auth, provider);
                    console.log(authData.user.photoURL, authData.operationType, authData.providerId);
                    const credential = GoogleAuthProvider.credentialFromResult(authData);
                    if (credential) {
                      const token = credential.accessToken;
                      console.log(token, credential);
                    }
                  } catch (error: any) {
                    console.log(error);
                    showNotification({
                      id: `reg-err-${Math.random()}`,
                      autoClose: 5000,
                      title: 'Not Authorised!',
                      message: environment.production
                        ? defaultErrorMessage
                        : error.message,
                      color: 'red',
                      icon: <IconX />,
                      loading: false,
                    });
                  }
                }}
              >
                <span className="font-extrabold">Continue with Google</span>
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </React.Suspense>
  );
}


const PlansComponent = () =>{
  return(
<div className="p-4">
  test
</div>
  )
}