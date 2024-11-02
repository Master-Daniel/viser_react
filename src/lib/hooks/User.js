import axiosInstance from "../../api/axiosConfig";

export const UserApi = {
    getUserProfile: async () => {
        return await axiosInstance.get('/user-info')
    },

    getUserReferralLink: async () => {
        return await axiosInstance.get('/referral-link')
    },

    profileSetting: async (formData) => {
        return await axiosInstance.post('/user-data-submit', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    changePassword: async (formData) => {
        return await axiosInstance.post('/change-password', formData)
    },
    
    loanApplication: async (form) => {
        return await axiosInstance.post(form.url, form.data)
    },
    
    loanConfirm: async (form) => {
        return await axiosInstance.post(form.url, form.data)
    },
    
    fdrApply: async (form) => {
        return await axiosInstance.post(form.url, form.data)
    },

    withdrawMethods: async () => {
        return await axiosInstance.get('/withdraw-method')
    },
    
    depositMethods: async () => {
        return await axiosInstance.get('/deposit/methods')
    },
    
    loanPlans: async () => {
        return await axiosInstance.get('/loan/plans')
    },
    
    loanList: async () => {
        return await axiosInstance.get('/loan/list')
    },
    
    fdrPlans: async () => {
        return await axiosInstance.get('/fdr/plans')
    },
    
    fdrList: async () => {
        return await axiosInstance.get('/fdr/list')
    },
    
    transferHistory: async () => {
        return await axiosInstance.get('/transfer/history')
    },
    
    fdrInstalmentLogs: async (id) => {
        return await axiosInstance.get(`/fdr/installment/logs/${id}`)
    },
    
    withdrawHistory: async () => {
        return await axiosInstance.get('/withdraw/history')
    }
}