import React from 'react'


export default class TutorialList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const tutorials = this.props.tutorials.map((tutorial, i)=> {
      const options = tutorial.options.map((option, j) => {
        return <li key={j}>{ option.name }</li>
      })

      return (
        <li key={i}>
          <a href={ tutorial.url }>
            { tutorial.title }
            <ul>
              { options }
            </ul>
          </a>
        </li>
      )
    })

    return (
      <div className="tutorials">
        <ul>
          { tutorials }
        </ul>
      </div>
    )
  }
}
