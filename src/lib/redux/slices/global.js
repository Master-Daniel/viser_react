import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    }
})

export const {
    setIsLoggedIn,
}  = globalSlice.actions;

export default globalSlice.reducer;