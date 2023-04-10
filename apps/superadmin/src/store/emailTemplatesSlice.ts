import { createSlice } from '@reduxjs/toolkit';

export interface EmailTemplatesState {
    Templates: templateType[]|null
}

// export const auth = getAuth(app);

const initialState: EmailTemplatesState = {
    Templates:null
};

export const TemplatesSlice = createSlice({
    name: 'Templates',
    initialState,
    reducers: {
        setTemplates: (state, action) => {
            state.Templates = action.payload;
        },
    },
});

export const { setTemplates } = TemplatesSlice.actions;

export default TemplatesSlice.reducer;

export interface templateType {
    html: string;
    id: string;
    design:string
}