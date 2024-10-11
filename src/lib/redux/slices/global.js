import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isModalVisible: false
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setModalVisible: (state, action) => {
            state.isModalVisible = action.payload
        },
    }
})

export const {
    setIsLoggedIn,
    setModalVisible
}  = globalSlice.actions;

export default globalSlice.reducer;