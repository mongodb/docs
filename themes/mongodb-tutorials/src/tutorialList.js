import React from 'react'


export default class TutorialList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const tutorials = this.props.tutorials.map((tutorial, i)=> {
      return <li key={i}><a href={ tutorial.url }>{ tutorial.title }</a></li>
    })

    return (
      <ul>
        { tutorials }
      </ul>
    )
  }
}
