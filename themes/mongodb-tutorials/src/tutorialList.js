import React from 'react'

import Tutorial from './tutorial.js'


export default class TutorialList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const tutorials = this.props.tutorials.map((tutorial, i) => {
      return (
        <Tutorial tutorial={ tutorial } key={ i } />
      )
    })

    return (
      <ul className="tutorials">
        { tutorials }
      </ul>
    )
  }
}
