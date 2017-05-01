import React from 'react'


export default class Tutorial extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const options = this.props.tutorial.options.map((option, i) => {
      return <li key={i} className="tutorial-list-item__option">{ option.name }</li>
    })

    return (
      <li className="tutorial-list-item">
        <a href={ this.props.baseURL + this.props.tutorial.url } className="tutorial-list-item__link">
          <h4 className="tutorial-list-item__title">{ this.props.tutorial.title }</h4>
          <p className="tutorial-list-item__snippet">{ this.props.tutorial.snippet }</p>
          <ul>{ options }</ul>
        </a>
      </li>
    )
  }
}
