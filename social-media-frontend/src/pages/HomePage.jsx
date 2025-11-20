import React, { useContext } from 'react'
import Header from '../components/header.jsx';
import StroryContainer from '../components/StroryContainer.jsx';
import Taskbar from '../components/Taskbar.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComments, faShare } from '@fortawesome/free-solid-svg-icons'
import './HomePageStyle.css'

const HomePage = () => {
    const {darkMode} = useContext(DarkModeContext);
  return (
    <div className={darkMode ? `home-page dark-page` : `home-page light-page`}>
        <Header/>
        <StroryContainer/>
        <div className="post-container">

          <div className={darkMode ? `unit-post white-border` : `unit-post black-border`}>
            <div className="posted-by-det">
              <div id="profile-pic-container">
                <img src="./profile-pics/default.png" alt="" className="profile-pic" />
              </div>
              <div id="acc-postdate-container">
                <div id="acc-name" className='gradient-text'>Anik Baul</div>
                <div id="post-date" className='gradient-text'>16/10/2025</div>
              </div>
            </div>
            <div className='post-det'>
              <img src="./profile-pics/6.jpg" alt="" />
            </div>
            <div className="post-caption">
              llhbg 
            </div>
            <div className="post-action-container">
              <a href=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="like"><FontAwesomeIcon icon={faThumbsUp} /></div></a>
              <a href=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="comment"><FontAwesomeIcon icon={faComments} /></div></a>
              <a href=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="share"><FontAwesomeIcon icon={faShare} /></div></a>
            </div>
          </div>
        </div>
        <Taskbar />
    </div>
  )
}

export default HomePage
        