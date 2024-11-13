/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import MasterLayout from "../../layout/MasterLayout"
import { setPageTitle } from "../../lib/redux/slices/global"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Confirm = () => {

    const dispatch = useDispatch()
    const { depositMethods, depositDetails } = useSelector((state) => state.global)

    useEffect(() => {
        dispatch(setPageTitle('Payment Confirm'))
    }, [])
    
    return (
        <>
            <MasterLayout>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card custom--card">
                            <div className="card-header">
                                <h5 className="card-title text-center">Deposit via {depositMethods.find((method) => method.currency == depositDetails.method_currency).name}</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush text-center">
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        Wallet Address :
                                        <strong>{depositDetails.address}</strong>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        Amount :
                                        <strong>${Number(depositDetails.amount).toFixed(2)}</strong>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        Rate :
                                        <strong>${Number(depositDetails.rate).toFixed(2)}</strong>
                                    </li>
                                </ul>
                                <Link to="/dashboard/deposit/history" className="btn btn--danger w-100 mt-3" id="btn-confirm">Exit</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    )
}

export default Confirm