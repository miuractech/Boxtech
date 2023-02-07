import { CatergoryType, CostType, HouseTypes } from '@boxtech/shared-constants'
import { createSlice } from '@reduxjs/toolkit'

export interface categoryState {
    category: CatergoryType[] | null
    cost: CostType|null
}

const initialState: categoryState = {
    category: null,
    cost:null
}


export const CategorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        addCategory: (state, action) => {
            state.category?.push(action.payload)
        },
        setCost: (state, action) => {
            state.cost = action.payload
        },
    },
})

export const { setCategory, addCategory, setCost } = CategorySlice.actions
export default CategorySlice.reducer






export const initialCost:CostType = {
    clientId:'',
    distanceCostPerKM:15,
    labourCost:{
        "1 BHK":{
            cost:500,
            labourCount:2
        },
        "2 BHK":{
            cost:1000,
            labourCount:4
        },
        "3 BHK":{
            cost:1500,
            labourCount:4
        },
        "4 BHK & more":{
            cost:2500,
            labourCount:6
        }
    },
    packingCostPerCubeM:10,
    vehicalCost:{
        "1 BHK":{
            cost:500,
            volumeinFtcube:1500,
            name:"Tempo"
        },
        "2 BHK":{
            cost:1000,
            volumeinFtcube:2500,
            name:"small truck"
        },
        "3 BHK":{
            cost:1500,
            volumeinFtcube:6000,
            name:"truck"
        },
        "4 BHK & more":{
            cost:2500,
            name:"Container Lorry",
            volumeinFtcube:10000
        }
    },
}