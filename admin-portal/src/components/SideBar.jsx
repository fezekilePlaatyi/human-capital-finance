import React from "react";
import IconLogo from "../assets/img/icon-logo.png"

const SideBar = () => {
    return(
        <>
            <div className="side-bar">
                <div className="top-part">
                    <img src={IconLogo} alt="HCF Icon Logo" />
                    <div className="main-menu">
                        <a href="./dashboard.html" className="active-btn"><i className="fa fa-home"></i></a>
                        <a href="./full-applications.html" className=""><i className="fa fa-list"></i></a>
                        <a href="/" className=""><i className="fa fa-hourglass-o"></i></a>
                        <a href="/" className=""><i className="fa fa-money"></i></a>
                        {/* <button className=""><i className="fa fa-sign-out"></i></button> */}
                    </div>
                </div>
                <div className="bottom-menu">
                    <button className=""><i className="fa fa-cog"></i></button>
                    <a href="./login.html" className="sign-out"><i className="fa fa-sign-out"></i></a>
                </div>
            </div>
        </>
    )
}

export default SideBar;