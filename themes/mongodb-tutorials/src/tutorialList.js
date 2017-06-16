import React from 'react'

import Tutorial from './tutorial.js'


export default class TutorialList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.tutorials.length === 0) {
      return (
        <div className="tutorials tutorials--no-results">
          <h2>Your search did not match any tutorials.</h2>

          <h3>Suggestions:</h3>

          <ul className="tutorials--no-results__suggestions">
            <li>Make sure all words are spelled correctly.</li>
            <li>Try different keywords.</li>
            <li>Try more general keywords.</li>
          </ul>
        </div>
      )
    }

    const tutorials = this.props.tutorials.map((tutorial, i) => {
      return (
        <Tutorial tutorial={ tutorial } key={ i } baseURL={ this.props.baseURL }/>
      )
    })

    return (
      <ul className="tutorials">
        { tutorials }
      </ul>
    )
  }
}
