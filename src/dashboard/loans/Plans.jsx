import LoanPlans from "../../components/LoanPlans";
import MasterLayout from "../../layout/MasterLayout";
import Tab from "./Tab";

const LoanPlansPage = () => {
    return (
        <MasterLayout>
            <Tab />
            <div className="row g-4 justify-content-center">
                {Array.from({ length: 6 }).map((_, index) => (
                    <LoanPlans
                        key={index}
                        id={index}
                        title="Advance"
                        percentage="12"
                        totalDuration="30"
                        duration="365"
                        minimum="$100.00"
                        maximum="$5,000.00"
                    />
                ))}
            </div>
        </MasterLayout>
    );
};

export default LoanPlansPage;
