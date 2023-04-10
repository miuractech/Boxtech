import React,{ReactNode} from 'react'
import { Nav } from './nav'
import { Footer } from './footer'

export const NavandFooter = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}
