/* eslint-disable react-hooks/exhaustive-deps */
import MasterLayout from '../../layout/MasterLayout'
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../lib/redux/slices/global';
import Tab from './Tab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useMutation } from 'react-query';
import { UserApi } from '../../lib/hooks/User';
import { notifyError, notifySuccess } from '../../util/custom-functions';
import { CircularProgress } from '@mui/material';

const Beneficiaries = () => {

    const [isModalVisible, setModal] = useState(false)
    const dispatch = useDispatch()

    const handleClick = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    useEffect(() => {
        dispatch(setPageTitle('Transfer Money Within'))
    }, [])

    const { mutate, isLoading } = useMutation('add-beneficiary', UserApi.addBeneficiary)

    const benefitForm = useFormik({
        initialValues: {
            account_name: "",
            account_number: "",
            short_name: ""
        },
        validationSchema: Yup.object().shape({
            account_name: Yup.string().required('Account name is required'),
            account_number: Yup.string().required('Account number is required'),
            short_name: Yup.string().required('Short name is required')
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: ({ data }) => {
                    console.log(data)
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                        benefitForm.resetForm()
                    }
                }
            })
        }
    })

    return (
        <MasterLayout>
            <Tab />
            <div className={`card custom--card mb-4 ${!isModalVisible ? 'd-none' : ''}`} id="addForm">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">Add Beneficiary</h5>
                        <button className="btn btn--sm btn--danger close-form" onClick={handleClose} type="button"><i className="la la-times"></i></button>
                    </div>
                </div>

                <div className="card-body p-4">
                    <form method="POST" onSubmit={benefitForm.handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Select Bank</label>
                            <select className="form--control" name="bank" required>
                                <option value="" disabled selected>Select One</option>
                                <option value="1">SCA Bank</option>
                                <option value="2">BNR Bank</option>
                                <option value="3">JB Bank</option>
                                <option value="4">FCII Bank</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Short Name</label>
                            <input 
                                onChange={benefitForm.handleChange}
                                onBlur={benefitForm.handleBlur}
                                value={benefitForm.values.short_name}
                                className={`form--control ${benefitForm.errors.short_name && benefitForm.touched.short_name ? 'border border-danger' : ''}`}
                                name="short_name" 
                                type="text" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Account Name:</label>
                            <input 
                                onChange={benefitForm.handleChange}
                                onBlur={benefitForm.handleBlur}
                                value={benefitForm.values.account_name}
                                className={`form--control ${benefitForm.errors.account_name && benefitForm.touched.account_name ? 'border border-danger' : ''}`}
                                name="account_name" 
                                type="text" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Account Number:</label>
                            <input
                                onChange={benefitForm.handleChange}
                                onBlur={benefitForm.handleBlur}
                                value={benefitForm.values.account_number}
                                className={`form--control ${benefitForm.errors.account_number && benefitForm.touched.account_number ? 'border border-danger' : ''}`}
                                name="account_number"
                                type="text" />
                        </div>
                        <button className="btn w-100 btn--base" type="submit" disabled={isLoading}>
                            {
                                isLoading ? <CircularProgress color='inherit' size={20} /> : 'Submit'
                            }
                        </button>
                    </form>
                </div>
            </div>
            <div className="card custom--card overflow-hidden">
                <div className="card-header">
                    <div className="header-nav mb-0">
                        <button type="button" onClick={handleClick} className="btn btn-dark add-btn"><i className="la la-plus-circle"></i> Add New Beneficiary</button>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table--responsive--md">
                            <thead>
                                <tr>
                                    <th>Bank</th>
                                    <th>Account No.</th>
                                    <th>Account Name</th>
                                    <th>Short Name</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>BNR Bank</td>
                                    <td>My Account Number</td>
                                    <td>My Account Name</td>
                                    <td>My Short Name</td>
                                    <td>
                                        <div className="button-group">
                                            <button className="btn btn--sm btn--primary seeDetails" data-id="2"><i className="la la-desktop"></i></button>
                                            <button className="btn btn--sm btn--base EditBeneficiary" data-resources="{&quot;id&quot;:2,&quot;user_id&quot;:1,&quot;beneficiary_type&quot;:&quot;App\\Models\\OtherBank&quot;,&quot;beneficiary_id&quot;:2,&quot;account_number&quot;:&quot;My Account Number&quot;,&quot;account_name&quot;:&quot;My Account Name&quot;,&quot;short_name&quot;:&quot;My Short Name&quot;,&quot;details&quot;:[{&quot;name&quot;:&quot;Account Name&quot;,&quot;type&quot;:&quot;text&quot;,&quot;value&quot;:&quot;My Account Name&quot;},{&quot;name&quot;:&quot;Account Number&quot;,&quot;type&quot;:&quot;text&quot;,&quot;value&quot;:&quot;My Account Number&quot;}],&quot;created_at&quot;:&quot;2021-07-28T15:55:11.000000Z&quot;,&quot;updated_at&quot;:&quot;2024-01-29T21:53:45.000000Z&quot;,&quot;beneficiary_of&quot;:{&quot;id&quot;:2,&quot;name&quot;:&quot;BNR Bank&quot;,&quot;minimum_limit&quot;:&quot;1.00000000&quot;,&quot;maximum_limit&quot;:&quot;2000.00000000&quot;,&quot;daily_maximum_limit&quot;:&quot;20000.00000000&quot;,&quot;monthly_maximum_limit&quot;:&quot;200000.00000000&quot;,&quot;daily_total_transaction&quot;:15,&quot;monthly_total_transaction&quot;:200,&quot;fixed_charge&quot;:&quot;0.00000000&quot;,&quot;percent_charge&quot;:&quot;2.00&quot;,&quot;processing_time&quot;:&quot;30 Minutes&quot;,&quot;instruction&quot;:&quot;&lt;div style=\&quot;text-align: center;\&quot;&gt;&lt;b style=\&quot;font-size: 1rem;\&quot;&gt;Please Provide The Infomation Bellow&lt;\/b&gt;&lt;\/div&gt;&quot;,&quot;status&quot;:1,&quot;form_id&quot;:12,&quot;created_at&quot;:&quot;2022-12-04T13:11:32.000000Z&quot;,&quot;updated_at&quot;:&quot;2022-12-04T13:11:32.000000Z&quot;}}"><i className="la la-pen"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Beneficiaries