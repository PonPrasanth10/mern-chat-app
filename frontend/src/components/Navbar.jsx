import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import { UserRound, LogOut,BookOpen } from 'lucide-react';


const Navbar = () => {
  const { logout,authUser} = useAuthStore()
  return (
    <div>
    {authUser && (
      <div className="navbar">
        <div className="navbar-title">
          <h2 className="navbar-title-h2"><Link to="/home" className='nav-link-title'>CHAT-APP</Link></h2>
        </div>
        <div className="settings">
          <Link to="/profile" className='nav-link'>
            <UserRound />Profile
          </Link>
          <p className='nav-settings'><Link to="/aboutme" className='nav-link'><BookOpen /> About Me</Link></p>
          <p onClick={logout}  className='nav-logout'><LogOut />Logout</p>
        </div>
       </div>
    )}
    {!authUser && (
      <div className="navbar">
      <div className="navbar-title">
          <h2><Link to="/" className='nav-link'>CHAT-APP</Link></h2>
        </div>
        <div className="settings">
        <p className='nav-settings'><Link to="/settings" className='nav-link'><BookOpen /> About Me</Link></p>
        </div>
       </div>
    )

    }
       
    </div>
  )
}

export default Navbar