/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux"
import MasterLayout from "../../layout/MasterLayout"
import { useEffect } from "react"
import { setPageTitle } from "../../lib/redux/slices/global"
import Tab from "./Tab"

const Details = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('FDR Details'))
    }, [])

    return (
        <MasterLayout>
            <Tab />
            <div className="row gy-4">
                <div className="col-lg-12 col-xl-4">
                    <div className="card custom--card">
                        <div className="card-body">
                            <ul>
                                <li className="pricing-card__list flex-between">
                                    <span>FDR Number</span>
                                    <span className="fw-bold">JHQJA3PQP3CF</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Plan</span>
                                    <span className="fw-bold">Starter</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Deposited</span>
                                    <span className="fw-bold">$40.00</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Interest Rate</span>
                                    <span className="fw-bold">5%</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Per Installment</span>
                                    <span className="fw-bold text--base">$2.00</span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Received Installment</span>
                                    <span className="fw-bold">15 </span>
                                </li>
                                <li className="pricing-card__list flex-between">
                                    <span>Profit Received</span>
                                    <span className="fw-bold">$30.00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 col-xl-8">
                    <div className="card custom--card overflow-hidden">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table--responsive--md">
                                    <thead>
                                        <tr>
                                            <th>S.N.</th>
                                            <th>Installment Date</th>
                                            <th>Given On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>4</td>
                                            <td className="">
                                                14 Aug, 2023
                                            </td>
                                            <td>
                                                14 Aug, 2023
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Details