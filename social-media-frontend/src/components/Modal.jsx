import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./ModalStyle.css";

const Modal = ({ children, onClose, isProfile = false }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      {isProfile && (
        <div className="profile-buttons">
          <div className="button-name-container">
            <Link to="/user/newpost">
              <div className="new-button" id="newStory">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </Link>
            <div className="button_name ">Upload your thoughts</div>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
