import React from 'react'

import Search from './search.js'

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src="/images/mongodb-logo.svg" className="navbar-brand" alt="MongoDB Logo" />

        <div className="navbar-dropdown">
          <span>Documentation</span>
        </div>
      </div>

      <div className="navbar__middle">
        <a href="#" className="navbar-link">Server</a>
        <a href="#" className="navbar-link">Drivers</a>
        <a href="#" className="navbar-link">Cloud</a>
        <a href="#" className="navbar-link">Tools</a>
        <a href="#" className="navbar-link navbar-link--active">Tutorials</a>
      </div>

      <a href="#" className="navbar-download">Download MongoDB</a>
      <img src="/images/download-icon.svg" alt="Download Icon" />

      <div className="navbar__right">
        <Search onResults={props.onResults} />
      </div>
    </nav>
  )
}

export default Navbar
