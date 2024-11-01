/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import FDRPlans from "../../components/FDRPlans";
import MasterLayout from "../../layout/MasterLayout";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../lib/redux/slices/global";
import Tab from "./Tab";
import { UserApi } from "../../lib/hooks/User";
import { useQuery } from "react-query";

const FDRPlansPage = () => {

    const dispatch = useDispatch()
    const [plans, setPlans] = useState([])

    const { refetch } = useQuery('fdr-plans', UserApi.fdrPlans, {
        onSuccess: ({ data }) => {
            if (data.status == 'success') {
                setPlans(data.data.fdr_plans)
            }
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch()
        dispatch(setPageTitle('Fixed Deposit Receipt Plans'))
    }, [])

    return (
        <MasterLayout>
            <Tab />
            <div className="row g-4 justify-content-center">
                {plans.map((plan, index) => (
                    <FDRPlans
                        key={index}
                        id={plan.id}
                        title={plan.name}
                        percentage={plan.interest_rate}
                        returnDays={plan.locked_days}
                        duration="365"
                        minimum={plan.minimum_amount}
                        maximum={plan.maximum_amount}
                    />
                ))}
            </div>
        </MasterLayout>
    );
};

export default FDRPlansPage;
