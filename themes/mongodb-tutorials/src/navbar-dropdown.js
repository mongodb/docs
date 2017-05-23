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
              <Submenu title="Documentation">
                <li className="submenu__item">
                  Server
                </li>
                <li className="submenu__item">
                  <Submenu title="Drivers">
                    <li className="submenu__item">C</li>
                    <li className="submenu__item">C++11</li>
                    <li className="submenu__item">C#</li>
                    <li className="submenu__item">Java</li>
                    <li className="submenu__item">Node.js</li>
                    <li className="submenu__item">Perl</li>
                    <li className="submenu__item">PHP</li>
                    <li className="submenu__item">Python</li>
                    <li className="submenu__item">Motor</li>
                    <li className="submenu__item">Ruby</li>
                    <li className="submenu__item">Scala</li>
                  </Submenu>
                </li>
                <li className="submenu__item submenu__item--nested">
                  <Submenu title="Cloud">
                    <li className="submenu__item">MongoDB Atlas</li>
                    <li className="submenu__item">MongoDB Cloud Manager</li>
                    <li className="submenu__item">MongoDB Ops Manager</li>
                  </Submenu>
                </li>
                <li className="submenu__item submenu__item--nested">
                  Tools
                </li>
                <li className="submenu__item">
                  Tutorials
                </li>
              </Submenu>
            </li>
            <li className="menu__item">Company</li>
            <li className="menu__item">University</li>
            <li className="menu__item">Community</li>
            <li className="menu__item">What is MongoDB</li>
            <li className="menu__item menu__item--secondary">Download MongoDB</li>
            <li className="menu__item menu__item--secondary">Contact Us</li>
          </Menu>
        </div>
      </div>
    )
  }
}

export default NavbarDropdown
