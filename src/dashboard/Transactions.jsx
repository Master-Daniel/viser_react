/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import MasterLayout from "../layout/MasterLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setPageTitle } from "../lib/redux/slices/global";
import { useQuery } from "react-query";
import { UserApi } from "../lib/hooks/User";
import { formatDate } from "../util/custom-functions";

const Transactions = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);

  const { refetch } = useQuery(
    "transaction-history",
    UserApi.transactionHistory,
    {
      onSuccess: ({ data }) => {
        if (data.status == "success") {
          setHistory(data.data.transactions);
        }
      },
    }
  );

  useEffect(() => {
    refetch();
    dispatch(setPageTitle("Transactions"));
  }, []);

  return (
    <MasterLayout>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="show-filter mb-3 text-end">
            <button
              className="btn btn--base showFilterBtn btn-sm"
              type="button"
            >
              <i className="las la-filter"></i> Filter
            </button>
          </div>
          <div className="card custom--card responsive-filter-card mb-4">
            <div className="card-body">
              <form action="">
                <div className="d-flex flex-wrap gap-4">
                  <div className="flex-grow-1">
                    <label className="form-label">Date</label>
                    <input
                      name="date"
                      type="search"
                      className="form-control bg--white pe-2 date-range form--control"
                      placeholder="Start Date - End Date"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select form--control"
                      name="trx_type"
                    >
                      <option value="">All</option>
                      <option value="+">Plus</option>
                      <option value="-">Minus</option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <label className="form-label">Remark</label>
                    <select className="form-select form--control" name="remark">
                      <option value="">Any</option>
                      <option value="" selected></option>
                      <option value="balance_add">Balance add</option>
                      <option value="balance_subtract">Balance subtract</option>
                      <option value="deposit">Deposit</option>
                      <option value="dps_installment">Dps installment</option>
                      <option value="fdr_closed">Fdr closed</option>
                      <option value="fdr_installment">Fdr installment</option>
                      <option value="fdr_open">Fdr open</option>
                      <option value="other_bank_transfer">
                        Other bank transfer
                      </option>
                      <option value="own_bank_transfer">
                        Own bank transfer
                      </option>
                      <option value="received_money">Received money</option>
                      <option value="referral_commission">
                        Referral commission
                      </option>
                      <option value="top_up">Top up</option>
                      <option value="wire_transfer">Wire transfer</option>
                      <option value="withdraw">Withdraw</option>
                    </select>
                  </div>
                  <div className="align-self-end">
                    <button className="btn btn--base w-100">
                      <i className="las la-filter"></i> Apply Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card custom--card">
            <div className="card-header d-flex justify-content-end">
              <form method="GET">
                <div className="input-group">
                  <input
                    className="form-control form--control"
                    placeholder="TRX No."
                    name="search"
                    type="text"
                  />
                  <button type="submit" className="input-group-text">
                    <i className="la la-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table--responsive--md has-search-form">
                  <thead>
                    <tr>
                      <th>TRX No.</th>
                      <th>Time</th>
                      <th>Amount</th>
                      <th>Post Balance</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.data?.length > 0 &&
                      history.data.map((item, index) => (
                        <tr key={index}>
                          <td>#{item.trx}</td>
                          <td>{formatDate(item.created_at)}</td>
                          <td>
                            <span
                              className={`badge badge--${
                                item.trx_type === "-" ? "danger" : "success"
                              }`}
                            >
                              {item?.trx_type === "+" && "+"}
                              {item?.trx_type === "-" && "-"}$
                              {Number(item.amount).toFixed(2)}
                            </span>
                          </td>
                          <td>${Number(item.post_balance).toFixed(2)}</td>
                          <td>{item.details}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">{/* Pagination */}</div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Transactions;
