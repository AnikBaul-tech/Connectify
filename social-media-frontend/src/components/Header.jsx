import React,{ useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight,faToggleOn,faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { DarkModeContext } from '../context/DarkModeContext.jsx'
import './HeaderStyle.css'
const Header = () => {
    const {darkMode,toggleDarkMode} = useContext(DarkModeContext);
        const handleClick = ()=>{
            toggleDarkMode();
        }
    return (
        <>
            <div className={darkMode ? `nav-bar dark-nav` : `nav-bar light-nav`}>
                <div className="nav-left">
                    <div id="three-dots"><FontAwesomeIcon icon={faAnglesRight} /></div>
                    <div id="logo">
                        <img src="/logo/social-media-logo.png" alt="Social Media Logo" />
                    </div>
                </div>
                <div className="nav-right">
                    <div id="toggle-button">
                        <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} onClick={handleClick}/>
                    </div>
                    <div id="profile-pic">
                        <img src="./profile-pics/default.png" alt="" />
                    </div>
                </div>
            </div>
        </>
  )
}

export default Header;