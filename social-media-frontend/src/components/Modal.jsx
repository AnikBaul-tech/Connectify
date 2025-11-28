import React from 'react'
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoFilm,faPlus } from '@fortawesome/free-solid-svg-icons'
import './ModalStyle.css'

const Modal = ({ children, onClose , isProfile=false }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
      {isProfile && <div className="profile-buttons">
          <div className="button-name-container"><div className="new-button" id='newPost'><FontAwesomeIcon icon={faPhotoFilm} /></div><div className="button_name">New Post</div></div>
          <div className="button-name-container"><div className="new-button" id='newStory'><FontAwesomeIcon icon={faPlus} /></div><div className="button_name">New Story</div></div>
        </div>}
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal