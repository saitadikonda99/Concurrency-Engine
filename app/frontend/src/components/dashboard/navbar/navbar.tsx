"use client"
import React from 'react'
import axios from 'axios'

import './navbar.css'

const navbar = () => {

  const handleLogout = async () => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          withCredentials: true,
        });
        console.log('Logout successful');
    } catch (error) {
        console.error('Error during logout:', error);
    } 
    }


  return (
      <div className="DNavbarComponent">
        <div className="DNavbarComponent-in">
          <div className="dNavbar-one">
            <h1>Concurrency Engine</h1>
          </div>
          <div className="dNavbar-two">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
  )
}

export default navbar