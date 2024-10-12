/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux'
import MasterLayout from '../../layout/MasterLayout'
import { useEffect } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'

const NewTicket = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Open Ticket'))
    }, [])

    return (
        <MasterLayout>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card custom--card">
                        <div className="card-body">
                            <form method="post" encType="multipart/form-data">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Subject</label>
                                        <input type="text" name="subject" value="" className="form--control" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Priority</label>
                                        <select name="priority" className="form--control" required>
                                            <option value="3">High</option>
                                            <option value="2">Medium</option>
                                            <option value="1">Low</option>
                                        </select>
                                    </div>
                                    <div className="col-12 form-group">
                                        <label className="form-label">Message</label>
                                        <textarea name="message" id="inputMessage" rows="6" className="form--control" required></textarea>
                                    </div>
                                    <div className="col-md-9">
                                        <button type="button" className="btn btn--dark addAttachment my-2"> <i className="fas fa-plus"></i> Add Attachment </button>
                                        <p className="mb-2"><span className="text--info">Max 5 files can be uploaded | Maximum upload size is 256MB | Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx</span></p>
                                        <div className="row fileUploadsContainer"></div>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn--base w-100 my-2" type="submit"><i className="las la-paper-plane"></i> Submit</button>
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