import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './navbar.js'

const baseURL = 'http://localhost:8000'

class NavbarDocs extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Navbar baseURL={baseURL}>
        <input type="search" className="navbar-search" placeholder="Search" />
      </Navbar>
    )
  }
}

ReactDOM.render(<NavbarDocs />, document.getElementById('navbar-landing'))
