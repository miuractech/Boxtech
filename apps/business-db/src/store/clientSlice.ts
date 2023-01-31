import { FileWithPath } from '@mantine/dropzone';
import { createSlice } from '@reduxjs/toolkit'

export type clientInfoType = {
    corporateName: string;
    brandName: string;
    logo: string;
    address: string;
    pincode: string;
    panNumber: string;
    gstNumber: string;
    sacNumber: string;
    officialMail: string;
    phone: string;
  }
export interface clientDetailState {
    client: clientInfoType | null | undefined
}

// export const auth = getAuth(app);

const initialState: clientDetailState | null | undefined = {
    client:undefined
}


export const ClientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClient: (state, action) => {
            state.client = action.payload
        }
    },
})

export const { setClient } = ClientSlice.actions

export default ClientSlice.reducer