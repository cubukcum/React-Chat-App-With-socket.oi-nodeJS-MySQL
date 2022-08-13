import React from 'react'
import { useNavigate } from 'react-router-dom';


const Header = () => {
const nav = useNavigate();

function handleClick(){
  localStorage.clear();
  nav('/');

}

  return (
    <div className='header-content'>
      <p className='logo-text'>MESSENGER</p>
      <button onClick={handleClick} className='logout'> Log Out</button>
    </div>
  )
}

export default Header

