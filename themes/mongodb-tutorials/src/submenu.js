import React from 'react'
import classNames from 'classnames'

class Submenu extends React.Component {
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
    const titleClass = classNames({
      'submenu__title': true,
      'submenu__title--open': this.state.open,
    })

    const submenuClass = classNames({
      'submenu': true,
      'submenu--hidden': !this.state.open,
      'submenu--shown': this.state.open,
    })

    return (
      <div>
        <span className={ titleClass } onClick={ this.toggle }>
          { this.props.title }
        </span>
        <ul className={ submenuClass }>{ this.props.children }</ul>
      </div>
    )
  }
}

export default Submenu
