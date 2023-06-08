import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";


const Home = () => {
    return(
        <>
            <div className="home-page">
                <SideBar />
                <div className="main-side-container">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Home;