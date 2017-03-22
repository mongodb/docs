import React from 'react'


export default class Facet extends React.Component {
  constructor (props) {
    super(props)
    this.genButton = this.genButton.bind(this)
  }

  genButton (option, index) {
    let style = {
      backgroundColor: 'transparent'
    }

    if (option.active) {
      style.backgroundColor = 'red'
    }

    return (
      <button key={index} style={style} onClick={this.props.updateFacet} >
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
