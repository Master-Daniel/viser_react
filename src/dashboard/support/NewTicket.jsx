/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux'
import MasterLayout from '../../layout/MasterLayout'
import { useEffect } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'
import { useMutation } from 'react-query'
import { UserApi } from '../../lib/hooks/User'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { notifyError, notifySuccess } from '../../util/custom-functions'
import { CircularProgress } from '@mui/material'

const NewTicket = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Open Ticket'))
    }, [])

    const { mutate, isLoading } = useMutation('create-ticket', UserApi.createTicket)

    const ticketForm = useFormik({
        initialValues: {
            subject: '',
            priority: '',
            message: '',
            attachments: '',
            image: ''
        },
        validationSchema: Yup.object().shape({
            subject: Yup.string().required(),
            priority: Yup.string().required(),
            message: Yup.string().required(),
        }),
        onSubmit: values => {
            console.log(values)
            mutate(values, {
                onSuccess: ({ data }) => {
                    if (data.status == 'error') {
                        data.message.error.forEach((error) => {
                            notifyError(error)
                        })
                    } else {
                        data.message.success.forEach((message) => {
                            notifySuccess(message)
                        })
                    }
                }
            })
        }
    })

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card custom--card">
                        <div className="card-body">
                            <form method="post" onSubmit={ticketForm.handleSubmit} encType="multipart/form-data">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Subject</label>
                                        <input
                                            onChange={ticketForm.handleChange}
                                            onBlur={ticketForm.handleBlur}
                                            value={ticketForm.values.subject}
                                            type="text"
                                            name="subject"
                                            className={`form--control ${ticketForm.errors.subject && ticketForm.touched.subject ? 'border border-danger' : ''}`} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Priority</label>
                                        <select
                                            onChange={ticketForm.handleChange}
                                            onBlur={ticketForm.handleBlur}
                                            value={ticketForm.values.priority}
                                            name="priority"
                                            className={`form--control ${ticketForm.errors.priority && ticketForm.touched.priority ? 'border border-danger' : ''}`}
                                        >
                                            <option disabled={true} value="">--Select Priority--</option>
                                            <option value="3">High</option>
                                            <option value="2">Medium</option>
                                            <option value="1">Low</option>
                                        </select>
                                    </div>
                                    <div className="col-12 form-group">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            onChange={ticketForm.handleChange}
                                            onBlur={ticketForm.handleBlur}
                                            value={ticketForm.values.message}
                                            name="message"
                                            id="inputMessage"
                                            rows="6"
                                            className={`form--control ${ticketForm.errors.message && ticketForm.touched.message ? 'border border-danger' : ''}`}
                                        ></textarea>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn--base w-100 my-2" type="submit" disabled={isLoading}>
                                            {isLoading ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : (
                                                <>
                                                    <i className="las la-paper-plane"></i> Submit
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default NewTicket