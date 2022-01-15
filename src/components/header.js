import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons"

import "../styles/header.scss"

const Header = () => {
    return (
        <div className="header">
            <p><FontAwesomeIcon icon={faVideo} /> YouTube v2</p>
        </div>
    );
}

export default Header;