import classNames from 'classnames'
import elementClass from 'element-class'
import React from 'react'
import ReactDOM from 'react-dom'

import NavbarDropdown from './navbar-dropdown.js'


class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = JSON.parse(props.navprops)
  }

  componentDidMount () {
    var cx = '017213726194841070573:WMX6838984';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    gcse.onload = gcse.onreadystatechange = function() {
      // hack to set a placeholder in google's custom search input
      var pollInput = window.setInterval(function() {
        var input = document.querySelector('.gsc-input input.gsc-input')

        if (input) {
          input.style = ''
          input.className = 'navbar-search'
          document.querySelector('.navbar__right').appendChild(input)
          input.setAttribute('placeholder', "Search Documentation")
          elementClass(input).add('navbar-search')
          window.clearInterval(pollInput);
        }
      }, 10);
    };

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

  render () {
    const baseURL = window.location.origin
    const assetsPrefix = this.state.assetsPrefix || '';

    const linkElements = this.state.links.map((link, i) => {
      const linkClass = classNames({
        'navbar-links__item': true,
        'navbar-links__item--active': link.active,
      });

      return <a href={ link.url } key={i} className={ linkClass }>{ link.text }</a>
    })

    return (
      <nav className="navbar">
        <div className="navbar__left">
          <a href="https://www.mongodb.com/">
            <img src={ baseURL + assetsPrefix + '/images/mongodb-logo.svg' } className="navbar-brand" alt="MongoDB Logo" />
          </a>

          <span className="navbar-seperator"></span>

          <NavbarDropdown links={this.state.dropdown} />
        </div>

        <div className="navbar__right">
          <div className="navbar-links">
            { linkElements }
          </div>

          <div className="navbar-download">
            <a href="https://www.mongodb.com/download-center?jmp=tutorials" className="navbar-download__text">Download MongoDB</a>
            <img className="navbar-download__icon" src={ baseURL + assetsPrefix + '/images/download-icon.svg' } alt="Download Icon" />
          </div>

          <div id="gsearch" className="gcse-searchbox-only" data-resultsUrl="http://docs.mongodb.com/manual/search/" data-queryParameterName="query"></div>
        </div>
      </nav>
    )
  }
}

var navbar = document.getElementById('navbar')
ReactDOM.render(<Navbar {...(navbar.dataset)} />, navbar)
