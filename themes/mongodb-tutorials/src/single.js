import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './navbar.js'

const baseURL = window.__baseURL__

function setupCopyButtons() {
  const copyableBlocks = document.getElementsByClassName('highlight')
  for (const copyBlock of copyableBlocks) {
    // const highlightElement = copyBlock.getElementsByClassName('highlight')[0]
    // if (!highlightElement) {
    //   return
    // }
    const highlightElement = copyBlock

    const text = highlightElement.innerText.trim()
    const copyButtonContainer = document.createElement('div')
    const copyButton = document.createElement('button')
    const copyIcon = document.createElement('span')
    copyButtonContainer.className = 'copy-button-container'
    copyIcon.className = 'fa fa-clipboard'
    copyButton.className = 'copy-button'
    copyButton.appendChild(copyIcon)
    copyButton.appendChild(document.createTextNode('Copy'))
    copyButtonContainer.appendChild(copyButton)
    highlightElement.insertBefore(copyButtonContainer, highlightElement.children[0])
    copyButton.addEventListener('click', () => {
      const tempElement = document.createElement('textarea')
      document.body.appendChild(tempElement)
      tempElement.value = text
      tempElement.select()

      try {
        const successful = document.execCommand('copy')
        if (!successful) {
          throw new Error('Failed to copy')
        }
      } catch (err) {
        console.error('Failed to copy')
        console.error(err)
      }

      document.body.removeChild(tempElement)
    })
  }
}


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
        <Navbar baseURL={baseURL} onResults={this.onResults} />

        <div className="main">
          <aside className="main__sidebar main__sidebar--single">
            <div className="main__sidebar__header">
              MongoDB Manual Sections:
            </div>
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
document.addEventListener('DOMContentLoaded', function() {
  setupCopyButtons()
})
