import { CostType } from "@boxtech/shared-constants";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseconfig";


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
                    from: orderDetails.directions.from.address2,
                    to: orderDetails.directions.to.address2
                },
                selectedItems: orderDetails.selectedItems,
                labourCharges: {
                    lift: orderDetails.queryDetails.lift,
                    config: orderDetails.directions.config,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    manPower: clientCostData.labourCost[orderDetails.directions.config].labourCount,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    price: clientCostData.labourCost[orderDetails.directions.config].cost,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    costPerMen: clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.directions.config].cost : clientCostData.labourCost[orderDetails.directions.config].cost + clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount * 2,
                },
                packingCharges: {
                    packingCostPerCubeM: clientCostData.packingCostPerCubeM,
                    totalCubeM: totalCC,
                    amount: clientCostData.packingCostPerCubeM * totalCC
                },
                TransportationCost: {
                    config: orderDetails.directions.config,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    details: clientCostData.vehicalCost[orderDetails.directions.config],
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: clientCostData.vehicalCost[orderDetails.directions.config].cost
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
                    totalAmount: (orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.directions.config].cost : clientCostData.labourCost[orderDetails.directions.config].cost + clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.directions.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: ((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.directions.config].cost : clientCostData.labourCost[orderDetails.directions.config].cost + clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.directions.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) * 0.10
                },
                subTotal: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: (orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.directions.config].cost : clientCostData.labourCost[orderDetails.directions.config].cost + clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.directions.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    GST: (((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.directions.config].cost : clientCostData.labourCost[orderDetails.directions.config].cost + clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.directions.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) * 0.18).toFixed(2),
                },
                grandTotal: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    amount: ((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.directions.config].cost : clientCostData.labourCost[orderDetails.directions.config].cost + clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount * 2) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.directions.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) +
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        ((orderDetails.queryDetails.lift ? clientCostData.labourCost[orderDetails.directions.config].cost : clientCostData.labourCost[orderDetails.directions.config].cost + clientCostData.labourCost[orderDetails.directions.config].cost / clientCostData.labourCost[orderDetails.directions.config].labourCount * 2) +
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                        clientCostData.packingCostPerCubeM * totalCC + clientCostData.vehicalCost[orderDetails.directions.config].cost + clientCostData.distanceCostPerKM * 100 + (orderDetails.queryDetails.coverAge ? orderDetails.queryDetails.coverAgeAmount * 0.03 : 0)) * 0.18
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

export interface Date {
    seconds: number;
    nanoseconds: number;
}

export interface BookingInfo {
    timeSlot: string;
    date: Date;
}

export interface QueryDetail {
    lift: boolean;
    coverAgeAmount: number;
    floorNumber: number;
    coverAge: boolean;
}

export interface UpdatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface SelectedItem {
    updatedAt: UpdatedAt;
    quantity: number;
    Length: string;
    enabled: boolean;
    index: number;
    category: string;
    Height: string;
    clientId: string;
    price: string;
    Breadth: string;
    name: string;
    id: string;
    total: number;
}

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface To {
    addressLine: string;
    landmark: string;
    coordinates: Coordinate;
    address1: string;
    placeId: string;
    data: string;
    address2: string;
}

export interface Coordinate {
    lng: number;
    lat: number;
}

export interface From {
    address1: string;
    addressLine: string;
    landmark: string;
    coordinates: Coordinate;
    placeId: string;
    address2: string;
    data: string;
}

export interface Direction {
    to: To;
    config: string;
    phoneNumber: string;
    from: From;
}

export interface CreatedAt {
    seconds: number;
    nanoseconds: number;
}

export interface OrderDetailsType {
    bookingInfo: BookingInfo;
    queryDetails: QueryDetail;
    selectedItems: SelectedItem[];
    directions: Direction;
    userId: string;
    status: string;
    createdAt: CreatedAt;
    clientId: string;
    phoneNumber: string;
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
    GST: number;
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
    TransportationCost: TransportationCost;
    packingCharges: PackingCharge;
    costPerKM: CostPerKM;
    fov: Fov;
    subTotal: SubTotal;
    statisticalCharges: StatisticalCharge;
}

export interface UserDetailsType {
    email: string;
    name: string,
    phone: string,
    createdAt: CreatedAt,
    verified: boolean
}

