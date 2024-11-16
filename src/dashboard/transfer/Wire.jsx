/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "react-query";
import { CircularProgress } from "@mui/material";
import { notifyError, notifySuccess } from "../../util/custom-functions";
import MasterLayout from "../../layout/MasterLayout";
import Tab from "./Tab";
import { setPageTitle } from "../../lib/redux/slices/global";
import { UserApi } from "../../lib/hooks/User";
import { useNavigate } from "react-router-dom";

const WireTransfer = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState({});
    const [wireData, setWireData] = useState(null);
    const navigate = useNavigate();
    const { profile } = useSelector((state) => state.global);

    const { refetch } = useQuery("fetch-wire-form", UserApi.fetchWireTransferData, {
        onSuccess: ({ data }) => {
            if (data.status === "success") {
                setFormFields(data.data.form.form_data || {});
                setWireData(data.data.setting);
            }
        },
    });

    useEffect(() => {
        refetch();
        dispatch(setPageTitle("Wire Transfer"));
    }, []);

    const validationSchema = Yup.object(
        Object.keys(formFields).reduce((schema, fieldKey) => {
            const field = formFields[fieldKey];
            if (field.is_required === "required") {
                schema[field.label] = field.type === "file"
                    ? Yup.mixed().required(`${field.name} is required`)
                    : Yup.string().required(`${field.name} is required`);
            }
            return schema;
        }, {})
    );

    const initialValues = Object.keys(formFields).reduce((values, fieldKey) => {
        values[formFields[fieldKey].label] = "";
        return values;
    }, {});

    // Add additional fields
    initialValues.amount = "";
    initialValues.auth_mode = "";

    const { mutate, isLoading } = useMutation("wire-transfer", UserApi.wireTransfer);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            mutate(values, {
                onSuccess: ({ data }) => {
                    if (data.status === "error") {
                        data.message.error.forEach((error) => notifyError(error));
                    } else {
                        data.message.success.forEach((message) => notifySuccess(message));
                        formik.resetForm();
                        navigate(`/otp-verification/${data.data.otpId}/wire-transfer/confirm`);
                    }
                },
            });
        },
    });

    return (
        <MasterLayout>
            <Tab />
            <div className="row gy-4 justify-content-center">
                <div className="col-xl-4">
                    <div className="card custom--card">
                        <div className="card-body">
                            <h6 className="card-title text-center">Transfer Limit</h6>
                            <ul>
                                <li className="pricing-card__list flex-between">
                                    <span>Minimum Per Transaction</span>
                                    <span className="fw-bold">${Number(wireData?.minimum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Maximum Per Transaction</span>
                                    <span className="fw-bold">${Number(wireData?.maximum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Daily Maximum</span>
                                    <span className="fw-bold">${Number(wireData?.daily_maximum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Monthly Maximum</span>
                                    <span className="fw-bold">${Number(wireData?.monthly_maximum_limit).toFixed(2)}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Daily Maximum Transaction</span>
                                    <span className="fw-bold">{wireData?.daily_total_transaction}</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span> Monthly Maximum Transaction</span>
                                    <span className="fw-bold">{wireData?.monthly_total_transaction}</span>
                                </li>
                            </ul>
                            <small className="text--danger">* Charge {wireData?.percent_charge}%</small>
                        </div>
                    </div>

                    <div className="card custom--card mt-3">
                        <div className="card-body">
                            <h6 className="card-title text-center">Instruction</h6>
                            <p><div style={{ textAlign: 'left' }}><br />{wireData?.instruction}</div></p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card custom--card">
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                <div className="form-group">
                                    <label className="form-label">Amount</label>
                                    <div className="input-group custom-input-group">
                                        <input
                                            type="number"
                                            step="any"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.amount}
                                            className={`form--control form-control ${formik.errors.amount && formik.touched.amount ? 'border border-danger' : ''}`}
                                            name="amount" />
                                        <span className="input-group-text">USD</span>
                                    </div>
                                    <span className="fw-bold  text--info ">Current Balance: {profile.balance}</span>
                                </div>
                                {Object.keys(formFields).map((fieldKey) => {
                                    const field = formFields[fieldKey];
                                    return (
                                        <div className="form-group" key={fieldKey}>
                                            <label className="form-label">{field.name}</label>
                                            {field.type === "text" && (
                                                <input
                                                    type="text"
                                                    name={field.label}
                                                    className={`form-control ${formik.touched[field.label] &&
                                                        formik.errors[field.label]
                                                        ? "border border-danger"
                                                        : ""
                                                        }`}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values[field.label]}
                                                />
                                            )}
                                            {field.type === "select" && (
                                                <select
                                                    name={field.label}
                                                    className={`form-control ${formik.touched[field.label] &&
                                                        formik.errors[field.label]
                                                        ? "border border-danger"
                                                        : ""
                                                        }`}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values[field.label]}
                                                >
                                                    <option value="">Select One</option>
                                                    {field.options.map((option, index) => (
                                                        <option value={option} key={index}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                            {field.type === "file" && (
                                                <input
                                                    type="file"
                                                    name={field.name}
                                                    className={`form-control ${formik.touched[field.label] &&
                                                        formik.errors[field.label]
                                                        ? "border border-danger"
                                                        : ""
                                                        }`}
                                                    onChange={(e) =>
                                                        formik.setFieldValue(
                                                            field.label,
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    onBlur={formik.handleBlur}
                                                />
                                            )}
                                            {formik.touched[field.label] &&
                                                formik.errors[field.label] && (
                                                    <div className="text-danger">
                                                        {formik.errors[field.label]}
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })}
                                <div className="form-group mt-0">
                                    <label htmlFor="verification" className="form-label">Authorization Mode</label>
                                    <select
                                        name="auth_mode"
                                        id="verification"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.auth_mode}
                                        className={`form--control form-control ${formik.errors.auth_mode && formik.touched.auth_mode ? 'border border-danger' : ''}`}>
                                        <option value="">Select One</option>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn--base w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default WireTransfer;
