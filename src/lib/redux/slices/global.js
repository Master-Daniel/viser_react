import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isModalVisible: false,
    pageTitle: "",
    profile: null,
    loanPlan: {}
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
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setLoanPlan: (state, action) => {
            state.loanPlan = action.payload
        }
    }
})

export const {
    setIsLoggedIn,
    setModalVisible,
    setPageTitle,
    setProfile,
    setLoanPlan
}  = globalSlice.actions;

export default globalSlice.reducer;