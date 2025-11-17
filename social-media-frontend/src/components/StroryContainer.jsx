import React, { useContext, useEffect , useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
import Modal from "./Modal.jsx";
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


  const { darkMode } = useContext(DarkModeContext);  // Setting DarkMode context


  const storyList = [
    14, 3, 35, 3, 34, 32, 4, 32, 4, 34, 234, 34, 2, 342, 54, 4, 345, 57, 456,
  ];


  const [activeStory, setActiveStory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (story) => {
    setActiveStory(story);
    setShowModal(false); // reset
    setTimeout(() => {
      setShowModal(false); // show after delay
    }, 3000)
    .then(
      setShowModal(true)
    ) // delay in ms
  };


  return (
    <div className="story-container">
      {storyList.map((story) => (
        <div className="unit-story">
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
            {story}
          </div>
        </div>
      ))}


      {showModal && activeStory && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="story-fullscreen">
            <img src="./profile-pics/6.jpg" alt="full story"/>
            <p>{activeStory.description}</p>
          </div>
        </Modal>
      )}



    </div>
  );
};

export default StroryContainer;
