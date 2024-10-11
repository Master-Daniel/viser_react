import MasterLayout from "../../layout/MasterLayout"
import Tab from "./Tab"

const Details = () => {
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
                                            <td>1</td>
                                            <td className="">
                                                16 May, 2023
                                            </td>
                                            <td>
                                                16 May, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td className="">
                                                15 Jun, 2023
                                            </td>
                                            <td>
                                                15 Jun, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td className="">
                                                15 Jul, 2023
                                            </td>
                                            <td>
                                                15 Jul, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td className="">
                                                14 Aug, 2023
                                            </td>
                                            <td>
                                                14 Aug, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td className="">
                                                13 Sep, 2023
                                            </td>
                                            <td>
                                                13 Sep, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td className="">
                                                13 Oct, 2023
                                            </td>
                                            <td>
                                                13 Oct, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td className="">
                                                12 Nov, 2023
                                            </td>
                                            <td>
                                                15 Nov, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td className="">
                                                12 Dec, 2023
                                            </td>
                                            <td>
                                                12 Dec, 2023
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td className="">
                                                11 Jan, 2024
                                            </td>
                                            <td>
                                                24 Mar, 2024
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>10</td>
                                            <td className="">
                                                10 Feb, 2024
                                            </td>
                                            <td>
                                                24 Mar, 2024
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>11</td>
                                            <td className="">
                                                11 Mar, 2024
                                            </td>
                                            <td>
                                                24 Mar, 2024
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>12</td>
                                            <td className="">
                                                10 Apr, 2024
                                            </td>
                                            <td>
                                                10 Apr, 2024
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>13</td>
                                            <td className="">
                                                10 May, 2024
                                            </td>
                                            <td>
                                                10 May, 2024
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>14</td>
                                            <td className="">
                                                09 Jun, 2024
                                            </td>
                                            <td>
                                                09 Jun, 2024
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>15</td>
                                            <td className="">
                                                09 Jul, 2024
                                            </td>
                                            <td>
                                                09 Jul, 2024
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