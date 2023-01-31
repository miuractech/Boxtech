import {
  Box,
  Drawer,
  Navbar,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconClipboardText,
  IconCreditCard,
  IconLogout,
  IconUsers,
  IconUserCheck,
  IconPackage,
  IconGift,
  IconSettings
} from '@tabler/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LeftLink from './LeftLink';
import Logo from './Logo';

type Props = {
  tooglesize: boolean;
  setTooglesize: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function LeftBar({ tooglesize, setTooglesize, open, setOpen }: Props) {
  const theme = useMantineTheme();
  const mediaQuery = useMediaQuery('(min-width: 640px)');
  return mediaQuery ? (
    <Navbar
      sx={{ background: '#161C33', color: theme.white, top: 0 ,transition: "width 0.4s", }}
      width={{ base: tooglesize ? 80 : 240 }}
      height={''}
      p="md"
      onMouseEnter={()=>setTooglesize(false)}
      onMouseLeave={()=>setTooglesize(true)}
    >
      <NavSections tooglesize={tooglesize} setTooglesize={setTooglesize} />
    </Navbar>
  ) : (
    <Drawer
      position="left"
      size="sm"

      opened={open}
        onClose={() => setOpen(false)}
        padding="md"
        // className='bg-[#161C33]'
    >
      {/* {!mediaQuery && <Logo type="full" color="light" height={'40'} />} */}
      <NavSections tooglesize={tooglesize} setTooglesize={setTooglesize} setOpen={setOpen} />
    </Drawer>
  );
}

type NavSectionsType = {
  tooglesize: boolean;
  setTooglesize?: any;
  setOpen?: any;
};

export function NavSections({ tooglesize, setOpen }: NavSectionsType) {
  const { user } = useSelector((state: RootState) => state.user)
  const { client } = useSelector((state: RootState) => state.client)
  return (
    <>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs" >
          <div className='bg-white rounded-md mb-5 p-3 flex gap-3'>
           <img src={client?.logo} className='w-full max-h-16 max-w-[64px] mx-auto' alt="" />
          </div>
        <Box>
          <LeftLink
            path={'/'}
            icon={<IconClipboardText size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Bookings'}
            setOpen={setOpen}
          />
          <LeftLink
            path={'/Payments'}
            icon={<IconCreditCard size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Payment'}
            setOpen={setOpen}
          />
          <LeftLink
            path={'/Staff'}
            icon={<IconUserCheck size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Staff'}
            setOpen={setOpen}
          />
          <LeftLink
            path={'/Customers'}
            icon={<IconUsers size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Customers'}
            setOpen={setOpen}
          />
          <LeftLink
            path={'/Products'}
            icon={<IconPackage size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Products'}
            setOpen={setOpen}
          />
          {/* <LeftLink
            path={'/Coupons'}
            icon={<IconGift size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Coupons and gift'}
            setOpen={setOpen}
          /> */}
           <LeftLink
            path={'/settings'}
            icon={<IconSettings size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Settings'}
            setOpen={setOpen}
          />
          <LeftLink
            path={'/Logout'}
            icon={<IconLogout size={16} color="black" />}
            color="#e0e0e0"
            tooglesize={tooglesize}
            label={'Logout'}
            setOpen={setOpen}
          />
        </Box>
      </Navbar.Section>
      {/* {mediaQuery && <Navbar.Section>
        <Box
          sx={(theme) => ({
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            paddingTop: theme.spacing.lg,
            borderTop: `1px solid ${theme.colorScheme === 'dark'
              ? theme.colors['dark'][4]
              : theme.colors['gray'][2]
              }`,
          })}

        >
          <Group position="apart">
            <div />
            <ActionIcon
              variant="default"
              onClick={() => {
                setTooglesize(!tooglesize)
                if (setOpen) setOpen(false)
              }}
              size={30}
              sx={() => ({
                color: 'white',
                '&:hover': {
                  backgroundColor: 'black',
                },
              })}
            >
              <ThemeIcon color={'#161C33'} variant="light">
                {tooglesize ? (
                  <IconChevronRight color="white" size={16} />
                ) : (
                  <IconChevronLeft color="white" size={16} />
                )}
              </ThemeIcon>
            </ActionIcon>
          </Group>
        </Box>
      </Navbar.Section>} */}
    </>
  );
}
