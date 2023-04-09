import { AppShell, Aside, Burger, Header, MediaQuery } from '@mantine/core';
import React, { useState } from 'react';
import Logo from './Logo';
import LeftBar from './leftBar';
import { useMediaQuery } from '@mantine/hooks';
export function NavBar({ children }: { children: React.ReactNode }) {
  const [tooglesize, setTooglesize] = useState(true);
  const [open, setOpen] = useState(false);
  const mediaQuery = useMediaQuery('(min-width: 640px)');
  return (
    <AppShell
      padding={!mediaQuery ? 0 : "lg"}
      classNames={{ main:"transform duration-300 ease-out"}}
      className="bg-[#f2f2f5] "
      header={mediaQuery ? <div></div> :
        <div className='bg-[#161C33] h-14 p-3'>
            <Burger
              opened={open}
              onClick={() => setOpen((o) => !o)}
              size="sm"
              color='white'
            />
        </div>}
      navbar={
        <LeftBar
          tooglesize={tooglesize}
          setTooglesize={setTooglesize}
          open={open}
          setOpen={setOpen}
        />
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors['dark'][8]
              : theme.colors['gray'][0],
          transition: "padding-left 0.4s"
        }
      })}
    >
      {/* <div className='transform duration-300 ease-out'> */}
        {children}
        {/* </div> */}
    </AppShell>
  );
}
