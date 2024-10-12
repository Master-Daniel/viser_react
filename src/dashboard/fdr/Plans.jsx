/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import FDRPlans from "../../components/FDRPlans";
import MasterLayout from "../../layout/MasterLayout";
import { useEffect } from "react";
import { setPageTitle } from "../../lib/redux/slices/global";
import Tab from "./Tab";

const FDRPlansPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Fixed Deposit Receipt Plans'))
    }, [])

    return (
        <MasterLayout>
            <Tab />
            <div className="row g-4 justify-content-center">
                {Array.from({ length: 6 }).map((_, index) => (
                    <FDRPlans
                        key={index}
                        id={index}
                        title="Advance"
                        percentage="12"
                        returnDays="30"
                        duration="365"
                        minimum="$100.00"
                        maximum="$5,000.00"
                    />
                ))}
            </div>
        </MasterLayout>
    );
};

export default FDRPlansPage;
