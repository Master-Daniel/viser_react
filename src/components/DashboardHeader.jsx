const DashboardHeader = () => {
    return (
        <div className="dashboard-header">
            <div className="row gy-3 gy-lg-4">
                <div className="col-6 d-lg-none d-inline order-1">
                    <span className="dashboard-body__bar-icon"><i className="fas fa-bars"></i></span>
                </div>

                <div className="col-lg-9 col-7 order-lg-2 order-3">
                    <div className="dashboard-header__details order-lg-fast order-0">
                        <p className="account-no">Account No 1234567890</p>
                        <h4 className="dashboard-header__title mb-0">Page Title</h4>
                    </div>
                </div>

                <div className="col-6 col-lg-3 text-end order-lg-3 order-2">
                    <select className="select-lang rounded-2 langSel">
                        <option value="{{ $item->code }}">Select Language</option>
                    </select>
                </div>

                {/* @stack('bottom-menu') */}
            </div>
        </div>

    )
}

export default DashboardHeader