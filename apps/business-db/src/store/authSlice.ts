import { createSlice } from '@reduxjs/toolkit'
import { User } from "firebase/auth"

export interface UserDetailState {
    loading: boolean
    user: User | null | undefined
}

// export const auth = getAuth(app);

const initialState: UserDetailState = {
    loading: true,
    user: undefined,
}


export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        submit: (state, action) => {
            state.user = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
            state.loading = false
        },
    },
})

export const { setUser, submit, } = UserSlice.actions

export default UserSlice.reducer