import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";


const Home = () => {
    return(
        <>
            <div className="home-page">
                <SideBar />
                <div className="hcf-inner">
                    <div className="top-menu">
                        <h4>Welcome back, HCF Admin</h4>
                    </div>
                    <div className="main-side">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;