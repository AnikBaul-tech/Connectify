import React,{ useContext,useState } from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight,faToggleOn,faToggleOff } from '@fortawesome/free-solid-svg-icons'
import Modal from "./Modal.jsx";
import { DarkModeContext } from '../context/DarkModeContext.jsx'
import './HeaderStyle.css'
const Header = () => {
    const {darkMode,toggleDarkMode} = useContext(DarkModeContext);
        const handleClick = ()=>{
            toggleDarkMode();
        }
    const [showModal, setShowModal] = useState(false);

    const postModal = () =>{
        setShowModal(true);
    }
    return (
        <>
            <div className={darkMode ? `nav-bar dark-nav` : `nav-bar light-nav`}>
                <div className="nav-left">
                    <div id="three-dots"><FontAwesomeIcon icon={faAnglesRight} /></div>
                    <Link to='/' id="logo">
                        <img src="/logo/social-media-logo.png" alt="Social Media Logo" />
                    </Link>
                </div>
                <div className="nav-right">
                    <div id="toggle-button">
                        <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} onClick={handleClick}/>
                    </div>
                    <div id="profile-pic" onClick={()=> postModal()}>
                        <img src="./profile-pics/default.png" alt="" />
                    </div>
                </div>
            </div>

            {showModal && (
        <Modal onClose={() => setShowModal(false)} isProfile = {true}>
          <div className="story-fullscreen">
            <img src="./profile-pics/default.png" alt="" />
          </div>
        </Modal>
      )}
        </>
  )
}

export default Header;