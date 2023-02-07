import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';

const inputClass =
  'border-none bg-gray-100 placeholder text-sm rounded-[10px] h-12';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MantineProvider
    theme={{
      colors: {
        primary: [
          '#d3d4d4',
          '#a7a8a9',
          '#7a7d7f',
          '#646769',
          '#4e5154',
          '#383c3e',
          '#222629',
          '#1b1e21',
          '#141719',
          '#0e0f10',
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
      primaryShade: 6,
      fontFamily: 'Manrope',
      defaultRadius: 8,
      components: {
        TextInput: {
          classNames: {
            input: inputClass,
          },
        },
        Autocomplete: {
          classNames: {
            input: inputClass,
          },
        },
        Select: {
          classNames: {
            input: inputClass,
          },
        },
        Modal: {
          defaultProps: {
            transition: 'slide-down',
          },
        },
        Tooltip: {
          defaultProps: {
            transition: 'slide-down',
          },
        },
        Switch: {
          defaultProps: {
            onLabel: 'ON',
            offLabel: 'OFF',
          },
        },
        Checkbox: {
          classNames: { body: 'flex items-center' },
        },
        // SegmentedControl:{
        //   classNames:{active:"bg-[#222629] text-white"}
        // }
      },
    }}
    withGlobalStyles
  >
    <BrowserRouter>
      <NotificationsProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NotificationsProvider>
    </BrowserRouter>
  </MantineProvider>
);
