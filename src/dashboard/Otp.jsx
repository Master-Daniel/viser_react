import { useEffect, useState } from 'react';
import MasterLayout from '../layout/MasterLayout'
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { UserApi } from '../lib/hooks/User';
import { CircularProgress } from '@mui/material';
import { notifyError, notifySuccess } from '../util/custom-functions';
import axiosInstance from '../api/axiosConfig';
import { useDispatch } from 'react-redux';
import { setWithdrawPreviewData } from '../lib/redux/slices/global';

const Otp = () => {
    const [secondsLeft, setSecondsLeft] = useState(296);
    const { id, section, action } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prevSecondsLeft) => {
                if (prevSecondsLeft <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevSecondsLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timer); 
    }, []);

    const { mutate, isLoading } = useMutation('otp-verify', UserApi.otpVerify)

    const otpForm = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: Yup.object().shape({
            otp: Yup.string().required()
        }),
        onSubmit: values => {
            mutate({
                url: `/check/otp/${id}`,
                data: {...values}
            }, {
                onSuccess: async ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else {
                        const trx = data?.data?.trx
                        
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        if (section && action) {
                            const { data } = await axiosInstance.get(`/${section}/${action}/${trx}`)
                            dispatch(setWithdrawPreviewData(data.data))
                            navigate(`/dashboard/${section}/${action}/${trx}`)
                            return;
                        }
                        navigate(-1)
                    }
                }
            })
        }
    })

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <div className="verification-code-wrapper custom--card">
                            <div className="verification-area">
                                <div className="text-center mb-4 card-img-top bg--dark p-3">
                                    <p className="text-white">Please check your mobile to get a six digit OTP</p>
                                    <p className="mt-2 text--warning otp-warning">OTP will be expired in the next</p>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="expired-time-circle">
                                            <div className="exp-time">{secondsLeft}</div>
                                                Seconds
                                            <div className="animation-circle"></div>
                                        </div>
                                        <div className="border-circle"></div>
                                    </div>

                                    <div className="try-btn-wrapper mt-2 d-none">
                                        <p className="text--danger">Your OTP has been expired </p>
                                        <form method="POST" className="w-100 mt-2">
                                            <button type="submit" className="btn--success text-white rounded p-1">Resend OTP</button>
                                        </form>
                                    </div>
                                </div>

                                <form method="post" onSubmit={otpForm.handleSubmit} className="submit-form">
                                    <div className="verification-code">
                                        <input type="text" onChange={otpForm.handleChange} onBlur={otpForm.handleBlur} name="otp" id="verification-code" className="form--control overflow-hidden" autoComplete="off" />
                                        <div className={`boxes ${otpForm.errors.otp && otpForm.touched.otp ? 'border border-danger' : ''}`}>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <button type="submit" className="btn btn-md btn--base w-100">
                                            {
                                                isLoading ? <CircularProgress size={20} color="inherit" /> : 'Verify'
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Otp