import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';
import {
  categoryItemType,
  GooglePlacesType,
  masterFormType,
  userInfoType,
} from '../pages/Landing';
import { CatergoryType } from '@boxtech/shared-constants';

const order: masterFormType = localStorage.getItem('order')
  ? JSON.parse(localStorage.getItem('order') || '')
  : null;
export type costDetailsType = {
  subTotal: number;

  gst: number;
  grandTotal: number; //subTotal+ gst
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
    addressLine:''
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
    addressLine:''
  },
  config: '',
  selectedItems: [],
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
  }
};

export const OrderSlice = createSlice({
  name: 'Order',
  initialState: order ? order : initialState,
  reducers: {
    // setField:(state,payload:PayloadAction<{field:string,data:GooglePlacesType | string}>)=>{
    //   const target = {...current(state),[payload.payload.field]:payload.payload.data}
    //   state = target
    // },
    setFrom: (state, payload: PayloadAction<GooglePlacesType>) => {
      state.from = payload.payload;
    },
    setTo: (state, payload: PayloadAction<GooglePlacesType>) => {
      state.to = payload.payload;
    },
    setConfig: (state, payload: PayloadAction<string>) => {
      state.config = payload.payload;
    },
    addSelectedCategory: (state, action: PayloadAction<categoryItemType>) => {
      state.selectedItems.push(action.payload);
    },
    removeSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item['id'] !== action.payload
      );
    },
    addOrRemoveQuntity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      state.selectedItems = state.selectedItems.map((item) => {
        if (item['id'] === id) {
          item['quantity'] = quantity;
          item['total'] = Number(item['quantity']) * Number(item['Price']);
        }
        return item;
      });
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
    }
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // removeAllSelectedItems: (state, action) => {
    //   state.selectedItems = [];
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  setConfig,
  setFrom,
  setTo,
  addOrRemoveQuntity,
  addSelectedCategory,
  removeSelectedCategory,
  setLiftFacility,
  setFloorNumber,
  setCostDetails,
  setTranspotationCost,
  setInsurance,
  setUserInfo
} = OrderSlice.actions;

export default OrderSlice.reducer;
