/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux'
import MasterLayout from '../../layout/MasterLayout'
import { useEffect } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'

const TwoFactor = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('2FA Security'))
    }, [])
    
    return (
        <MasterLayout>
            <div className="row justify-content-center gy-4">
                <div className="col-md-6">
                    <div className="card custom--card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Add Your Account</h5>
                            <p className="my-3 mb-3">
                                Use the QR code or setup key on your Google Authenticator app to add your account.
                            </p>
                            <div className="form-group mx-auto text-center">
                                <img className="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?data=otpauth%3A%2F%2Ftotp%2Fusername%40ViserBank%3Fsecret%3DOQ3SLEQSWLBZDJ53&amp;size= 200x200.&amp;ecc=M" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Setup Key</label>
                                <div className="input-group custom-input-group">
                                    <input className="form-control form--control referralURL" name="key" type="text" value="OQ3SLEQSWLBZDJ53" readOnly />
                                    <button className="input-group-text copytext" id="copyBoard" type="button"> <i className="fa fa-copy"></i> </button>
                                </div>
                            </div>
                            <label className="form-label"><i className="fa fa-info-circle"></i> Help</label>
                            <p>Google Authenticator is a multifactor app for mobile devices. It generates timed codes used during the 2-step verification process. To use Google Authenticator, install the Google Authenticator application on your mobile device. <a className="text--base" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="_blank">Download</a></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card custom--card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Enable 2FA Security</h5>
                            <form method="POST">
                                <input name="key" type="hidden" value="OQ3SLEQSWLBZDJ53" />
                                <div className="form-group">
                                    <label className="form-label">Google Authenticator OTP</label>
                                    <input className="form--control" name="code" type="text" />
                                </div>
                                <button className="btn btn--base w-100" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default TwoFactor