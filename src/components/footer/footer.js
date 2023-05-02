import React from "react";
import './footer.scss'

const Footer = () => {
    return (
        <div className="footer">
            <div className="sb__footer section__padding">
                {/* <div className="sb__footer-links">

                </div> */}

                {/* <hr></hr> */}

                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>
                            Test eFishery @{new Date().getFullYear()} Suci Hidayati
                        </p>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default Footer;