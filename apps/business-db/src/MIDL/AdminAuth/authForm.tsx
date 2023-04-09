import { useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import {
  MantineProvider,
  Button,
  Text,
  Container,
  SegmentedControl,
} from '@mantine/core';
import { TextInput } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { object, string } from 'yup';
import { auth } from '../../configs/firebaseconfig';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../environments/environment.prod';
import { defaultErrorMessage } from '../../constants';
import { IconX } from '@tabler/icons';
import LazyImage from '../../utils/LazyImage';
import LOGINIMG from '../../assets/img/auth.svg';
import GOOGLEIMG from '../../assets/img/Google.svg';
const provider = new GoogleAuthProvider();

// Validation schema for the form
const schema = object().shape({
  email: string().email().required(),
  password: string().min(6).required(),
});

function AuthForm() {
  const [selectedTab, setSelectedTab] = useState('Sign In');
  const [formStatus, setFormStatus] = useState('');
  const form = useForm<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(schema),
  });
  return (
    <Container size="sm">
      <div className="flex flex-col items-center justify-center min-h-screen text-pink-600">
        <div className="w-full max-w-md p-8 bg-yellow-400 rounded-xl shadow-lg">
          <Text
            style={{ fontWeight: 700, fontSize: '24px', marginBottom: '16px' }}
          >
            Welcome back!
          </Text>
          <Text size={16} mb={40}>
            {selectedTab === 'Sign In' ? 'Sign in' : 'Sign up'} to access your
            account
          </Text>
          <SegmentedControl
            transitionDuration={500}
            data={['Sign In', 'Sign Up'].map((d) => ({
              label: (
                <span
                  className={
                    selectedTab === d
                      ? 'text-yellow-400 font-bold'
                      : 'text-pink-600 font-bold'
                  }
                >
                  {d}
                </span>
              ),
              value: d,
            }))}
            variant=""
            value={selectedTab}
            onChange={(value) => setSelectedTab(value)}
            fullWidth
            className="mb-6 bg-yellow-400"
            classNames={{ indicator: 'bg-pink-600 text-yellow-400 font-bold' }}
          />
          <form
            onSubmit={form.onSubmit(async (formValues) => {
              try {
                if (selectedTab === 'Sign In') {
                  setFormStatus('signing in...');
                  await signInWithEmailAndPassword(
                    auth,
                    formValues.email,
                    formValues.password
                  );
                } else {
                  setFormStatus('signing up...');
                  await createUserWithEmailAndPassword(
                    auth,
                    formValues.email,
                    formValues.password
                  );
                }
              } catch (error: any) {
                setFormStatus('');
                let message = error.message;
                if (error.code === 'auth/user-not-found') {
                  message = 'Email not registered! try sign up';
                  setSelectedTab('Sign Up');
                } else if (error.code === 'auth/email-already-in-use') {
                  message = 'Email already registered! try sign in';
                  setSelectedTab('Sign In');
                }

                showNotification({
                  id: `reg-err-${Math.random()}`,
                  autoClose: 5000,
                  title: 'Error!',
                  message: message,
                  color: 'red',
                  icon: <IconX />,
                  loading: false,
                });
              }
            })}
            className="text-left"
          >
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              type="email"
              name='email'
              value={form.values.email}
              className="mb-4 "
              classNames={{ label: 'text-pink-600', input: 'text-pink-600' }}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors['email']}
              required
            />
            <PasswordInput
              label="Password"
              name='password'
              classNames={{ label: 'text-pink-600', input: 'text-pink-600' }}
              placeholder="Enter your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors['password']}
              required
              className="mb-7"
            />
            {formStatus && (
              <Text style={{ color: '#EF4444', marginBottom: '24px' }}>
                {formStatus}
              </Text>
            )}
            {selectedTab === 'Sign In' ? (
              <Button
                type="submit"
                fullWidth
                disabled={formStatus === 'signing in...'}
                className="mb-5 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-700 text-yellow-400 font-bold rounded-xl "
              >
                {formStatus === 'signing in...' ? 'Signing In...' : 'Sign In'}
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                disabled={formStatus === 'signing up...'}
                className="mb-5 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-700 text-yellow-400 font-bold rounded-xl"
              >
                {formStatus === 'signing up...' ? 'Signing Up...' : 'Sign Up'}
              </Button>
            )}
          </form>
          <Button
            // size="lg"
            // variant='outline'
            className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-700 text-yellow-400 font-bold rounded-xl"
            leftIcon={<img src={GOOGLEIMG} alt="google sign in" />}
            onClick={async () => {
              try {
                await signInWithPopup(auth, provider);
              } catch (error: any) {
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
      </div>
    </Container>
  );
}

export default AuthForm;
