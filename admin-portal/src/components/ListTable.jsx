import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";

const ListTable = () => {
    const navigate = useNavigate();

    const onViewApplicationHandler = () => {
        navigate('single_application');
    }
    return(
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
                    <button className="border-btn" onClick={() => onViewApplicationHandler()}>Full Review</button>
                </div>
                <div className="item-data">
                    <button className="no-border-btn"><MoreVertIcon /></button>
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
                    <button className="border-btn" onClick={() => onViewApplicationHandler()}>Full Review</button>
                </div>
                <div className="item-data">
                    <button className="no-border-btn"><MoreVertIcon /></button>
                </div>
            </div>
        </div>
    )
}

export default ListTable;