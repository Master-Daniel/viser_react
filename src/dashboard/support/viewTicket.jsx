/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom'
import MasterLayout from '../../layout/MasterLayout'
import { useMutation, useQuery } from 'react-query'
import { UserApi } from '../../lib/hooks/User'
import { useEffect, useState } from 'react'
import { formatDate, notifyError, notifySuccess } from '../../util/custom-functions'
import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible } from '../../lib/redux/slices/global'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CircularProgress } from '@mui/material'

const ViewTicket = () => {

    const { id } = useParams()
    const { isModalVisible } = useSelector((state) => state.global)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [details, setDetails] = useState([])

    const { mutate, isLoading } = useMutation('reply-ticket', UserApi.replyTicket)

    const { refetch } = useQuery('view-ticket', () => UserApi.viewSupportTicket(id),
        {
            onSuccess: ({ data }) => {
                setDetails(data.data);
            },
            refetchOnWindowFocus: true,
        }
    );

    const { mutate: closeMutate, isLoading: closeIsLoading } = useMutation('close-ticket', UserApi.closeTicket)

    const closeTicket = () => {
        closeMutate({url: `/ticket/close/${details?.my_ticket?.id}`}, {
            onSuccess: ({ data }) => {
                if (data.status == 'error') {
                    data.message.error.forEach((error) => {
                        notifyError(error)
                    })
                } else {
                    data.message.success.forEach((message) => {
                        notifySuccess(message)
                    })
                    dispatch(setModalVisible(!isModalVisible))
                    refetch()
                    navigate(-1)
                }
            }
        })
    }

    const replyForm = useFormik({
        initialValues: {
            message: '',
            attachment: ''
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().required()
        }),
        onSubmit: values => {
            mutate({
                id: id,
                data: values
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
                        refetch()
                    }
                }
            })
        }
    })

    const handleCloseTicketModal = () => {
        dispatch(setModalVisible(!isModalVisible))
    }

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        console.log(details)
    }, [details])

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card custom--card">
                        <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="card-title mb-0 p-2">
                                <span className="badge badge--warning">Customer Reply</span>[Ticket#{id}] {details?.my_ticket?.subject}
                            </h6>
                            <button className="btn btn--danger btn--sm confirmationBtn" onClick={handleCloseTicketModal} type="button"><i className="la la-times-circle"></i></button>
                        </div>
                        <div className="card-body">
                            <form method="post" onSubmit={replyForm.handleSubmit} encType="multipart/form-data">
                                <div className="row justify-content-between">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea
                                                className={`form--control ${replyForm.errors.message && replyForm.touched.message ? 'border border-danger' : ''}`}
                                                onChange={replyForm.handleChange}
                                                onBlur={replyForm.handleBlur}
                                                value={replyForm.values.message}
                                                name="message" rows="4"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-md-9">
                                        <input
                                            onChange={replyForm.handleChange}
                                            onBlur={replyForm.handleBlur}
                                            value={replyForm.values.image}
                                            type="file" id='file' name="attachment" className='d-none' />
                                        <button type="button" onClick={() => document.getElementById('file').click()} className="btn btn--dark addAttachment my-2"> <i className="fas fa-plus"></i> Add Attachment </button>
                                        <p className="mb-2"><span className="text--info">Max 5 files can be uploaded | Maximum upload size is 256MB | Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx</span></p>
                                        <div className="row fileUploadsContainer">
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn--base w-100 my-2" disabled={isLoading} type="submit">
                                            {
                                                isLoading ? <CircularProgress size={20} color='inherit' /> : <>
                                                    <i className="la la-fw la-lg la-reply"></i>
                                                    Reply
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card custom--card mt-4">
                        <div className="card-body">
                            {
                                details?.messages?.length > 0 && details.messages.map((message, index) => (
                                    <div className="row border-primary my-3 mx-2 border py-3" key={index}>
                                        <div className="col-md-3 border-end text-end">
                                            <h5 className="my-3">{message.admin}</h5>
                                        </div>
                                        <div className="col-md-9">
                                            <p className="fw-bold my-3">
                                                Posted on {formatDate(message.created_at)}</p>
                                            <p>{message.message}</p>
                                            <div className="mt-2">
                                                {
                                                    message.attachments.length > 0 && message.attachments.map((attachment, index) => (
                                                        <a key={index} className="me-3" href=""><i className="fa fa-file"></i> Attachment {index + 1} </a>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div id="confirmationModal" className={`modal fade ${isModalVisible && 'show'}`} style={{ display: isModalVisible ? "block" : "none" }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation Alert!</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <form method="POST" id="confirmation-form">
                            <div className="modal-body">
                                <p className="question">Are you sure to close this ticket?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn--dark" onClick={handleCloseTicketModal} data-bs-dismiss="modal">No</button>
                                <button type="submit" disabled={closeIsLoading} className="btn btn--primary" onClick={closeTicket}>
                                    {
                                        closeIsLoading ? <CircularProgress size={20} color='inherit' /> : 'Yes'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default ViewTicket