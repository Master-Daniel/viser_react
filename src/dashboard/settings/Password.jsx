/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux"
import MasterLayout from "../../layout/MasterLayout"
import { setPageTitle } from "../../lib/redux/slices/global"
import { useEffect } from "react"

const Password = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Change Password'))
    }, [])
    return (
        <MasterLayout>
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <div className="card custom--card">
                        <div className="card-body">
                            <form className="register" method="post">
                                <div className="form-group">
                                    <label className="form-label">Current Password</label>
                                    <input className="form-control form--control" name="current_password" type="password" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input className="form-control form--control " name="password" type="password" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control form--control" name="password_confirmation" />
                                </div>
                                <input className="btn btn--base w-100" type="submit" value="Change Password" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Password