import axiosInstance from "../../api/axiosConfig";

export const UserApi = {
    getUserProfile: async () => {
        return await axiosInstance.get('/user-info')
    },
    
    getDashboardData: async () => {
        return await axiosInstance.get('/dashboard')
    },

    getUserReferralLink: async () => {
        return await axiosInstance.get('/referral-link')
    },
    
    getOwnBeneficiaries: async () => {
        return await axiosInstance.get('/beneficiary/own')
    },
    
    getOtherBeneficiaries: async () => {
        return await axiosInstance.get('/beneficiary/other')
    },

    profileSetting: async (formData) => {
        return await axiosInstance.post('/user-data-submit', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
    createTicket: async (formData) => {
        return await axiosInstance.post('/ticket/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
    replyTicket: async (formData) => {
        return await axiosInstance.post(`/ticket/reply/${formData.id}`, formData.data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    changePassword: async (formData) => {
        return await axiosInstance.post('/change-password', formData)
    },
    
    storeWithDraw: async (formData) => {
        return await axiosInstance.post(`/withdraw-request/confirm/${formData.trx}`, formData.data)
    },
    
    otpVerify: async (formData) => {
        return await axiosInstance.post(formData.url, formData.data)
    },
    
    transferWithin: async (formData) => {
        console.log(formData)
        return await axiosInstance.post(`/own/transfer/request/${formData.id}`, formData.data)
    },
    
    addBeneficiary: async (formData) => {
        return await axiosInstance.post('/beneficiary/own', formData, {
            headers: { 'Content-Type': 'application/json' }
        });
    },
    
    
    checkAccountNumber: async (number) => {
        return await axiosInstance.get(`/beneficiary/account-number/check?account_number=${number}`)
    },

    addOtherBeneficiary: async (formData) => {
        return await axiosInstance.post('/beneficiary/other', formData)
    },
    
    depositInsert: async (formData) => {
        return await axiosInstance.post('/deposit/insert', formData)
    },
    
    wireTransfer: async (formData) => {
        return await axiosInstance.post('/wire-transfer/request', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
    loanApplication: async (form) => {
        return await axiosInstance.post(form.url, form.data)
    },
    
    loanConfirm: async (form) => {
        return await axiosInstance.post(form.url, form.data)
    },
    
    closeTicket: async (form) => {
        return await axiosInstance.post(form.url)
    },
    
    fdrApply: async (form) => {
        return await axiosInstance.post(form.url, form.data)
    },

    withdrawMethods: async () => {
        return await axiosInstance.get('/withdraw-method')
    },
    
    withdrawApply: async (formData) => {
        return await axiosInstance.post('/apply', formData)
    },
    
    depositMethods: async () => {
        return await axiosInstance.get('/deposit/methods')
    },
    
    depositHistory: async () => {
        return await axiosInstance.get('/deposit/history')
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
    
    fetchWireTransferData: async () => {
        return await axiosInstance.get('/wire-transfer')
    },
    
    fdrInstalmentLogs: async (id) => {
        return await axiosInstance.get(`/fdr/installment/logs/${id}`)
    },
    
    transactionHistory: async () => {
        return await axiosInstance.get(`/transactions`)
    },
    
    supportTickets: async () => {
        return await axiosInstance.get(`/ticket`)
    },
    
    viewSupportTicket: async (id) => {
        return await axiosInstance.get(`/ticket/view/${id}`)
    },
    
    withdrawHistory: async () => {
        return await axiosInstance.get('/withdraw/history')
    }
}