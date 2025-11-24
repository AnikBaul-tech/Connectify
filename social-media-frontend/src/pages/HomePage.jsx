import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/header.jsx';
import StroryContainer from '../components/StroryContainer.jsx';
import Taskbar from '../components/Taskbar.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComments, faShare } from '@fortawesome/free-solid-svg-icons'
import PostMedia from '../components/PostMedia.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './HomePageStyle.css'

const HomePage = () => {
  const navigate = useNavigate();

  const postContent ={
    type: "image", 
    src: "./profile-pics/6.jpg",
    alt: "mypic",
    text: "This is just a sample text",
  }
  const postContent1 ={
    type: "video", 
    src: "./profile-pics/sample_video.mp4",
    alt: "mypic",
    text: "This is just a sample text",
  }
  const {darkMode} = useContext(DarkModeContext);
  return (
    <div className={darkMode ? `home-page dark-page` : `home-page light-page`}>
        <Header/>
        <StroryContainer/>
        <div className="post-container">
          <button onClick={()=>{
            console.log("Logged Out")
            try{
            axios.get("http://localhost:3000/api/auth/user/logout",{withCredentials: true});
            navigate("/user/login");
            }catch(err){
              console.log("Error in Logging out",err);
            }
          }}>Log Out</button>
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
              <PostMedia content={postContent} />
            </div>
            <div className="unit-post-bottom">
              <div className={darkMode?"post-caption post-action-dark":"post-caption post-action-light"}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptatibus inventore tenetur libero est odit quas maxime iusto nam, nihil minus laborum nostrum nobis facere. Error et ut corporis voluptatum?</p>
              </div>
              <div className="post-action-container">
                <a href=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="like"><FontAwesomeIcon icon={faThumbsUp} /></div></a>
                <a href=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="comment"><FontAwesomeIcon icon={faComments} /></div></a>
                <a href=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="share"><FontAwesomeIcon icon={faShare} /></div></a>
              </div>
            </div>
          </div>

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
              <PostMedia content={postContent1} />
            </div>
            <div className="unit-post-bottom">
              <div className={darkMode?"post-caption post-action-dark":"post-caption post-action-light"}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptatibus inventore tenetur libero est odit quas maxime iusto nam, nihil minus laborum nostrum nobis facere. Error et ut corporis voluptatum?</p>
              </div>
              <div className="post-action-container">
                <Link to=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="like"><FontAwesomeIcon icon={faThumbsUp} /></div></Link>
                <Link to=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="comment"><FontAwesomeIcon icon={faComments} /></div></Link>
                <Link to=""><div className={darkMode?"post-all-actions post-action-dark":"post-all-actions post-action-light"} id="share"><FontAwesomeIcon icon={faShare} /></div></Link>
              </div>
            </div>
          </div>
          
        </div>
        <Taskbar />
    </div>
    
  )
  
}

export default HomePage
        