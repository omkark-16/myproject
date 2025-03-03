import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../components/DarkModeContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const { darkMode, setDarkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const activeStyle = {
    color: darkMode ? '#ffcc00' : '#3498db',
    fontWeight: 'bold',
    borderBottom: `2px solid ${darkMode ? '#ffcc00' : '#3498db'}`,
  };

  const inactiveStyle = {
    color: darkMode ? '#bbbbbb' : 'white',
    textDecoration: 'none',
    padding: '10px',
    fontWeight: 'normal',
  };

  return (
    <>
      <header className={`header ${darkMode ? 'dark' : ''}`}>
        <div className="header-container">
          <img className="App-logo" src="logo192.png" alt="Logo" height={40} width={40} />
          <h4 className='appname'>ReactJs</h4>
          <div className='link'>
            <NavLink className='link-sub' to="/home" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>Home</NavLink>
            <NavLink className='link-sub' to="/about" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>AboutUs</NavLink>
            <NavLink className='link-sub' to="/contact" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>Contact</NavLink>
            <NavLink className='link-sub' to="/records" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>Records</NavLink>
            <NavLink className='link-sub' to="/help" style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>Help</NavLink>
          </div>

          <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          {isAuthenticated ? (
            <button className="link-sub logout-btn" onClick={handleLogout}>Logout</button> 
          ) : (
            <NavLink className='link-sub login-tab' to="/login">Login</NavLink>
          )}
        </div>
      </header>

      <div>
        <Outlet />
      </div>
    </>
  );
}
