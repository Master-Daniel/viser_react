/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from "react-query";
import MasterLayout from "../../layout/MasterLayout";
import { UserApi } from "../../lib/hooks/User";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../util/custom-functions";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
    const [methods, setMethods] = useState([]);
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [amount, setAmount] = useState(0);
    const [totalCharge, setTotalCharge] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigation = useNavigate()

    const { refetch } = useQuery('deposit-methods', UserApi.depositMethods, {
        onSuccess: ({ data }) => {
            setMethods(data.data.methods);
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (selectedGateway) {
            calculateCharges();
        }
    }, [amount, selectedGateway]);

    const handleAmountChange = (e) => {
        setAmount(parseFloat(e.target.value) || 0);
    };

    const handleGatewayChange = (method) => {
        setSelectedGateway(method);
    };

    const calculateCharges = () => {
        if (!selectedGateway) return;

        const { percent_charge, fixed_charge } = selectedGateway;

        let percentCharge = parseFloat(amount * (percent_charge / 100));
        let totalCharge = percentCharge + parseFloat(fixed_charge);
        let totalAmount = amount + totalCharge;

        setTotalCharge(totalCharge.toFixed(2));
        setTotalAmount(totalAmount.toFixed(2));
    };
    const { mutate, isLoading } = useMutation('deposit-insert', UserApi.depositInsert)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedGateway == null) {
            notifyError('Select a payment gateway')
        } else if (amount == 0) {
            notifyError(`Amount must not be less than $${Number(selectedGateway.min_amount).toFixed(2)}`)
        } else {
            mutate({
                amount: amount,
                currency: selectedGateway.currency,
                method_code: selectedGateway.method.code
            }, {
                onSuccess: ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        navigation('/dashboard/deposit/history')
                    }
                }
            })
        }
    }

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <form method="post" className="withdraw-form">
                        <div className="gateway-card">
                            <div className="row justify-content-center gy-sm-4 gy-3">
                                <div className="col-xxl-4 col-xl-5">
                                    <div className="payment-system-list is-scrollable gateway-option-list">
                                        {methods.map((method, index) => (
                                            <label key={index} htmlFor={`bank_${index}`} className="payment-item gateway-option">
                                                <div className="payment-item__info">
                                                    <span className="payment-item__check"></span>
                                                    <span className="payment-item__name">{method.name}</span>
                                                </div>
                                                <input
                                                    type="radio"
                                                    className="payment-item__radio gateway-input d-none"
                                                    id={`bank_${index}`}
                                                    name="gateway"
                                                    onChange={() => handleGatewayChange(method)}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-7">
                                    <div className="card custom--card mb-3">
                                        <div className="card-body">
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
                                                Limit: <span className="gateway-limit">{selectedGateway ? `${Number(selectedGateway.min_amount).toFixed(2)} - ${Number(selectedGateway.max_amount).toFixed(2)}` : "0.00"}</span>
                                            </small>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn--base w-100 mt-3" onClick={(e) => handleSubmit(e)} disabled={isLoading}>
                                        {
                                            isLoading ? <CircularProgress color="inherit" size={20} /> : 'Confirm Deposit'
                                        }
                                    </button>
                                    <div className="mt-3">
                                        <p>Processing Fee: <span className="processing-fee">${Number(totalCharge).toFixed(2)}</span></p>
                                        <p>Total Amount: <span className="final-amount">${Number(totalAmount).toFixed(2)}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    );
};

export default Deposit;
