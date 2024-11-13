/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import MasterLayout from "../../layout/MasterLayout";
import { UserApi } from "../../lib/hooks/User";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notifyError, notifySuccess } from "../../util/custom-functions";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Withdraw = () => {
    const [methods, setMethods] = useState([]);
    const [amount, setAmount] = useState(0);
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalCharge, setTotalCharge] = useState(0);
    const [isAmountValid, setIsAmountValid] = useState(false);
    const { profile } = useSelector((state) => state.global);
    const navigate = useNavigate()

    const { refetch } = useQuery("withdraw-methods", UserApi.withdrawMethods, {
        onSuccess: ({ data }) => {
            setMethods(data.data.withdraw_method);
            if (data.data.withdraw_method.length > 0) {
                setSelectedGateway(data.data.withdraw_method[0]); // Default to the first gateway
            }
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        calculateCharges();
    }, [amount, selectedGateway]);

    const calculateCharges = () => {
        if (!selectedGateway) return;

        const percentCharge = parseFloat(selectedGateway.percent_charge);
        const fixedCharge = parseFloat(selectedGateway.fixed_charge);
        const totalPercentCharge = (amount / 100) * percentCharge;
        const calculatedCharge = totalPercentCharge + fixedCharge;
        const calculatedAmount = amount - calculatedCharge;

        const isValid = amount >= selectedGateway.min_limit && amount <= selectedGateway.max_limit;

        setTotalCharge(calculatedCharge.toFixed(2));
        setTotalAmount(calculatedAmount.toFixed(2));
        setIsAmountValid(isValid);
    };

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setAmount(value);
    };

    const handleSelectedAuthMode = (e) => {
        withdrawForm.setFieldValue('auth_mode', e.target.value)
    }

    const handleGatewayChange = (method) => {
        setSelectedGateway(method);
    };

    const { mutate, isLoading } = useMutation('withdraw-apply', UserApi.withdrawApply)

    const withdrawForm = useFormik({
        initialValues: {
            amount: 0,
            auth_mode: ''
        },
        validationSchema: Yup.object().shape({
            amount: Yup.number().required("Amount is required").min(0),
            auth_mode: Yup.string().required('Auth mode is required')
        }),
        onSubmit: (values) => {
            mutate({
                ...values,
                method_code: selectedGateway.id,
            }, {
                onSuccess: ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else if (data.status == 'success') {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        navigate(`/otp-verification/${data.data.otpId}/withdraw/preview`);
                    }
                }
            })
        },
    });

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <form method="post" className="withdraw-form" onSubmit={withdrawForm.handleSubmit}>
                        <div className="gateway-card">
                            <div className="row justify-content-center gy-sm-4 gy-3">
                                <div className="col-xxl-4 col-xl-5">
                                    <div className="payment-system-list is-scrollable gateway-option-list">
                                        {methods.map((method) => (
                                            <label key={method.id} className="payment-item gateway-option">
                                                <div className="payment-item__info">
                                                    <span className="payment-item__check"></span>
                                                    <span className="payment-item__name">{method.name}</span>
                                                </div>
                                                <input
                                                    type="radio"
                                                    className="payment-item__radio gateway-input d-none"
                                                    name="gateway"
                                                    checked={selectedGateway && selectedGateway.id === method.id}
                                                    onChange={() => handleGatewayChange(method)}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-7">
                                    <div className="card custom--card mb-3">
                                        <div className="card-body">
                                            <h6 className="mb-3 text-end">Current Balance: {profile.balance}</h6>
                                            <div className="input-group">
                                                <span className="input-group-text">$</span>
                                                <input
                                                    type="number"
                                                    className="form-control form--control amount"
                                                    name="amount"
                                                    placeholder="Enter Amount"
                                                    onChange={handleAmountChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <small className="text-muted">
                                                Limit: {selectedGateway ? `$${Number(selectedGateway.min_limit).toFixed(2)} - $${Number(selectedGateway.max_limit).toFixed(2)}` : "0.00"}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="card custom--card mb-3">
                                        <div className="card-body">
                                            <div className="deposit-info">
                                                <span className="deposit-info__title">
                                                    Processing Charge 
                                                </span>
                                                <div className="deposit-info__input">
                                                    ${totalCharge} USD
                                                </div>
                                            </div>

                                            <div className="deposit-info pt-3">
                                                <div className="deposit-info__title">
                                                    <p className="text">Receivable</p>
                                                </div>
                                                <div className="deposit-info__input">
                                                    <p className="text">${totalAmount} USD</p>
                                                </div>
                                            </div>

                                            {selectedGateway && selectedGateway.currency !== "USD" && (
                                                <div className="deposit-info pt-2">
                                                    <div className="deposit-info__title">
                                                        <p className="text">Conversion</p>
                                                    </div>
                                                    <div className="deposit-info__input">
                                                        <p className="text">
                                                            {totalAmount * selectedGateway.rate} {selectedGateway.currency}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card custom--card">
                                        <div className="card-body">
                                            <div className="form-group mt-0">
                                                <label htmlFor="verification" className="form-label">Authorization Mode</label>
                                                <select 
                                                    onChange={(e) => handleSelectedAuthMode(e)}
                                                    onBlur={withdrawForm.handleBlur}
                                                    name="auth_mode" 
                                                    id="verification" 
                                                    className="form--control select" 
                                                >
                                                    <option disabled selected value="">Select One</option>
                                                    <option value="email">Email</option>
                                                    <option value="sms">SMS</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn--base w-100 mt-3" disabled={!isAmountValid && isLoading}>
                                        {
                                            isLoading ? <CircularProgress size={20} color="inherit" /> : 'Confirm Withdraw'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    );
};

export default Withdraw;
