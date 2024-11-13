import { CircularProgress } from "@mui/material";
import MasterLayout from "../../layout/MasterLayout";
import { useMutation } from "react-query";
import { UserApi } from "../../lib/hooks/User";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { notifyError, notifySuccess } from "../../util/custom-functions";
import { useNavigate, useParams } from "react-router-dom";

const WithdrawPreview = () => {
    const { withdrawPreviewData } = useSelector((state) => state.global);
    const { isLoading, mutate } = useMutation('store-withdraw', UserApi.storeWithDraw);
    const [formData, setFormData] = useState({});
    const { trx } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (withdrawPreviewData) {
            setFormData(withdrawPreviewData.form.form_data || {});
        }
    }, [withdrawPreviewData]);

    // Generate Yup validation schema based on form data requirements
    const validationSchema = Yup.object(
        Object.keys(formData).reduce((schema, key) => {
            const field = formData[key];
            if (field.is_required === "required") {
                schema[key] = Yup.string().required(`${field.label.charAt(0).toUpperCase() + field.label.slice(1)} is required`);
            } else {
                schema[key] = Yup.string();
            }
            return schema;
        }, {})
    );

    // Handle Formik submit
    const handleSubmit = (values) => {
        mutate({
            trx: trx,
            data: values
        }, {
            onSuccess: ({ data }) => {
                if (data.status == 'success') {
                    data.message.success.forEach((message) => {
                        notifySuccess(message)
                    })
                    navigate('/dashboard/withdraw/history')
                } else {
                    data.message.error.forEach((error) => {
                        notifyError(error)
                    })
                }
            }
        });
    };

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <div className="verification-code-wrapper custom--card">
                            <div className="verification-area">
                                <div className="text-center mb-4 card-img-top p-3">
                                    <h4>Preview</h4>
                                </div>

                                <Formik
                                    initialValues={Object.keys(formData).reduce((values, key) => {
                                        values[key] = "";
                                        return values;
                                    }, {})}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ errors, touched }) => (
                                        <Form className="submit-form">
                                            {Object.keys(formData).map((key) => {
                                                const field = formData[key];
                                                const capitalizedLabel = field.label.charAt(0).toUpperCase() + field.label.slice(1);

                                                return (
                                                    <div className="form-group" key={key}>
                                                        <label>{capitalizedLabel}</label>
                                                        {field.type === "text" && (
                                                            <Field
                                                                type="text"
                                                                name={key}
                                                                className={`form-control form--control ${errors[key] && touched[key] ? "is-invalid" : ""}`}
                                                            />
                                                        )}
                                                        {field.type === "select" && (
                                                            <Field
                                                                as="select"
                                                                name={key}
                                                                className={`form-control form--control ${errors[key] && touched[key] ? "is-invalid" : ""}`}
                                                            >
                                                                <option value="">Select {capitalizedLabel}</option>
                                                                {field.options.map((option, index) => (
                                                                    <option key={index} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        )}
                                                        {errors[key] && touched[key] && (
                                                            <div className="invalid-feedback">{errors[key]}</div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            <div className="form-group mt-2">
                                                <button type="submit" className="btn btn-md btn--base w-100">
                                                    {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default WithdrawPreview;
