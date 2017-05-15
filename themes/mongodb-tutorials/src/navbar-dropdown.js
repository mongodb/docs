import React from 'react'
import classNames from 'classnames'

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
      'navbar-dropdown__menu--open': this.state.open,
    })

    return (
      <div className={ dropDownClass }>
        <span onClick={ this.toggle }>Documentation</span>

        <ul className={ menuClass }>
          <li className="navbar-dropdown__menu__item navbar-dropdown__menu__item--menu">Documentation</li>
          <li className="navbar-dropdown__menu__item navbar-dropdown__menu__item--menu">Company</li>
          <li className="navbar-dropdown__menu__item navbar-dropdown__menu__item--menu">University</li>
          <li className="navbar-dropdown__menu__item">Community</li>
          <li className="navbar-dropdown__menu__item">What is MongoDB</li>
          <li className="navbar-dropdown__menu__item navbar-dropdown__menu__item--secondary">Download MongoDB</li>
          <li className="navbar-dropdown__menu__item navbar-dropdown__menu__item--secondary">Contact Us</li>
        </ul>
      </div>
    )
  }
}

export default NavbarDropdown
