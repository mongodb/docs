import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './navbar.js'

class Single extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null,
      sections: this._getSections(),
    }
  }

  _getSections () {
    const sectionElements = document.querySelectorAll('.single h2')
    let sections = []

    sectionElements.forEach((el) => {
      sections.push({
        name: el.innerHTML,
        link: `#${el.id}`,
      })
    })

    return sections
  }

  onResults = (results) => {
    this.setState({searchResults: results})
  }

  render () {
    const sections = this._getSections().map((section, i) => {
      return (
        <li key={i} className="toc__item"><a href={section.link} className="toc__link">{section.name}</a></li>
      )
    })

    return (
      <div>
        <Navbar onResults={this.onResults} />

        <div className="main">
          <aside className="main__sidebar main__sidebar--single">
            <ul className="toc">
              { sections }
            </ul>
          </aside>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Single />, document.getElementById('root'))
