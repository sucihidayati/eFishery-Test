import React from "react";
import './header.scss';
import logo from '../../assets/efisherylogo.png';

const Header = () => {
    return (
        <div className="header-bg">
            <div className="sb__header">
                <div className="sb__header-links">
                    <div className="sb__header-links_logo">
                        <a href="https://efishery.com/">
                            <img src={logo} alt="logo" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header;