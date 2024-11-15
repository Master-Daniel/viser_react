/* eslint-disable react-hooks/exhaustive-deps */
import MasterLayout from '../../layout/MasterLayout'
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../lib/redux/slices/global';
import Tab from './Tab';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useMutation, useQuery } from 'react-query';
import { UserApi } from '../../lib/hooks/User';
import { notifyError, notifySuccess } from '../../util/custom-functions';
import { CircularProgress } from '@mui/material';

const BeneficiariesWithin = () => {

    const [isModalVisible, setModal] = useState(false)
    const [beneficiaries, setBeneficiaries] = useState([])
    const [banks, setBanks] = useState([])
    const dispatch = useDispatch()

    const handleClick = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    const { refetch } = useQuery('get-own-beneficiaries', UserApi.getOwnBeneficiaries, {
        onSuccess: ({ data }) => {
            setBeneficiaries(data.data)
        }
    })

    useEffect(() => {
        refetch()
        dispatch(setPageTitle('Manage Beneficiaries'))
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
                                {
                                    beneficiaries.beneficiaries.data.length > 0 && beneficiaries.beneficiaries.data.map((benefit, index) => (
                                        <tr key={index}>
                                            <td>{benefit.bank_name}</td>
                                            <td>{benefit.account_number}</td>
                                            <td>{benefit.account_name}</td>
                                            <td>{benefit.short_name}</td>
                                            <td>
                                                <div className="button-group">
                                                    <button className="btn btn--sm btn--primary seeDetails" data-id={benefit.id}><i className="la la-desktop"></i></button>
                                                    <button className="btn btn--sm btn--base EditBeneficiary"><i className="la la-pen"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default BeneficiariesWithin