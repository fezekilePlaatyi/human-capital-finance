import React from 'react';

const Dashboard = () => {
    return(
        <>
        <div className="dashboard-inner">
            <div className="top-menu">
                <h4>Welcome back, HCF Admin</h4>
            </div>
            <div className="main-side">
            <div className="header-part">
                    <h1>Loan Applications</h1>
                    {/* <div className="right-hand"></div> */}
            </div>
            <div className="applications_stats">
                    <div className="stat-card">
                        <div className="card-header">
                            <span className="color bg-success"></span>
                            <h1>#Approved</h1>
                        </div>

                        <h4><span className="number">203</span> Approved Applications</h4>
                    </div>
                    <div className="stat-card">
                        <div className="card-header">
                            <span className="color bg-warning"></span>
                            <h1>#Pending</h1>
                        </div>

                        <h4><span className="number">33</span> Pending Applications</h4>
                    </div>
                    <div className="stat-card">
                        <div className="card-header">
                            <span className="color bg-danger"></span>
                            <h1>#Declined</h1>
                        </div>

                        <h4><span className="number">57</span> Declined Applications</h4>
                    </div>
                    <div className="stat-card incomplete">
                        <div className="card-header">
                            <span className="color bg-white"></span>
                            <h1>#Incomplete</h1>
                        </div>

                        <h4><span className="number">16</span> Incomplete Applications</h4>
                    </div>
            </div>

            <div className="pending-application">
                    <div className="sec-header">
                        <h4>Pending Applications</h4>
                        <div className="action-side">
                            <select name="filter" id="">
                                <option value=""><i className="fa bars-filter"></i> Filter</option>
                                <option value="all">All</option>
                                <option value="recent">Recent</option>
                                <option value="oldest">Oldest</option>
                            </select>
                            <div className="sorted-by">
                                Sorted by: <span>Recent added</span>
                            </div>
                        </div>
                    </div>

                    <div className="sec-main">
                        <div className="list-table">
                            <div className="list-item">
                                <div className="item-data">
                                    <h3 className="name">John Doe</h3>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Amount</span>
                                    <h4>R9800.00</h4>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Loan Period</span>
                                    <h4>6 Months</h4>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Date Applied</span>
                                    <h4>02 May 2023</h4>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Status</span>
                                    <h4 className="pending">Pending</h4>
                                </div>
                                <div className="item-data">
                                    <button className="border-btn">Full Review</button>
                                </div>
                                <div className="item-data">
                                    <button className="no-border-btn"><i className="fa fa-ellipsis-v"></i></button>
                                </div>
                            </div>
                            <div className="list-item">
                                <div className="item-data">
                                    <h3 className="name">Nkosazana Zulu Daughter</h3>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Amount</span>
                                    <h4>R9800.00</h4>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Loan Period</span>
                                    <h4>6 Months</h4>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Date Applied</span>
                                    <h4>02 May 2023</h4>
                                </div>
                                <div className="item-data">
                                    <span className="data-label">Status</span>
                                    <h4 className="pending">Pending</h4>
                                </div>
                                <div className="item-data">
                                    <button className="border-btn">Full Review</button>
                                </div>
                                <div className="item-data">
                                    <button className="no-border-btn"><i className="fa fa-ellipsis-v"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dashboard;