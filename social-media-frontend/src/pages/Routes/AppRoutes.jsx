import React from 'react'
import { Routes, Route } from "react-router";
import HomePage from '../HomePage';
import UploadNewPost from '../UploadNewPost';
import Login from '../Login';


const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<HomePage />}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/newpost' element={<UploadNewPost/>}/>
    </Routes>
  )
}

export default AppRoutes