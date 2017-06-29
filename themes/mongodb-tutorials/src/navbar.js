import classNames from 'classnames'
import elementClass from 'element-class'
import React from 'react'
import ReactDOM from 'react-dom'

import Marian from './Marian.js'
import NavbarDropdown from './navbar-dropdown.js'


class Navbar extends React.Component {
  constructor (props) {
    let label = document.body.getAttribute('data-project-title')
    let searchProperties = document.body.getAttribute('data-search-properties')
    if (!searchProperties) {
      const projectName = document.body.getAttribute('data-project')
      const projectBranch = document.body.getAttribute('data-branch')
      searchProperties = `${projectName}-${projectBranch}`

      if (label) {
        if (projectBranch && projectBranch !== 'master') {
          label += ' ' + projectBranch
        }
      }
    }

    if (!label) {
      label = searchProperties
    }

    super(props)
    this.state = JSON.parse(props.navprops)
    this.state.marian = new Marian('https://marian.mongodb.com', searchProperties, label, document.body)
    this.state.timeout = -1
    this.state.searchText = ''

    this.state.marian.onchangequery = (newQuery) => {
      this.setState({
        searchText: newQuery
      })

      this.search()
    }
  }

  onInput = (event) => {
    this.setState({
      searchText: event.target.value
    })

  window.clearTimeout(this.state.timeout)
    this.setState({timeout:
      this.state.timeout = window.setTimeout(() => {
        this.search()
      }, 250)})
  }

  search = () => {
    window.clearTimeout(this.state.timeout)
    this.state.marian.search(this.state.searchText)
  }

  render () {
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
            <img src='https://docs.mongodb.com/images/mongodb-logo.svg' className="navbar-brand" alt="MongoDB Logo" />
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
            <svg height="11" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.8 6.8-1.2-1.2-2.1 2v-7.6h-1.7v7.6l-2.1-2-1.2 1.2 4.2 4.2z" fill="#69b241"/></svg>
          </div>

          <input type="search"
                 className="navbar-search"
                 onInput={this.onInput}
                 value={this.state.searchText}
                 placeholder="Search Documentation"
                 aria-label="Search Documentation"></input>
        </div>
      </nav>
    )
  }
}

var navbar = document.getElementById('navbar')
ReactDOM.render(<Navbar {...(navbar.dataset)} />, navbar)
