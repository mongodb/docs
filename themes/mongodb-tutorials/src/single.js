import React from 'react'
import ReactDOM from 'react-dom'

import Menu from './menu.js'
import Navbar from './navbar.js'
import Search from './search.js'
import Submenu from './submenu.js'

const baseURL = window.__baseURL__

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
        <li key={i} className="menu__item"><a href={section.link} className="menu__link">{section.name}</a></li>
      )
    })

    return (
      <div>
        <Navbar baseURL={baseURL}>
          <Search baseURL={baseURL} onResults={this.onResults} />
        </Navbar>

        <div className="main">
          <aside className="main__sidebar main__sidebar--single">
            <div className="main__sidebar__header">
              MongoDB Manual Sections:
            </div>
            <Menu>
              { sections }
            </Menu>
          </aside>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Single />, document.getElementById('root'))
