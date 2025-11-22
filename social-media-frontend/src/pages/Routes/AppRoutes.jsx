import React from 'react'
import { Routes, Route } from "react-router";
import HomePage from '../HomePage';


const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<HomePage />}/>
    </Routes>
  )
}

export default AppRoutes