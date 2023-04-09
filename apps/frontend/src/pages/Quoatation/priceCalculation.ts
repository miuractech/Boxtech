import { CostType } from "@boxtech/shared-constants";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseconfig";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons"


export const priceCalculation = async (orderDetails: OrderDetailsType, clientData: ClientDataType, clientCostData: CostType, orderId: string) => {

    try {
        const UserDetails = await getDoc(doc(db, "Users", orderDetails.userId))
        let totalCC = 0;
        orderDetails.selectedItems.forEach(item => {
            const b = Number(item.Breadth)
            const l = Number(item.Length)
            const h = Number(item.Height)
            const cc = (l * b * h) * item.quantity
            return totalCC = totalCC + cc
        })
        if (UserDetails.exists()) {
            const userDetails = UserDetails.data() as UserDetailsType
            const quotationData = {
                header: {
                    logo: clientData.logo,
                    PAN: clientData.panNumber,
                    phoneNumber: clientData.phone,
                    date: serverTimestamp(),
                    address: clientData.address,
                    gstin: clientData.gstNumber,
                    email: clientData.officialMail,
                    quotationNumber: orderId
                },
                to: {
                    name: userDetails.name,
                    email: userDetails.email,
                    phoneNumber: userDetails.phone,
                    movementDate: orderDetails.bookingInfo.date,
                    movementTime: orderDetails.bookingInfo.timeSlot
                },
                fromAndTo: {
                    from: orderDetails.from.address2,
                    to: orderDetails.to.address2
                },
                selectedItems: orderDetails.selectedItems,
                labourCharges: {
                    lift: orderDetails.queryDetails.lift,
                    config: orderDetails.config,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    manPower: clientCostData.labourCost[orderDetails.config].labourCount,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    price: clientCostData.labourCost[orderDetails.config].cost,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    costPerMen: clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.config].cost : clientCostData.labourCost[orderDetails.config].cost + clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount * 2,
                },
                packingCharges: {
                    packingCostPerCubeM: clientCostData.packingCostPerCubeM,
                    totalCubeM: totalCC,
                    amount: clientCostData.packingCostPerCubeM * totalCC
                },
                TransportationCost: {
                    config: orderDetails.config,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    details: clientCostData.vehicalCost[orderDetails.config],
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: clientCostData.vehicalCost[orderDetails.config].cost
                },
                costPerKM: {
                    distance: 100,
                    perKM: clientCostData.distanceCostPerKM,
                    amount: clientCostData.distanceCostPerKM * 100
                },
                statisticalCharges: {
                    amount: 220
                },
                fov: {
                    totalValueOfGoods: orderDetails.queryDetails.coverAgeAmount,
                    coverAge: orderDetails.queryDetails.coverAge,
                    amount: orderDetails.queryDetails.coverAgeAmount * 0.03
                },
                surCharge: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    totalAmount: (orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.config].cost : clientCostData.labourCost[orderDetails.config].cost + clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: ((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.config].cost : clientCostData.labourCost[orderDetails.config].cost + clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) * 0.10
                },
                subTotal: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: (orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.config].cost : clientCostData.labourCost[orderDetails.config].cost + clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    GST: ((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.config].cost : clientCostData.labourCost[orderDetails.config].cost + clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) * 0.18,
                },
                grandTotal: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: ((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.config].cost : clientCostData.labourCost[orderDetails.config].cost + clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        ((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.config].cost : clientCostData.labourCost[orderDetails.config].cost + clientCostData.labourCost[orderDetails.config].cost / clientCostData.labourCost[orderDetails.config].labourCount * 2) +
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) * 0.18
                }


            }
            await updateDoc(doc(db, "Orders", orderId), {
                quotation: quotationData
            })
        }
    } catch (error) {
        console.log(error);
    }

}


export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface UserDetailsType {
    email: string;
    name: string;
    phone: string;
    createdAt: CreatedAt;
}


export interface Coordinate {
    lng: number;
    lat: number;
}

export interface To {
    placeId: string;
    landmark: string;
    address2: string;
    data: string;
    addressLine: string;
    coordinates: Coordinate;
    address1: string;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface UpdatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface SelectedItem {
    Height: string;
    updatedAt: UpdatedAt;
    quantity: number;
    category: string;
    Length: string;
    name: string;
    index: number;
    Breadth: string;
    clientId: string;
    total: number;
    id: string;
    enabled: boolean;
    price: string;
}

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface From {
    data: string;
    address1: string;
    coordinates: Coordinate;
    addressLine: string;
    landmark: string;
    placeId: string;
    address2: string;
}

export interface QueryDetail {
    lift: boolean;
    coverAge: boolean;
    floorNumber: number;
    coverAgeAmount: number;
}

export interface Date {
    [x: string]: any;
    seconds: number;
    nanoseconds: number;
}

export interface BookingInfo {
    date: Date;
    timeSlot: string;
}

export interface OrderDetailsType {
    clientId: string;
    to: To;
    createdAt: CreatedAt;
    userId: string;
    selectedItems: SelectedItem[];
    status: string;
    config: string;
    phoneNumber: string;
    from: From;
    queryDetails: QueryDetail;
    bookingInfo: BookingInfo;
}


export interface UpdatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface ClientDataType {
    updatedAt: UpdatedAt;
    clientId: string;
    sacNumber: string;
    pincode: string;
    phone: string;
    brandName: string;
    corporateName: string;
    officialMail: string;
    logo: string;
    createdAt: CreatedAt;
    gstNumber: string;
    panNumber: string;
    address: string;
}

export interface FromAndTo {
    to: string;
    from: string;
}

export interface LabourCharge {
    config: string;
    price: number;
    manPower: number;
    costPerMen: number;
    lift: boolean;
    amount: number;
}

export interface Date {
    seconds: number;
    nanoseconds: number;
}

export interface Header {
    date: Date;
    quotationNumber: string;
    gstin: string;
    email: string;
    address: string;
    logo: string;
    PAN: string;
    phoneNumber: string;
}

export interface UpdatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface SelectedItem {
    enabled: boolean;
    height: string;
    total: number;
    id: string;
    Name: string;
    quantity: number;
    index: number;
    clientId: string;
    updatedAt: UpdatedAt;
    length: string;
    breadth: string;
    price: string;
    category: string;
}

export interface GrandTotal {
    amount: number;
}

export interface MovementDate {
    seconds: number;
    nanoseconds: number;
}

export interface To {
    phoneNumber: string;
    movementTime: string;
    name: string;
    email: string;
    movementDate: MovementDate;
}

export interface SurCharge {
    totalAmount: number;
    amount: number;
}

export interface Detail {
    volumeinFtcube: number;
    cost: number;
    name: string;
}

export interface TransportationCost {
    config: string;
    details: Detail;
    amount: number;
}

export interface PackingCharge {
    packingCostPerCubeM: number;
    totalCubeM: number;
    amount: number;
}

export interface CostPerKM {
    amount: number;
    distance: number;
    perKM: number;
}

export interface Fov {
    totalValueOfGoods: number;
    amount: number;
    coverAge: boolean;
}

export interface SubTotal {
    gST: number;
    amount: number;
}

export interface StatisticalCharge {
    amount: number;
}

export interface QuotationDataType {
    fromAndTo: FromAndTo;
    labourCharges: LabourCharge;
    header: Header;
    selectedItems: SelectedItem[];
    grandTotal: GrandTotal;
    to: To;
    surCharge: SurCharge;
    transportationCost: TransportationCost;
    packingCharges: PackingCharge;
    costPerKM: CostPerKM;
    fov: Fov;
    subTotal: SubTotal;
    statisticalCharges: StatisticalCharge;
}

