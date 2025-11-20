import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faWifi,faImage,faComment } from '@fortawesome/free-solid-svg-icons'
import { DarkModeContext } from '../context/DarkModeContext.jsx'
import './TaskbarStyle.css'

const Taskbar = () => {
    const {darkMode} = useContext(DarkModeContext);
  return (
    <div className={darkMode?`taskbar taskbar-dark`:`taskbar taskbar-light`}>
        <div id="home" className='taskbar-elements'>
            <a href="/"><FontAwesomeIcon icon={faHouse} /></a>
        </div>
        <div id="live" className='taskbar-elements'>
            <FontAwesomeIcon icon={faWifi} />
        </div>
        <div id="posts" className='taskbar-elements'>
            <FontAwesomeIcon icon={faImage} />
        </div>
        <div id="chats" className='taskbar-elements'>
            <FontAwesomeIcon icon={faComment} />
        </div>
    </div>
  )
}

export default Taskbar