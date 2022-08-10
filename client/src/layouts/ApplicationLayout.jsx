import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { NavLink } from 'react-router-dom';
import Login from '../views/Login';
const ApplicationLayout = ({ element }) => {
  return (
    <div>
      <Header />
      {element}
      
      <Footer />
    </div>
  )
}

export default ApplicationLayout