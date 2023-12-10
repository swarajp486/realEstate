import React, { useState,useContext } from 'react'
import logo from "../../asset/logo.jpeg"
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import "./Navbar.css"
import { AuthContext } from '../../contextapi';
function Navbar() {
  const [isMobile, setIsMobile] = useState(false)
  const { token, updateToken } = useContext(AuthContext);
  return (
    <nav className='navbar'>
      <div className='left'>
        <img src={logo} className='logo' />
      </div>

      <div className='right'>
        <ul className={isMobile ? "nav-links-mobile" : 'nav-links'}
          onClick={() => setIsMobile(false)}>
          <Link to="/" className='home'><li>Home</li></Link>

          {token ? <Link to="/" className='logout' onClick={()=>updateToken(null)}><li>LogOut</li></Link>:
            <>
              <Link to="/login" className='login'><li>LogIn</li></Link>
              <Link to="/signup" className='signup'><li>SignUp</li></Link>
            </>}

        </ul>

        <button className='mobile-menu-icon'
          onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <IoClose /> : <IoMenu />}
        </button>
      </div>


    </nav>
  )
}

export default Navbar