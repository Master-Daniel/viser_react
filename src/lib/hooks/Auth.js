import axiosInstance from "../../api/axiosConfig";
// import { createAsyncThunk } from '@reduxjs/toolkit'

export const AuthApi = {
    login: async (formData) => {
        return await axiosInstance.post('/login', formData)
    },

    register: async (formData) => {
        return await axiosInstance.post('/register', formData)
    },
    
    logout: async (formData) => {
        return await axiosInstance.get('/logout', formData)
    },
}