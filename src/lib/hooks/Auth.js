import axiosInstance from "../../api/axiosConfig";
// import { createAsyncThunk } from '@reduxjs/toolkit'

export const AuthApi = {
    login: async (formData) => {
        return await axiosInstance.post('/api/login', formData)
    },

    register: async (formData) => {
        return await axiosInstance.post('/api/register', formData)
    },
    
    logout: async (formData) => {
        return await axiosInstance.get('/api/logout', formData)
    },
}