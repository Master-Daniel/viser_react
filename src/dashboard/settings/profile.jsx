/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux'
import MasterLayout from '../../layout/MasterLayout'
import { useEffect } from 'react'
import { setPageTitle } from '../../lib/redux/slices/global'

const Profile = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Profile Setting'))
    }, [])
    return (
        <MasterLayout>
            <div className="row gy-4 justify-content-center ">
                <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-5 d-none d-md-block">
                    <div className="section-bg">
                        <span className="text-center d-block profile-image-preview">
                            <img src="https://script.viserlab.com/viserbank/demo/assets/images/user/profile/65b42a526ff2f1706306130.jpg" alt="image" className="man-thumb" />
                        </span>
                        <ul className="user-info-card ">
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Account No.</p>
                                <p className="user-info-card__value fs-16 ms-auto">VB21212830406662</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Username</p>
                                <p className="user-info-card__value fs-16 ms-auto">username</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Email</p>
                                <p className="user-info-card__value fs-16 ms-auto">[Email is Protected for the demo]</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Mobile</p>
                                <p className="user-info-card__value fs-16 ms-auto">[Mobile is protected for the demo]</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Country</p>
                                <p className="user-info-card__value fs-16 ms-auto">United States</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-xxl-9 col-xl-8 col-lg-7 col-md-7 ">
                    <form className="section-bg" action="" method="post" encType="multipart/form-data">
                        <div className="row gx-4">
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form--control" name="firstname" value="John" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form--control" name="lastname" value="Doe" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">State</label>
                                    <input type="text" className="form--control" name="state" value="ssss" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form--control" name="city" value="New York" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Zip Code</label>
                                    <input type="text" className="form--control" name="zip" value="text" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Address</label>
                                    <textarea type="text" className="form--control" name="address"></textarea>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Profile Picture</label>
                                    <input type="file" className="form--control" id="imageUpload" name="image" accept=".png, .jpg, .jpeg" />
                                    For optimal results, please upload an image with a 3.5:3 aspect ratio, which will be resized to 350x300 pixels
                                </div>
                            </div>
                            <div className="col-sm-4 col-8 d-md-none d-block">
                                <div className="mb-3">
                                    <div className="text-center d-block profile-image-preview">
                                        <img src="https://script.viserlab.com/viserbank/demo/assets/images/user/profile/65b42a526ff2f1706306130.jpg" alt="image" className="man-thumb" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn--base w-100" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Profile