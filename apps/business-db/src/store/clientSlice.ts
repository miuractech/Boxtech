import { clientInfoType } from '@boxtech/shared-constants';
import { createSlice } from '@reduxjs/toolkit';


export interface clientDetailState {
  client: clientInfoType | null | undefined;
}






// export const auth = getAuth(app);

const initialState: clientDetailState | null | undefined = {
  client: undefined,
};

export const ClientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    updateClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { setClient } = ClientSlice.actions;

export default ClientSlice.reducer;
