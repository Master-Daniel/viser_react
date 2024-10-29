import axiosInstance from "../../api/axiosConfig";

export const UserApi = {
    getUserProfile: async () => {
        return await axiosInstance.get('/api/user-info')
    },
    
    getUserReferralLink: async () => {
        return await axiosInstance.get('/api/referral-link')
    },
    
    profileSetting: async (formData) => {
        return await axiosInstance.post('/api/profile-setting', formData)
    },

    changePassword: async (formData) => {
        return await axiosInstance.post('/api/change-password', formData)
    }
}