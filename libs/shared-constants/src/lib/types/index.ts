import { CollectionReference, DocumentData } from 'firebase/firestore';
import { HouseTypes } from '../shared-constants';

export type houseConfigNames = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK & more';
export type HouseType = houseConfigNames[];
export interface CatergoryType {
  Length: string;
  enabled: boolean;
  Price: string;
  index: number;
  Category: string;
  createdAt: CreatedAt;
  id: string;
  Breadth: string;
  // createdBy: string;
  Height: string;
  Name: string;
  quantity?: number;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
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

export type legalType = {
  legalName: string;
  cinOrLlpinNo: string;
  cinOrLlpinProof: string;
  sacNumber: string;
};

export type panType = {
  panNumber: string;
  panProof: string;
};

export type gstType = {
  gstNumber: string;

  gstProof: string;
};
export type bankType = {
  bankName: string;
  bankAccountNo: string;
  ifscCode: string;
  bankStatement: string;
};

export interface KYCType extends bankType, gstType, panType, legalType {}
export interface clientInfoType extends generalInfo, KYCType {}

export interface generalInfo {
  clientId?: string;
  createdTime?: TimeStamp;
  corporateName: string;
  brandName: string;
  logo: string;
  address: string;
  pincode: string;
  officialMail: string;
  phone: string;
  kyc: boolean;
}

export interface orderType {
  to: To;
  transportationCost: number;
  config: string;
  userid: string;
  status: string;
  phone: string;
  insurance: number;
  floorNumber: number;
  email: string;
  selectedItems: SelectedItem[];
  hasLiftFacility: boolean;
  timeStamp: TimeStamp;
  from: From;
  name: string;
  costDetails: CostDetails;
}

export interface To {
  data: Data;
  coordinates: Coordinates;
  landmark: string;
  address1: string;
  address2: string;
}

export interface Data {
  terms: Term[];
  types: string[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  matched_substrings: MatchedSubstring[];
  description: string;
}

export interface Term {
  value: string;
  offset: number;
}

export interface StructuredFormatting {
  secondary_text: string;
  main_text: string;
  main_text_matched_substrings: MainTextMatchedSubstring[];
}

export interface MainTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SelectedItem {
  Length: string;
  updatedAt: UpdatedAt;
  Name: string;
  index: number;
  clientId: string;
  Breadth: string;
  Price: string;
  Category: string;
  total: number;
  id: string;
  quantity: number;
  Height: string;
  enabled: boolean;
}

export interface UpdatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}

export interface From {
  data: Data2;
  coordinates: Coordinates2;
  address1: string;
  address2: string;
  landmark: string;
}

export interface Data2 {
  reference: string;
  description: string;
  structured_formatting: StructuredFormatting2;
  terms: Term2[];
  types: string[];
  place_id: string;
  matched_substrings: MatchedSubstring2[];
}

export interface StructuredFormatting2 {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: MainTextMatchedSubstring2[];
}

export interface MainTextMatchedSubstring2 {
  length: number;
  offset: number;
}

export interface Term2 {
  offset: number;
  value: string;
}

export interface MatchedSubstring2 {
  offset: number;
  length: number;
}

export interface Coordinates2 {
  lat: number;
  lng: number;
}

export interface CostDetails {
  subTotal: number;
  gst: number;
  grandTotal: number;
}
