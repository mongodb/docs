import React from 'react'
import classNames from 'classnames'

import NavbarDropdown from './navbar-dropdown.js'

const Navbar = (props) => {
  var assetsPrefix = props.assetsPrefix || '';

  const links = props.links.map(link => {
    const linkClass = classNames({
      'navbar-links__item': true,
      'navbar-links__item--active': link.active,
    });

    return <a href={ link.url } className={ linkClass }>{ link.text }</a>
  })

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <a href="/redesign/">
          <img src={ props.baseURL + assetsPrefix + '/images/mongodb-logo.svg' } className="navbar-brand" alt="MongoDB Logo" />
        </a>

        <span className="navbar-seperator"></span>

        <NavbarDropdown />
      </div>

      <div className="navbar__right">
        <div className="navbar-links">
          { links }
        </div>

        <div className="navbar-download">
          <a href="https://www.mongodb.com/download-center?jmp=tutorials" className="navbar-download__text">Download MongoDB</a>
          <img className="navbar-download__icon" src={ props.baseURL + assetsPrefix + '/images/download-icon.svg' } alt="Download Icon" />
        </div>

        { props.children }
      </div>
    </nav>
  )
}

export default Navbar
