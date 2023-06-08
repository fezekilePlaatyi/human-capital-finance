import React from "react";
import IconLogo from "../assets/img/icon-logo.png"

const Login = () => {
    return (
        <>
            <div id="login_page">
                <div class="login_inner">
                    <form action="#" method="post">
                        <div className="logo">
                            <img src={IconLogo} alt="This is a company logo" />
                        </div>
                        <h3 className="login-title">Sign in</h3>
                        <input type="email" name="email" id="email" placeholder="Email" aria-placeholder="Email"/>
                        <input type="password" name="password" id="password" placeholder="Password" aria-placeholder="Password"/>
                        <button className="main-btn">Sign in</button>
                        <button className="no-border-btn">Forgot your Password?</button>
                    </form>
                </div>

                <div class="main-footer">
                    <p>&copy; Human Capital Finance. All Rights Reserved. Designed by <a href="http://www.myplusplus.com" target="_blank" rel="noopener noreferrer">mY++ Inc</a></p>
                </div>
            </div>
        </>
    );
}

export default Login;