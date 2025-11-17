import React, { useContext, useEffect } from "react";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
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
  }, []);
  const { darkMode } = useContext(DarkModeContext);
  const val = [
    14, 3, 35, 3, 34, 32, 4, 32, 4, 34, 234, 34, 2, 342, 54, 4, 345, 57, 456,
  ];
  return (
    <div className="story-container">
      <div className="unit-story">
        <div className="story">
          <div
            className={
              darkMode
                ? "profile-pic dark-mode-profile"
                : "profile-pic light-mode-profile"
            }
          >
            <img src="./profile-pics/6.jpg" alt="" />
          </div>
        </div>
        <div id="username" className="gradient-text">
          Anik Baul
        </div>
      </div>
      {val.map((val) => (
        <div className="unit-story">
          <div className="story">
            <div
              className={
                darkMode
                  ? "profile-pic dark-mode-profile"
                  : "profile-pic light-mode-profile"
              }
            >
              <img src="./profile-pics/default.png" alt="" />
            </div>
          </div>
          <div id="username" className="gradient-text">
            {val}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StroryContainer;
