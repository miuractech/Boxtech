import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';
import {
  categoryItemType,
  GooglePlacesType,
  masterFormType,
  userInfoType,
} from '../pages/Landing';
import { QuotationDataType } from '../pages/Quoatation/priceCalculation';
import { houseConfigNames } from '@boxtech/shared-constants';

const order: masterFormType = localStorage.getItem('order')
  ? JSON.parse(localStorage.getItem('order') || '')
  : null;
export type costDetailsType = {
  subTotal: number;

  gst: number;
  grandTotal: number;
};

const initialState: masterFormType = {
  from: {
    coordinates: {
      lat: null,
      lng: null,
    },
    placeId: null,
    address1: '',
    address2: '',
    landmark: '',
    addressLine:'',
    floor:0,
    hasLift:false
  },
  to: {
    coordinates: {
      lat: null,
      lng: null,
    },
    placeId: null,
    address1: '',
    address2: '',
    landmark: '',
    addressLine:'',
    floor:0,
    hasLift:false
  },
  config: '',
  hasLiftFacility: false,
  floorNumber: 0,
  transportationCost: 0,
  costDetails: {
    subTotal: 0,
    gst: 0,
    grandTotal: 0
  },
  insurance: null,
  userInfo: {
    name: '',
    phone: '',
    email: ''
  },
  quotation:null
};

export const OrderSlice = createSlice({
  name: 'Order',
  initialState: order ? order : initialState,
  reducers: {
    setFrom: (state, payload: PayloadAction<GooglePlacesType>) => {
      state.from = payload.payload;
    },
    setTo: (state, payload: PayloadAction<GooglePlacesType>) => {
      state.to = payload.payload;
    },
    setConfig: (state, payload: PayloadAction<houseConfigNames>) => {
      state.config = payload.payload;
    },
    setTranspotationCost: (state, action) => {
      state.transportationCost = action.payload;
    },
    setCostDetails: (state, action: PayloadAction<costDetailsType>) => {
      state.costDetails = action.payload;
    },
    setLiftFacility: (state, action: PayloadAction<boolean>) => {
      state.hasLiftFacility = action.payload;
    },
    setFloorNumber: (state, action: PayloadAction<number>) => {
      state.floorNumber = action.payload;
    },
    setInsurance:(state, action: PayloadAction<number | null>) => {
      state.insurance = action.payload;
    },
    setUserInfo:(state, action: PayloadAction<userInfoType>) => {
      state.userInfo = action.payload;
    },
    setQuotation:(state, action: PayloadAction<QuotationDataType>) => {
      state.quotation = action.payload;
    }
  },
});

export const {
  setConfig,
  setFrom,
  setTo,
  setLiftFacility,
  setFloorNumber,
  setCostDetails,
  setTranspotationCost,
  setInsurance,
  setUserInfo,
  setQuotation
} = OrderSlice.actions;

export default OrderSlice.reducer;
