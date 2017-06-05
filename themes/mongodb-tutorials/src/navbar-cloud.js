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
      url: "/redesign/manual/",
      text: "Server",
    }, {
      url: "/redesign/ecosystem/drivers/",
      text: "Drivers",
    }, {
      url: "/redesign/cloud/",
      text: "Cloud",
      active: true,
    }, {
      url: "/redesign/tools/",
      text: "Tools",
    }, {
      url: "/redesign/tutorials/",
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

