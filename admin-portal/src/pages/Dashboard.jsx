import React from 'react';
import ListTable from '../components/ListTable';

const Dashboard = () => {
    return(
        <>
        <div id="dashboard">
            <div className="header-part">
                    <h1>Dashboard</h1>
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
                    <ListTable />
                </div>
            </div>
        </div>
    </>
    )
}

export default Dashboard;