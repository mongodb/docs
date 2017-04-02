import React from 'react'
import classNames from 'classnames'


export default class Facet extends React.Component {
  constructor (props) {
    super(props)
    this.genButton = this.genButton.bind(this)
  }

  genButton (option, index) {
    const buttonClass = classNames({
      'button': true,
      'button--active': option.active,
    })

    return (
      <button key={index} className={buttonClass} onClick={this.props.updateFacet} >
        { option.name }
      </button>
    )
  }

  render () {
    const buttons = this.props.options.map(this.genButton)

    return (
      <div>
        <h2>{ this.props.name }</h2>
        { buttons }
      </div>
    )
  }
}
