import React,{ReactNode} from 'react'
import { Nav } from './nav'
import { Footer } from './footer'
import { ClientDataType } from '../../pages/Quoatation/priceCalculation'

export const NavandFooter = ({ children,clientData }: {
    children: ReactNode, clientData: ClientDataType | null
 }) => {
    return (
        <div>
            <Nav clientData={clientData} />
            {children}
            <Footer clientData={clientData} />
        </div>
    )
}
