/* eslint-disable no-lone-blocks */
import { clientInfoType, CostType, orderType } from '@boxtech/shared-constants'
import { Checkbox, Divider, Text } from '@mantine/core'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import usePhoneAuth from '../../component/auth'
import BackandNextButton from '../../component/BackandNextButton'
import { app, auth } from '../../configs/firebaseconfig'
import { displayRazorpay, loadScript } from '../../hooks/razorpay'
import { RootState } from '../../store'

export const PriceBreakup = ({ clientData, data, clientCostData }: {
    data: orderType,
    clientData: clientInfoType,
    clientCostData: CostType
}) => {
    const navigate = useNavigate()
    const { clientId, id } = useParams()
    const dispatch = useDispatch()
    const [subTotal, setSubTotal] = useState({
        labourCharges: 0,
        packingCharges: 0,
        TransportationCharges: 0,
        CostPerKm: 0,
        StatisticalCharges: 0,
        FOVcompo: 0,
        Surcharge: 0
    })
const [termsCond, setTermsCond] = useState(false)
    const handler = async (data: any) => {
        console.log(data);
        if (data.razorpay_payment_id) {
            navigate(`/${clientId}/quotation/${id}/${data.razorpay_payment_id}/success`)
            signOut(auth)
        } else {
            navigate("/failuer")
        }
    }
    return (
        <div>
            <LabourCharges data={data} clientCostData={clientCostData} setSubTotal={setSubTotal} />
            <Divider />
            <PackingCharges data={data} clientCostData={clientCostData} setSubTotal={setSubTotal} />
            <Divider />
            <TransportationCharges data={data} clientCostData={clientCostData} setSubTotal={setSubTotal} />
            <Divider />
            <CostPerKm data={data} clientCostData={clientCostData} setSubTotal={setSubTotal} />
            <Divider />
            <StatisticalCharges setSubTotal={setSubTotal} />
            <Divider />
            <FOVcompo setSubTotal={setSubTotal} subTotal={subTotal} />
            <Divider />
            <Surcharge setSubTotal={setSubTotal} subTotal={subTotal} />
            <Divider />
            <SubTotal subTotal={subTotal} />
            <Divider size="sm" color="black" />
            <GrandTotal subTotal={subTotal} />
            <Divider size="sm" color="black" />
            <div className='mt-5'>
                <Text className='font-semibold text-center'>Trems & Conditions</Text>
                <Text className='text-sm flex gap-3'><Checkbox className='w-fit' onChange={(e) => setTermsCond(e.target.checked)} /> *GSTIN details should be shared in advance, no changes will be made to final Invoice once generated from the system.
                    * Quotation provided will be valid, if approved within Fifteen (15) days of submission and the move occurs within Thirty (30) days.
                    * Written confirmation of this quotation is required along with the payment of Gross Freight and GST(if applicable) prior to the commencement of packing, Settlement of balance payment will be prior to the dispatch of consignment from origin.
                    * Transit Time: (Excluding the pickup & delivery day)</Text>
            </div>
            <div className='my-5'>
                <BackandNextButton
                    nextDisabled={!termsCond}
                    handelNextBtn={() => {
                    const sub = Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0)
                        const total = ((sub * 0.18) + sub) * 100
                        console.log(total);
                    const value = {
                        amount: total,
                        currency: "INR",
                        image: clientData.logo,
                        businessName: clientData.brandName,
                        userName: data.name,
                        userEmail: data.email,
                        userPhone:data.phone
                    }
                    displayRazorpay(value ,handler)
                } } />
            </div>
        </div>
    )
}


const LabourCharges = ({ clientCostData, data, setSubTotal }: {
    data: orderType,
    clientCostData: CostType,
    setSubTotal: React.Dispatch<React.SetStateAction<{
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }>>
}) => {
    const {config} = useSelector((state:RootState)=>state.order)
    useEffect(() => {
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
        {/* @ts-ignore */ }
        setSubTotal(prev => ({ ...prev, labourCharges: data.hasLiftFacility ? clientCostData.labourCost[data.config].labourCount * clientCostData.labourCost[data.config].cost : (clientCostData.labourCost[data.config].labourCount + 2) * clientCostData.labourCost[data.config].cost }))
    }, [])
    console.log(config);

    useEffect(() => {
        (async () => {
            try {
                await loadScript("https://checkout.razorpay.com/v1/checkout.js")
            } catch (error) {
                console.log('error', error);

            }
        })()
    }, [])

    return (
        <div>
            <div className='p-1 bg-[#EDF2FF] grid grid-cols-5 text-sm font-semibold'>
                <Text className='col-span-4 justify-self-center'>Particulars</Text>
                <Text>Amount</Text>
            </div>
            <div className='p-1 grid grid-cols-5 text-sm'>
                <div className='col-span-4 grid grid-cols-3 py-1'>
                    <div className='col-span-2'>
                        <Text>Labour Charges</Text>
                        <Text size={8} className="w-3/4">(inclusive of Loading, Unloading, packing, Unpacking)</Text>
                        {
                            data.hasLiftFacility ? (
                                <Text className='text-sm'>{data.config}</Text>
                            ) : (
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                <Text className='text-sm'>{data.config} + No lift &nbsp;<span className='text-gray-400 text-[10px]'>({clientCostData.labourCost[data.config].labourCount}+2) Men</span></Text>
                            )
                        }
                    </div >
                    <div className='pt-2'>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <Text className='text-sm'>₹{clientCostData.labourCost[data.config].cost}</Text>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <Text className='text-[8px]'>({data.hasLiftFacility ? clientCostData.labourCost[data.config].labourCount : clientCostData.labourCost[data.config].labourCount + 2} Men x ₹{clientCostData.labourCost[data.config].cost})</Text>
                    </div>
                </div >
                <div className='pt-3'>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Text className='text-sm'>₹{data.hasLiftFacility ? clientCostData.labourCost[data.config].labourCount * clientCostData.labourCost[data.config].cost : (clientCostData.labourCost[data.config].labourCount + 2) * clientCostData.labourCost[data.config].cost}.00</Text>
                </div>
            </div >
        </div >
    )
}

const PackingCharges = ({ clientCostData, data, setSubTotal }: {
    data: orderType,
    clientCostData: CostType
    setSubTotal: React.Dispatch<React.SetStateAction<{
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }>>
}) => {

    const [volumeOfItems, setVolumeOfItems] = useState(0)

    useEffect(() => {
        data.selectedItems.forEach(item => {
            const eachItemVolume = Number(item.Length) * Number(item.Breadth) * Number(item.Height)
            setVolumeOfItems(prev => prev + eachItemVolume)
        })
        setSubTotal(prev => ({ ...prev, packingCharges: volumeOfItems * clientCostData.packingCostPerCubeM }))
    }, [])

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='col-span-4 grid grid-cols-3 py-1'>
                <div className='col-span-2'>
                    <Text>Packing Charges</Text>
                    <Text size={8} className="w-3/4">(inclusive of packing material used)</Text>
                    <Text className='text-sm'>{volumeOfItems} CFT</Text>
                </div>
                <div className='pt-2'>
                    <Text className='text-sm'>₹{clientCostData.packingCostPerCubeM}</Text>
                    <Text className='text-[8px]'>({volumeOfItems} CFT x ₹{clientCostData.packingCostPerCubeM})</Text>
                </div>
            </div>
            <div className='pt-3'>
                <Text className='text-sm'>₹{volumeOfItems * clientCostData.packingCostPerCubeM}.00</Text>
            </div>
        </div>
    )
}

const TransportationCharges = ({ clientCostData, data, setSubTotal }: {
    data: orderType,
    clientCostData: CostType,
    setSubTotal: React.Dispatch<React.SetStateAction<{
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }>>
}) => {
    useEffect(() => {
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
        {/* @ts-ignore */ }
        setSubTotal(prev => ({ ...prev, TransportationCharges: clientCostData.vehicalCost[data.config].cost }))
    }, [])

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='col-span-4 grid grid-cols-3 py-1'>
                <div className='col-span-2'>
                    <Text>Transportation</Text>
                    <Text className='text-sm'>{data.config}</Text>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Text className='text-[8px]'>{clientCostData.vehicalCost[data.config].name}</Text>
                </div>
                <div className='pt-2'>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Text className='text-sm'>₹{clientCostData.vehicalCost[data.config].cost}</Text>
                </div>
            </div>
            <div className='pt-3'>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Text>₹{clientCostData.vehicalCost[data.config].cost}.00</Text>
            </div>
        </div >
    )
}

const CostPerKm = ({ clientCostData, data, setSubTotal }: {
    data: orderType,
    clientCostData: CostType
    setSubTotal: React.Dispatch<React.SetStateAction<{
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }>>
}) => {

    useEffect(() => {
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
        {/* @ts-ignore */ }
        setSubTotal(prev => ({ ...prev, CostPerKm: clientCostData.distanceCostPerKM * 1000 }))
    }, [])

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='col-span-4 grid grid-cols-3 py-1'>
                <div className='col-span-2'>
                    <Text>Cost per Km</Text>
                    <Text className='text-[12px]'>1000Km</Text>
                </div>
                <div className='pt-2'>
                    <Text className='text-sm'>₹{clientCostData.distanceCostPerKM}</Text>
                    <Text className='text-[8px]'>(1000Km x ₹{clientCostData.distanceCostPerKM})</Text>
                </div>
            </div>
            <div className='pt-3'>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Text>₹{clientCostData.distanceCostPerKM * 1000}.00</Text>
            </div>
        </div >
    )
}

const StatisticalCharges = ({ setSubTotal }: {
    setSubTotal: React.Dispatch<React.SetStateAction<{
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }>>
}) => {

    useEffect(() => {
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
        {/* @ts-ignore */ }
        setSubTotal(prev => ({ ...prev, StatisticalCharges: 220 }))
    }, [])

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='py-1 col-span-4'>
                <Text>Statistical Charges</Text>
            </div>
            <div className='pt-3'>
                <Text>₹220.00</Text>
            </div>
        </div >
    )
}

const FOVcompo = ({ setSubTotal,subTotal }: {
    setSubTotal: React.Dispatch<React.SetStateAction<{
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }>>,
    subTotal: {
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }

}) => {

    useEffect(() => {
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
        {/* @ts-ignore */ }
        setSubTotal(prev => ({ ...prev, FOVcompo: Number(Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0)*0.03) }))
    }, [])

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='py-1 col-span-4'>
                <Text className='text-[10px] w-3/4'>Freight on value (F.O.V) 3.00% of the total goods values of Rs {Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0)}</Text>
            </div>
            <div className='pt-3'>
                <Text>₹{(Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0) * 0.03).toFixed(2)}</Text>
            </div>
        </div >
    )
}

const Surcharge = ({ setSubTotal,subTotal }: {
    setSubTotal: React.Dispatch<React.SetStateAction<{
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }>>,
    subTotal: {
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }
}) => {

    useEffect(() => {
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
        {/* @ts-ignore */ }
        setSubTotal(prev => ({ ...prev, Surcharge: Number(Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0) * 0.10) }))
    }, [])

    return (
        <div className='p-1 grid grid-cols-5 text-sm'>
            <div className='py-1 col-span-4'>
                <Text className='text-[10px] w-3/4'>Surcharge @ 10.00 % of the above total (Not applicable for Defense Personnel)</Text>
            </div>
            <div className='pt-3'>
                <Text>₹{Number(Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0) * 0.10)}</Text>
            </div>
        </div >
    )
}

const SubTotal = ({ subTotal }: {
    subTotal: {
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }
}) => {

    const [total, setTotal] = useState({
        total: 0,
        tax: 0
    })

    useEffect(() => {
        setTotal({
            tax: percentage(18, Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0)),
            total: Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0)
        });

    }, [subTotal])
console.log(total, subTotal);

    function percentage(percent: number, total: number) {
        return ((percent / 100) * total)
    }

    return (
        <div className='grid grid-cols-5 text-sm my-1'>
            <div className='py-1 col-span-4 space-y-2'>
                <Text className='w-3/4'>Sub Total</Text>
                <Text className='w-3/4'>Tax( GST ): 18%</Text>
            </div>
            <div className='space-y-2'>
                <Text>₹{total.total}</Text>
                <Text>₹{(Math.round(total.tax * 100) / 100).toFixed(2)}</Text>
            </div>
        </div >
    )
}

const GrandTotal = ({ subTotal }: {
    subTotal: {
        labourCharges: number;
        packingCharges: number;
        TransportationCharges: number;
        CostPerKm: number;
        StatisticalCharges: number;
        FOVcompo: number;
        Surcharge: number;
    }
}) => {

    const [total, setTotal] = useState({
        total: 0,
        tax: 0
    })

    useEffect(() => {
        setTotal({
            tax: percentage(18, Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0)),
            total: Object.values(subTotal).reduce((partialSum, a) => partialSum + a, 0)
        });

    }, [subTotal])

    function percentage(percent: number, total: number) {
        return ((percent / 100) * total)
    }

    return (
        <div className='grid grid-cols-5 text-sm py-1'>
            <div className='py-1 col-span-4'>
                <Text className='w-3/4 text-base font-semibold'>Grand Total</Text>
            </div>
            <div className=''>
                <Text className='text-base font-semibold'>₹{total.total + Number((Math.round(total.tax * 100) / 100).toFixed(2))}</Text>
            </div>
        </div >
    )
}