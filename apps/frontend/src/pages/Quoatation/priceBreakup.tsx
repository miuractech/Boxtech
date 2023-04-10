/* eslint-disable no-lone-blocks */
import { clientInfoType, CostType, orderType } from '@boxtech/shared-constants'
import { Checkbox, Divider, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'
import { signOut } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { callbackify } from 'util'
import usePhoneAuth from '../../component/auth'
import BackandNextButton from '../../component/BackandNextButton'
import { app, auth, db, functions } from '../../configs/firebaseconfig'
import { environment } from '../../environments/environment'
import { displayRazorpay, loadScript } from '../../hooks/razorpay'
import { RootState } from '../../store'
import { QuotationDataType } from './priceCalculation'
import { doc, updateDoc } from 'firebase/firestore'

export const PriceBreakup = () => {
    const { orderId } = useParams()
    const [termsCond, setTermsCond] = useState(false)
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    //         } catch (error) {
    //             console.log('error', error);

    //         }
    //     })()
    // }, [])

    return (
        <div>
            <LabourCharges />
            <Divider />
            <PackingCharges />
            <Divider />
            <TransportationCharges />
            <Divider />
            <CostPerKm />
            <Divider />
            <StatisticalCharges />
            <Divider />
            <FOVcompo />
            <Divider />
            <Surcharge />
            <Divider />
            <SubTotal />
            <Divider size="sm" color="black" />
            <GrandTotal /> 
            <Divider size="sm" color="black" />
            <div className='mt-5'>
                <Text className='font-semibold text-center'>Trems & Conditions</Text>
                <Text className='text-sm flex gap-3'>
                <Checkbox className='w-fit' styles={{body:{alignItems:"flex-start"}}} onChange={(e) => setTermsCond(e.target.checked)} label={`
                 *GSTIN details should be shared in advance, no changes will be made to final Invoice once generated from the system.
                    * Quotation provided will be valid, if approved within Fifteen (15) days of submission and the move occurs within Thirty (30) days.
                    * Written confirmation of this quotation is required along with the payment of Gross Freight and GST(if applicable) prior to the commencement of packing, Settlement of balance payment will be prior to the dispatch of consignment from origin.
                    * Transit Time: (Excluding the pickup & delivery day)
                `} />
                </Text>
            </div>
            <div className='my-5'>
                <BackandNextButton
                    nextDisabled={!termsCond}
                    handelNextBtn={async () => {
                        try {
                            if (!orderId) return
                            await updateDoc(doc(db, "Orders", orderId), {
                                status: "quoationCompleted",
                            })
                        } catch (error: any) {
                            console.log(error);
                            showNotification({
                                id: `reg-err-${Math.random()}`,
                                autoClose: 5000,
                                title: 'Error!',
                                message: environment.production ? "Something went wrong try again" : error.message + '666',
                                color: 'red',
                                icon: <IconX />,
                                loading: false,
                            });
                        }
                    }}
                />
            </div>
        </div>
    )
}


const LabourCharges = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType
    return (
        <div>
            <div className='p-1 bg-[#EDF2FF] grid grid-cols-5 text-sm font-semibold'>
                <Text className='col-span-4 justify-self-center mr-5 md:mr-[190px]'>Particulars</Text>
                <Text>Amount</Text>
            </div>
            <div className='p-1 grid grid-cols-5 text-sm'>
                <div className='col-span-4 grid grid-cols-3 py-1'>
                    <div className='col-span-2 grid grid-cols-2'>
                        <div>
                            <Text>Labour Charges</Text>
                            <Text className="w-11/12 md:w-3/4 text-gray-400 text-[6px] md:text-[10px]">(inclusive of Loading, Unloading, packing, Unpacking)</Text>
                        </div>
                        {
                            quotation.labourCharges.lift ? (
                                <Text className='text-sm'>{quotation.labourCharges.config}</Text>
                            ) : (
                                    <div>
                                        <Text className='text-sm'>{quotation.labourCharges.config} + No lift</Text>
                                        <Text className='text-gray-400 text-[6px] md:text-[10px]'>({quotation.labourCharges.manPower}+2 Men)</Text>
                                    </div>
                            )
                        }
                    </div >
                    <div className=''>
                        <Text className='text-sm'>₹{quotation.labourCharges.costPerMen}</Text>
                        <Text className='text-gray-400 text-[6px] md:text-[10px]'>({quotation.labourCharges.lift ? quotation.labourCharges.manPower : quotation.labourCharges.manPower + 2} Men * ₹{quotation.labourCharges.costPerMen})</Text>
                    </div>
                </div >
                <div className='p-1'>
                    <Text className='text-sm font-medium'>₹{quotation.labourCharges.amount}</Text>
                </div>
            </div >
        </div >
    )
}

const PackingCharges = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='col-span-4 grid grid-cols-3 py-1'>
                <div className='col-span-2 grid grid-cols-2'>
                    <div>
                        <Text>Packing Charges</Text>
                        <Text size={8} className="w-11/12 md:w-3/4 text-gray-400 text-[6px] md:text-[10px]">(inclusive of packing material used)</Text>
                    </div>
                    <Text className='text-sm'>{quotation.packingCharges.totalCubeM} CFT</Text>
                </div>
                <div className=''>
                    <Text className='text-sm'>₹{quotation.packingCharges.packingCostPerCubeM}</Text>
                    <Text className='text-gray-400 text-[6px] md:text-[10px]'>({quotation.packingCharges.totalCubeM} CFT x ₹{quotation.packingCharges.packingCostPerCubeM})</Text>
                </div>
            </div>
            <div className=''>
                <Text className='text-sm font-medium'>₹{quotation.packingCharges.totalCubeM * quotation.packingCharges.packingCostPerCubeM}</Text>
            </div>
        </div>
    )
}

const TransportationCharges = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='col-span-4 grid grid-cols-3 py-1'>
                <div className='col-span-2 grid grid-cols-3 md:grid-cols-2'>
                    <div className='col-span-2 md:col-span-1'>
                        <Text>Transportation</Text>
                    </div>
                    <div>
                        <Text className='text-sm'>{quotation.TransportationCost.config}</Text>
                        <Text className='text-gray-400 text-[6px] md:text-[10px]'>{quotation.TransportationCost.details.name}</Text>
                    </div>
                </div>
                <div className=''>
                    <Text className='text-sm'>₹{quotation.TransportationCost.amount}</Text>
                </div>
            </div>
            <div className=''>
                <Text className='text-sm font-medium'>₹{quotation.TransportationCost.amount}</Text>
            </div>
        </div >
    )
}

const CostPerKm = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType
    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='col-span-4 grid grid-cols-3 py-1'>
                <div className='col-span-2 grid grid-cols-2'>
                    <Text>Cost per Km</Text>
                    <Text className=''>{quotation.costPerKM.distance}Km</Text>
                </div>
                <div className=''>
                    <Text className='text-sm'>₹{quotation.costPerKM.perKM}</Text>
                    <Text className='text-gray-400 text-[6px] md:text-[10px]'>({quotation.costPerKM.distance} km x ₹{quotation.costPerKM.perKM})</Text>
                </div>
            </div>
            <div className=''>
                <Text className='text-sm font-medium'>₹{quotation.costPerKM.amount}</Text>
            </div>
        </div >
    )
}

const StatisticalCharges = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType
    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='col-span-4'>
                <Text>Statistical Charges</Text>
            </div>
            <div className=''>
                <Text className='font-medium'>₹{quotation.statisticalCharges.amount}</Text>
            </div>
        </div >
    )
}

const FOVcompo = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType
    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='py-1 col-span-4'>
                <Text className='w-10/12 text-xs'>Freight on value (F.O.V) 3.00% of the total goods values of Rs {quotation.fov.totalValueOfGoods}</Text>
            </div>
            <div className=''>
                <Text className='font-medium'>₹{quotation.fov.amount}</Text>
            </div>
        </div >
    )
}

const Surcharge = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType
    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='py-1 col-span-4'>
                <Text className='w-10/12 text-xs'>Surcharge @ 10.00 % of the above total (Not applicable for Defense Personnel)</Text>
            </div>
            <div className=''>
                <Text className='font-medium'>₹{quotation.surCharge.amount}</Text>
            </div>
        </div >
    )
}

const SubTotal = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType

    return (
        <div className='grid grid-cols-5 text-sm my-1'>
            <div className='py-1 col-span-4 space-y-2'>
                <Text className='w-3/4'>Sub Total</Text>
                <Text className='w-3/4'>Tax( GST ): 18%</Text>
            </div>
            <div className='space-y-2'>
                <Text>₹{quotation.subTotal.amount}</Text>
                <Text>₹{quotation.subTotal.GST}</Text>
            </div>
        </div >
    )
}

const GrandTotal = () => {
    const { orderDetails } = useSelector((state: RootState) => state.orderDetails)
    const quotation = orderDetails.quotation as QuotationDataType
    return (
        <div className='grid grid-cols-5 text-sm py-1'>
            <div className='py-1 col-span-4'>
                <Text className='w-3/4 text-base font-semibold'>Grand Total</Text>
            </div>
            <div className=''>
                <Text className='text-base font-semibold'>₹{quotation.grandTotal.amount}</Text>
            </div>
        </div >
    )
}