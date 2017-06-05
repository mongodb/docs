import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './navbar.js'

const baseURL = 'http://docs-mongodb-org-staging.s3-website-us-east-1.amazonaws.com/redesign'

class NavbarDocs extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const links = [{
      url: "manual/",
      text: "Server",
    }, {
      url: "ecosystem/drivers/",
      text: "Drivers",
    }, {
      url: "cloud/",
      text: "Cloud",
    }, {
      url: "tools/",
      text: "Tools",
    }, {
      url: "tutorials/",
      text: "Tutorials",
    }];

    return (
      <Navbar baseURL={baseURL} links={links}>
        <input type="search" className="navbar-search" placeholder="Search" />
      </Navbar>
    )
  }
}

ReactDOM.render(<NavbarDocs />, document.getElementById('navbar-landing'))
