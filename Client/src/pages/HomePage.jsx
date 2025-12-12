import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import StroryContainer from "../components/StroryContainer.jsx";
import Taskbar from "../components/Taskbar.jsx";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
import { AuthContext } from "../context/AuthModeContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComments,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import PostMedia from "../components/PostMedia.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date.format.js";
import Loader from "../components/Loader.jsx";
import "./HomePageStyle.css";


const HomePage = () => {
  const [postContent, setPostContent] = useState([]);
  const {user,loading} = useContext(AuthContext) ;
  console.log(user)


  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post", { withCredentials: true })
      .then((response) => {
        console.log(response.data.posts);

        setPostContent(response.data.posts ?? []);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const handleLike = (item) =>{
    axios.post("http://localhost:3000/api/post/like",{postId: item._id},{withCredentials:true})
    .then((response)=>{
      console.log(response.data)
      if(response.data.like){
            setPostContent((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
            console.log("Liked",item._id)
        }else{
            setPostContent((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
            console.log("Uniked",item._id)
        }
    }).catch(()=>{
      console.log("Error")
    })
  }

  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  if(!user){
    return ( <>
          <div className="empty"><span className="gradient-text">Nothing is available. Try ..</span> <Link to="/user/login" className={darkMode ? "post-action-dark" : "post-action-light"}>login</Link></div>
        </>)
  }

  if (loading){
    return(
      <Loader/>
    )
  }
  return (
    <>
    {user  && <div className={darkMode ? `home-page dark-page` : `home-page light-page`}>
      <Header profile = {user.profile} profileOnClick={true}/>
      <StroryContainer />
      <div className="post-container">
        <button
          onClick={() => {
            console.log("Logged Out");
            try {
              axios.get("http://localhost:3000/api/auth/user/logout", {
                withCredentials: true,
              });
              navigate("/user/login");
            } catch (err) {
              console.log("Error in Logging out", err);
            }
          }}
        >
          Log Out
        </button>
        
        {postContent.map((content) => (
          <div
            className={
              darkMode ? `unit-post white-border` : `unit-post black-border`
            }
            key={content._id}
          >
            <div className="posted-by-det">
              <div id="profile-pic-container">
                <img
                  src={content.user.profile.profileAvatar}
                  alt=""
                  className="profile-pic"
                />
              </div>
              <div id="acc-postdate-container">
                <div id="acc-name" className="gradient-text">
                  {content.user.profile.accountName}
                </div>
                <div id="post-date" className="gradient-text">
                  {formatDate(content.createdAt)}
                </div>
              </div>
            </div>
            <div className="post-det">
              <PostMedia content={content.media} />
            </div>
            <div className="unit-post-bottom">
              <div
                className={
                  darkMode
                    ? "post-caption post-action-dark"
                    : "post-caption post-action-light"
                }
              >
                <p>{content.media.caption}</p>
              </div>
              <div className="post-action-container">
                
                  <div
                    className={
                      darkMode
                        ? "post-all-actions post-action-dark"
                        : "post-all-actions post-action-light"
                    }
                    id="like"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} onClick={() => handleLike(content)}/>
                    {content.likeCount ?? 0}
                  </div>
               
                <Link to="">
                  <div
                    className={
                      darkMode
                        ? "post-all-actions post-action-dark"
                        : "post-all-actions post-action-light"
                    }
                    id="comment"
                  >
                    <FontAwesomeIcon icon={faComments} />
                  </div>
                </Link>
                <Link to="#">
                  <div
                    className={
                      darkMode
                        ? "post-all-actions post-action-dark"
                        : "post-all-actions post-action-light"
                    }
                    id="share"
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Taskbar />
    </div>}
    </>
  );
};

export default HomePage;
