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
                  <a href="https://docs.mongodb.com/manual/">Server</a>
                </li>
                <li className="submenu__item">
                  <Submenu title="Drivers">
                    <li className="submenu__item">
                      <a href="http://mongoc.org/libmongoc/current/">C</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://mongodb.github.io/mongo-cxx-driver/">C++11</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://docs.mongodb.com/ecosystem/drivers/csharp/">C#</a>
                    </li>
                    <li className="submenu__item">
                      <a href="http://mongodb.github.io/mongo-java-driver/">Java</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://mongodb.github.io/node-mongodb-native/">Node.js</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://docs.mongodb.com/ecosystem/drivers/perl/">Perl</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://docs.mongodb.com/ecosystem/drivers/php/">PHP</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://docs.mongodb.com/ecosystem/drivers/python/">Python</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://docs.mongodb.com/ruby-driver/master/">Ruby</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://docs.mongodb.com/ecosystem/drivers/scala/">Scala</a>
                    </li>
                  </Submenu>
                </li>
                <li className="submenu__item submenu__item--nested">
                  <Submenu title="Cloud">
                    <li className="submenu__item">
                      <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://www.mongodb.com/cloud/cloud-manager">MongoDB Cloud Manager</a>
                    </li>
                    <li className="submenu__item">
                      <a href="https://www.mongodb.com/products/ops-manager">MongoDB Ops Manager</a>
                    </li>
                  </Submenu>
                </li>
                <li className="submenu__item submenu__item--nested">
                  <a href="/tools">Tools</a>
                </li>
                <li className="submenu__item">
                  <a href="/tutorials">Tutorials</a>
                </li>
              </Submenu>
            </li>
            <li className="menu__item">
              <a href="https://www.mongodb.com/">Company</a>
            </li>
            <li className="menu__item">
              <a href="https://university.mongodb.com/">University</a>
            </li>
            <li className="menu__item">
              <a href="https://www.mongodb.com/community">Community</a>
            </li>
            <li className="menu__item">
              <a href="https://www.mongodb.com/what-is-mongodb">What is MongoDB</a>
            </li>
            <li className="menu__item menu__item--secondary">
              <a href="https://www.mongodb.com/download-center?jmp=docs">Download MongoDB</a>
            </li>
            <li className="menu__item menu__item--secondary">
              <a href="#">Contact Us</a>
            </li>
          </Menu>
        </div>
      </div>
    )
  }
}

export default NavbarDropdown
