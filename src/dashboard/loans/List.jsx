/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import MasterLayout from "../../layout/MasterLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../lib/redux/slices/global";
import Tab from "./Tab";
import { useQuery } from "react-query";
import { UserApi } from "../../lib/hooks/User";
import { formatDate } from "../../util/custom-functions";
import Pagination from "../../components/Pagination";

const LoanList = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  const { refetch } = useQuery("loan-list", UserApi.loanList, {
    onSuccess: ({ data }) => {
      if (data.status == "success") {
        setList(data.data.loans);
      }
    },
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    dispatch(setPageTitle("Loan List"));
    refetch();
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <MasterLayout>
      <Tab />
      <div className="card custom--card overflow-hidden">
        <div className="card-header">
          <div className="header-nav mb-0">
            <form className="d-flex flex-wrap gap-2">
              <div className="input-group w-auto flex-fill">
                <input
                  type="search"
                  name="search"
                  className="form-control bg--white"
                  placeholder="Loan No."
                />
                <button className="btn btn--base" type="submit">
                  <i className="la la-search"></i>
                </button>
              </div>
              <div className="input-group w-auto flex-fill">
                <input
                  name="date"
                  type="search"
                  className="form-control bg--white pe-2 date-range"
                  placeholder="Start Date - End Date"
                  autoComplete="off"
                />
                <button
                  className="btn btn--base input-group-text"
                  type="submit"
                >
                  <i className="la la-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table--responsive--md">
              <thead>
                <tr>
                  <th>Loan No.</th>
                  <th>Amount</th>
                  <th>Installment Amount</th>
                  <th>Total Installment</th>
                  <th>Next Installment</th>
                  {/* <th>Total Payable</th> */}
                  <th>Status</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {list.data?.length > 0 &&
                  list?.data.map((item, index) => (
                    <tr key={index}>
                      <td>#{item.loan_number}</td>
                      <td>${Number(item.amount).toFixed(2)}</td>

                      <td >
                      <div className="d-flex flex-column justify-content-between align-items-center">
                        <span className="text--primary fw-bold">
                          ${Number(item.per_installment).toFixed(2)}
                        </span>
                        <br />
                        <button
                          className="badge badge--info wire-transfer"
                          data-id="213"
                          type="button"
                        >
                          In Every {item.installment_interval} Days
                        </button>
                        </div>
                      </td>

                      <td >
                        <div className="d-flex flex-column justify-content-between align-items-center">

                        <span className="text--primary fw-bold">
                          Total: {item.total_installment}
                        </span>
                        <br />
                        <button
                          className="badge badge--info wire-transfer"
                          data-id="213"
                          type="button"
                        >
                          Given: {item.given_installment}
                        </button>
                        </div>
                      </td>
                    
                      <td>
                      {item.next_installment}
                      </td>
                      <td>
                        <span
                          className={`badge badge--${
                            item.status == 0 ? "warning" : "success"
                          }`}
                        >
                          {item.status === 0 ? "Pending" : "Approved"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">{/* <Pagination /> */}</div>
      </div>
    </MasterLayout>
  );
};

export default LoanList;
