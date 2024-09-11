import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
    <div className="box">
      <h1>Welcome to the Home Page</h1>
    </div>
    <div className="button-container">
      <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/Create" className="btn btn-secondary">Sign Up</Link>
    </div>
  </div>
   
  
  )
}

export default Home
