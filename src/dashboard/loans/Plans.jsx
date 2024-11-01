/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LoanPlans from "../../components/LoanPlans";
import MasterLayout from "../../layout/MasterLayout";
import Tab from "./Tab";
import { useQuery } from "react-query";
import { UserApi } from "../../lib/hooks/User";

const LoanPlansPage = () => {
    const [plans, setPlans] = useState({ data: [] });

    const { refetch } = useQuery('loan-plans', UserApi.loanPlans, {
        onSuccess: ({ data }) => {
            if (data.status === 'success') {
                setPlans(data.data.loan_plans);
            }
        },
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <MasterLayout>
            <Tab />
            <div className="row g-4 justify-content-center">
                {plans.data && plans.data.map((plan, index) => (
                    <LoanPlans
                        key={index}
                        id={plan.id}
                        title={plan.name}
                        percentage="12"
                        totalDuration="30"
                        duration="365"
                        minimum={plan.minimum_amount}
                        maximum={plan.maximum_amount}
                    />
                ))}
            </div>
        </MasterLayout>
    );
};

export default LoanPlansPage;
