import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { categoryItemType } from '../pages/Landing';

export type OrderType = {
    orderDetails: any
    selectedItems: any[],
}

const initialState: OrderType = {
    orderDetails: null,
    selectedItems: [],
};

export const OrderDetailsSlice = createSlice({
    name: 'OrderSlice',
    initialState,
    reducers: {
        setOrderDetails: (state, action: PayloadAction<OrderType>) => {
            state.orderDetails = action.payload;
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
    },
});

export const { setOrderDetails, addSelectedCategory, removeSelectedCategory, addOrRemoveQuntity } = OrderDetailsSlice.actions;

export default OrderDetailsSlice.reducer;
