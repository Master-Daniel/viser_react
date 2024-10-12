import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isModalVisible: false,
    pageTitle: ""
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
        setPageTitle: (state, action) => {
            state.pageTitle = action.payload
        }
    }
})

export const {
    setIsLoggedIn,
    setModalVisible,
    setPageTitle
}  = globalSlice.actions;

export default globalSlice.reducer;