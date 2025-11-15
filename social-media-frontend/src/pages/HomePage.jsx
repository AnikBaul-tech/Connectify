import React, { useContext } from 'react'
import Header from '../components/header.jsx';
import StroryContainer from '../components/StroryContainer.jsx';
import Taskbar from '../components/Taskbar.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx'
import './HomePageStyle.css'

const HomePage = () => {
    const {darkMode} = useContext(DarkModeContext);
  return (
    <div className={darkMode ? `home-page dark-page` : `home-page light-page`}>
        <Header/>
        <StroryContainer/>
        <Taskbar />
    </div>
  )
}

export default HomePage