import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand" >Home</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to ="/Create" className="nav-link active" >Create Post</Link>
          </li>
          {location.pathname !== '/Create' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/all">All Posts</Link>
                </li>
              )}
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {location.pathname !== '/Create' && (
            <li className="nav-item">
              <Link className="nav-link" to="/">LogOut</Link>
            </li>
        )}
          </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default Navbar
