import React from "react";
import IconLogo from "../assets/img/icon-logo.png";
import { Link } from "react-router-dom";

const Navigation = () => {
    return(
        <div className="navigation-bar">
            <img src={IconLogo} alt="company logo" className="logo" />
            <div className="nav-menu">
                <Link to="/" className="active-page">Home</Link>
                <Link to="/">How to Apply</Link>
                <Link to="/">About</Link>
                <Link to="/">FAQs</Link>
                <Link to="/">Contact</Link>
            </div>
            <Link to="/" className="call-to-action">Apply Now</Link>
        </div>
    )
}

export default Navigation;