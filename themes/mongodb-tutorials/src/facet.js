import React from 'react'
import capitalize from 'lodash.capitalize'
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
      <div className="facet">
        <h4 className="facet__title">{ capitalize(this.props.name) }</h4>
        { buttons }
      </div>
    )
  }
}
