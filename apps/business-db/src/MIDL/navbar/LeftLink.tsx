import { Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React from 'react'
import { Link } from "react-router-dom"

interface MainLinkProps {
    icon: React.ReactNode;
    color?: string;
    label: string;
    tooglesize:boolean;
    path:string;
    setOpen?:any;
}

export default function LeftLink({ icon, color, label, tooglesize, path,setOpen }: MainLinkProps) {
  const mediaQuery = useMediaQuery('(min-width: 640px)');
  return (
    <Link className='decoration-transparent' to={path} onClick={()=>{if(setOpen)setOpen(false);}} >
        <UnstyledButton
        sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            // color: "white",
            // '&:hover': {
            // backgroundColor:"#555",
            // },
            // "@media:(max-width: 600px)"
        })}
        className='md:hover:bg-gray-500 hover:bg-slate-200 flex flex-nowrap gap-x-3 whitespace-nowrap'// sm:text-black md:text-white'
        >
            <ThemeIcon color={"gray"} variant="light">
              {icon}
            </ThemeIcon>
            {(!tooglesize || !mediaQuery) && <Text size="sm" className={`${mediaQuery?"text-white":'text-black'}`} >{label}</Text>}
        </UnstyledButton>
    </Link>
  )
}