import React from 'react'
import classNames from 'classnames'

import Menu from './menu.js'
import Submenu from './submenu.js'

class NavbarDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  toggle = (event) => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const dropDownClass = classNames({
      'navbar-dropdown': true,
      'navbar-dropdown--open': this.state.open,
    })

    const menuClass = classNames({
      'navbar-dropdown__menu': true,
      'navbar-dropdown__menu--hidden': !this.state.open,
      'navbar-dropdown__menu--shown': this.state.open,
    })

    return (
      <div className={ dropDownClass }>
        <span onClick={ this.toggle }>Documentation</span>

        <div className={ menuClass }>
          <Menu>
            <li className="menu__item">
              <a href={this.props.links.home}>Docs Home</a>
            </li>
            <li className="menu__item">
              <Submenu title="Documentation">
                <li className="submenu__item">
                  <a href={this.props.links.documentation.server}>Server</a>
                </li>
                <li className="submenu__item">
                  <Submenu title="Drivers">
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.c}>C</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.cpp11}>C++11</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.cs}>C#</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.java}>Java</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.node}>Node.js</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.perl}>Perl</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.php}>PHP</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.python}>Python</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.ruby}>Ruby</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.drivers.scala}>Scala</a>
                    </li>
                  </Submenu>
                </li>
                <li className="submenu__item submenu__item--nested">
                  <Submenu title="Cloud">
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.cloud['mongodb-atlas']}>MongoDB Atlas</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.cloud['mongodb-cloud-manager']}>MongoDB Cloud Manager</a>
                    </li>
                    <li className="submenu__item">
                      <a href={this.props.links.documentation.cloud['mongodb-ops-manager']}>MongoDB Ops Manager</a>
                    </li>
                  </Submenu>
                </li>
                <li className="submenu__item submenu__item--nested">
                  <a href={this.props.links.documentation.tools}>Tools</a>
                </li>
                <li className="submenu__item">
                  <a href={this.props.links.documentation.tutorials}>Tutorials</a>
                </li>
              </Submenu>
            </li>
            <li className="menu__item">
              <a href={this.props.links.company}>Company</a>
            </li>
            <li className="menu__item">
              <a href={this.props.links.university}>University</a>
            </li>
            <li className="menu__item">
              <a href={this.props.links.community}>Community</a>
            </li>
            <li className="menu__item">
              <a href={this.props.links['what-is-mongodb']}>What is MongoDB</a>
            </li>
            <li className="menu__item menu__item--secondary">
              <a href={this.props.links['download-mongodb']}>Download MongoDB</a>
            </li>
            <li className="menu__item menu__item--secondary">
              <a href={this.props.links['contact-us']}>Contact Us</a>
            </li>
          </Menu>
        </div>
      </div>
    )
  }
}

export default NavbarDropdown
