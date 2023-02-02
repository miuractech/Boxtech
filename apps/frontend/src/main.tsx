import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<MantineProvider  theme={{
        colors: {
          // Add your color
          primary: [
            '#e9ebff',
            '#c1c6f3',
            '#9aa0e5',
            '#727ada',
            '#4a54ce',
            '#313ab5',
            '#29329C',
            '#1a2066',
            '#0e1340',
            '#03051a',
          ],
          secondary: [
            '#d7ffff',
            '#aaf8ff',
            '#7bf3ff',
            '#49ecfe',
            '#1ce7fd',
            '#02cde3',
            '#02CBE1',
            '#00737f',
            '#00454e',
            '#00191d',
          ],
        },

        primaryColor: 'primary',
        fontFamily: 'Manrope',
        defaultRadius: 8,
        components:{
          TextInput:{
            classNames:{
              input:"border-none bg-gray-100 placeholder"
            }
          },
          Autocomplete:{
            classNames:{
              input:"border-none bg-gray-100 placeholder"
            }
          }
        }
      }}
         withGlobalStyles  >
          <BrowserRouter>
      <NotificationsProvider>
        <Provider store={store}>
    <App />
  </Provider>
  </NotificationsProvider>
  </BrowserRouter>
  </MantineProvider>
);
