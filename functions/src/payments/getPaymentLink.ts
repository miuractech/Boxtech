/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const GST = 0.18;
export const getPaymentLink = functions
    .region("asia-south1")
    .https.onCall(async (data, context) => {
      try {
        const id = data.id;
        functions.logger.log("not-found", "srwgfrg");
        const documentRef = admin.firestore().collection("Orders").doc(id);
        const snapshot = await documentRef.get();
        if (!snapshot.exists) {
          throw new functions.https.HttpsError(
              "not-found",
              `Document with ID ${id} not found`
          );
        }
        const docData = snapshot.data() as OrderType;
        const config = docData.config;
        const costRef = admin
            .firestore()
            .collection("Cost")
            .doc(docData.clientId);
        const costSnapshot = await costRef.get();
        if (!costSnapshot.exists) {
          throw new functions.https.HttpsError(
              "not-found",
              `Client with ID ${docData.clientId} not found`
          );
        }
        const clientCostData = costSnapshot.data() as CostType;

        const labourCharges = docData.hasLiftFacility ?
        clientCostData.labourCost[config].labourCount *
        clientCostData.labourCost[config].cost:
        (clientCostData.labourCost[config].labourCount + 2) *
        clientCostData.labourCost[config].cost;

        let volumeOfItems = 0;
        docData.selectedItems?.forEach((item) => {
          const eachItemVolume =
          Number(item.Length) * Number(item.Breadth) * Number(item.Height);
          volumeOfItems = volumeOfItems + eachItemVolume;
        });
        const packingCharges =
        volumeOfItems * clientCostData.packingCostPerCubeM;
        const TransportationCharges =
        clientCostData.vehicalCost[docData.config].cost;

        const CostPerKm = clientCostData.distanceCostPerKM * 1000;

        const StatisticalCharges = 220;
        const preFOVTotal = labourCharges+
        packingCharges+
        TransportationCharges+
        CostPerKm+
        StatisticalCharges;
        const FOVcompoTotal = preFOVTotal*1.03;
        const preTaxtotal = FOVcompoTotal * 1.10;
        const total = preTaxtotal * (GST+1);
        return Math.ceil(total * 100)/100;
      } catch (error: any) {
        throw new functions.https.HttpsError("internal", error);
      }
    });

// displayRazorpay(value ,handler)
// curl --request POST \
//      --url https://sandbox.cashfree.com/pg/orders \
//      --header 'accept: application/json' \
//      --header 'content-type: application/json' \
//      --header 'x-api-version: 2022-09-01' \
//      --data '
// {
//   "customer_details": {
//     "customer_id": "wefvwsfv",
//     "customer_email": "efwef@edf.rgv",
//     "customer_phone": "9856561145"
//   },
//   "order_tags": {
//     "newKey": "New Value"
//   },
//   "order_amount": 150,
//   "order_currency": "INR",
//   "order_id": "sfvxvfgvbsxgbvx"
// }


//         TransportationCharges: number;
//         CostPerKm: number;
//         StatisticalCharges: number;
//         FOVcompo: number;
//         Surcharge: number;

export interface OrderType {
  insurance: number;
  clientId: string;
  userid: string;
  costDetails: CostDetails;
  phone: string;
  name: string;
  floorNumber: number;
  hasLiftFacility: boolean;
  from: From;
  to: To;
  transportationCost: number;
  config: houseConfigNames;
  selectedItems?: SelectedItemsEntity[];
  email: string;
  status: string;
  timeStamp: UpdatedAtOrTimeStamp;
}
export interface CostDetails {
  grandTotal: number;
  gst: number;
  subTotal: number;
}
export interface From {
  address2: string;
  address1: string;
  placeId: string;
  coordinates: Coordinates;
  landmark: string;
  addressLine: string;
}
export interface Coordinates {
  lng: number;
  lat: number;
}
export interface To {
  data: string;
  address2: string;
  address1: string;
  placeId: string;
  coordinates: Coordinates;
  landmark: string;
  addressLine: string;
}
export interface SelectedItemsEntity {
  Category: string;
  clientId: string;
  quantity: number;
  index: number;
  Breadth: string;
  enabled: boolean;
  Name: string;
  total: number;
  Length: string;
  Price: string;
  Height: string;
  id: string;
  updatedAt: UpdatedAtOrTimeStamp;
}
export interface UpdatedAtOrTimeStamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface ClientType {
  pincode: string;
  address: string;
  clientId: string;
  sacNumber: string;
  panNumber: string;
  corporateName: string;
  gstNumber: string;
  phone: string;
  officialMail: string;
  brandName: string;
  createdAt: CreatedAtOrUpdatedAt;
  logo: string;
  updatedAt: CreatedAtOrUpdatedAt;
}
export interface CreatedAtOrUpdatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface CostType {
  clientId: string;
  labourCost: {
    [name in (typeof HouseTypes)[number]]: {
      labourCount: number;
      cost: number;
    };
  };
  vehicalCost: {
    [name in (typeof HouseTypes)[number]]: {
      volumeinFtcube: number;
      cost: number;
      name: string;
    };
  };
  distanceCostPerKM: number;
  packingCostPerCubeM: number;
}

export type houseConfigNames = "1 BHK"|"2 BHK"|"3 BHK"|"4 BHK & more"
export type HouseType = houseConfigNames[];
export const HouseTypes:HouseType = ["1 BHK", "2 BHK", "3 BHK", "4 BHK & more"];
