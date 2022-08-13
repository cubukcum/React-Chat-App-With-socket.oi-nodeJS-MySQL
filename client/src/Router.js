import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import ApplicationLayout from './layouts/ApplicationLayout'
import Login from './views/Login'
import ProfilUpdate from './views/ProfilUpdate'
import Main from './views/Main'
import LoginLayout from './layouts/LoginLayout'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout element={<Login />} />} />
        <Route path="/profil-update" element={<ApplicationLayout element={<><ProfilUpdate /></>} />} />
        <Route path="/chat" element={<ApplicationLayout element={<Main />} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router