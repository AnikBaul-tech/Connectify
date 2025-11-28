import React, { useContext, useEffect , useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
import Modal from "./Modal.jsx";
import PostMedia from "./PostMedia.jsx";
import axios from "axios";
import "./StoryContainerStyle.css";

const StroryContainer = () => {
  useEffect(() => {
    const container = document.querySelector(".story-container");
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);  // scrollling on mouse wheel movement

  const [stories,setStories] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/api/story", { withCredentials: true })
    .then((response) => {
      console.log(response.data)
      setStories( response.data.stories ?? []);
    })
  },[])
  // contentType content 
  
  const { darkMode } = useContext(DarkModeContext);  // Setting DarkMode context


  const [activeStory, setActiveStory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (story) => {
    setActiveStory(story);
    setShowModal(false); // reset
    setTimeout(() => {
      setShowModal(false); // show after delay
    }, 5000)
    .then(
      setShowModal(true)
    ) // delay in ms
  };

  return (
    <div className="story-container">
      {stories.map((story) => (
        <>
        <div className="unit-story" key={story._id}>
          <div className="story">
            <div
              className={
                darkMode
                  ? "story-thumbnail dark-mode-thumbnail"
                  : "story-thumbnail light-mode-thumbnail"
              }
              onClick={() => handleClick(story)}

            >
              <img src="./profile-pics/6.jpg" alt="" />
            </div>
          </div>
          <div id="username" className="gradient-text">
            {story.user.profile.accountName}
          </div>
        </div>

        {showModal && activeStory && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="story-fullscreen">
            <PostMedia content={activeStory.media} />
            <p>{ activeStory.media.caption}</p>
          </div>
        </Modal>
      )}
      </>
      ))}


    </div>
  );
};

export default StroryContainer;