/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import MasterLayout from '../../layout/MasterLayout'
import { useEffect } from 'react'
import { setPageTitle, setProfile } from '../../lib/redux/slices/global'
import { useMutation, useQuery } from 'react-query'
import { UserApi } from '../../lib/hooks/User'
import { notifyError, notifySuccess } from '../../util/custom-functions'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { CircularProgress } from "@mui/material";
import Pfp from "../../assets/profile.png"

const Profile = () => {
    const dispatch = useDispatch()
    const { profile } = useSelector((state) => state.global)

    useEffect(() => {
        console.log(profile)
    }, [profile])

    const { refetch } = useQuery('user-profile', UserApi.getUserProfile, {
        onSuccess: ({ data }) => {
            if (data.status == 'error') {
                data.message.error.forEach((error) => {
                    notifyError(error)
                })
            } else {
                console.log(data.data.user)
                dispatch(setProfile(data.data.user));
            }
        },
        refetchOnWindowFocus: false,
    });

    const { mutate, isLoading } = useMutation("profile-settings", UserApi.profileSetting);

    const FILE_SIZE = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

    const profileForm = useFormik({
        initialValues: {
            firstname: profile?.firstname ?? '',
            lastname: profile?.lastname ?? '',
            city: profile?.address.city ?? '',
            image: '',
            state: profile?.address.state ?? '',
            address: profile?.address.address ?? '',
            zip: profile?.address.zip ?? '',
        },
        validationSchema: Yup.object().shape({
            firstname: Yup.string().required('First name is required'),
            lastname: Yup.string().required('Last name is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            address: Yup.string().required('Address is required'),
            zip: Yup.string().required('Zip Code is required'),
            image: Yup.mixed()
                .required('An image is required')
                .test('fileSize', 'File size is too large', (value) => {
                    return value && value.size <= FILE_SIZE;
                })
                .test('fileType', 'Unsupported file format', (value) => {
                    return value && SUPPORTED_FORMATS.includes(value.type);
                }),
        }),
        onSubmit: values => {
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
                },
            })
        }
    })

    useEffect(() => {
        dispatch(setPageTitle('Profile Setting'))
        refetch()
    }, [])

    return (
        <MasterLayout>
            <div className="row gy-4 justify-content-center ">
                <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-5 d-none d-md-block">
                    <div className="section-bg">
                        <span className="text-center d-block profile-image-preview">
                            <img src={`${import.meta.env.VITE_BASE_URL}/assets/images/user/profile/${profile.image}`} alt="image" className="man-thumb" />
                        </span>
                        <ul className="user-info-card ">
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Account No.</p>
                                <p className="user-info-card__value fs-16 ms-auto">{profile.account_number}</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Username</p>
                                <p className="user-info-card__value fs-16 ms-auto">{profile.username}</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Email</p>
                                <p className="user-info-card__value fs-16 ms-auto">{profile.email}</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Mobile</p>
                                <p className="user-info-card__value fs-16 ms-auto">{profile.mobile}</p>
                            </li>
                            <li className="user-info-card__list flex-align">
                                <p className="user-info-card__name">Country</p>
                                <p className="user-info-card__value fs-16 ms-auto">{profile.address.country}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-xxl-9 col-xl-8 col-lg-7 col-md-7 ">
                    <form className="section-bg" method="post" encType="multipart/form-data" onSubmit={profileForm.handleSubmit}>
                        <div className="row gx-4">
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input
                                        onChange={profileForm.handleChange}
                                        onBlur={profileForm.handleBlur}
                                        value={profileForm.values.firstname}
                                        type="text"
                                        className={`form--control ${profileForm.errors.firstname && profileForm.touched.firstname ? 'border border-danger' : ''}`}
                                        name="firstname" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        onChange={profileForm.handleChange}
                                        onBlur={profileForm.handleBlur}
                                        value={profileForm.values.lastname}
                                        type="text"
                                        className={`form--control ${profileForm.errors.lastname && profileForm.touched.lastname ? 'border border-danger' : ''}`}
                                        name="lastname" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">State</label>
                                    <input
                                        onChange={profileForm.handleChange}
                                        onBlur={profileForm.handleBlur}
                                        value={profileForm.values.state}
                                        type="text"
                                        className={`form--control ${profileForm.errors.state && profileForm.touched.state ? 'border border-danger' : ''}`}
                                        name="state" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-6 col-xsm-6">
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input
                                        onChange={profileForm.handleChange}
                                        onBlur={profileForm.handleBlur}
                                        value={profileForm.values.city}
                                        type="text"
                                        className={`form--control ${profileForm.errors.city && profileForm.touched.city ? 'border border-danger' : ''}`}
                                        name="city" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Zip Code</label>
                                    <input
                                        onChange={profileForm.handleChange}
                                        onBlur={profileForm.handleBlur}
                                        value={profileForm.values.zip}
                                        type="text"
                                        className={`form--control ${profileForm.errors.zip && profileForm.touched.zip ? 'border border-danger' : ''}`}
                                        name="zip" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        onChange={profileForm.handleChange}
                                        onBlur={profileForm.handleBlur}
                                        value={profileForm.values.address}
                                        type="text"
                                        className={`form--control ${profileForm.errors.address && profileForm.touched.address ? 'border border-danger' : ''}`}
                                        name="address"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Profile Picture</label>
                                    <input
                                        onChange={(event) => {
                                            profileForm.setFieldValue('image', event.currentTarget.files[0]);
                                        }}
                                        onBlur={profileForm.handleBlur}
                                        type="file"
                                        className={`form--control ${profileForm.errors.image && profileForm.touched.image ? 'border border-danger' : ''}`}
                                        id="imageUpload"
                                        name="image"
                                        accept=".png, .jpg, .jpeg" />
                                    For optimal results, please upload an image with a 3.5:3 aspect ratio, which will be resized to 350x300 pixels
                                </div>
                            </div>
                            {/* <div className="col-sm-4 col-8 d-md-none d-block">
                                <div className="mb-3">
                                    <div className="text-center d-block profile-image-preview">
                                        <img src="https://script.viserlab.com/viserbank/demo/assets/images/user/profile/65b42a526ff2f1706306130.jpg" alt="image" className="man-thumb" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-12">
                                <button className="btn btn--base w-100" disabled={isLoading} type="submit">
                                    {
                                        isLoading ? <CircularProgress size={20} color='inherit' /> : 'Submit'
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Profile