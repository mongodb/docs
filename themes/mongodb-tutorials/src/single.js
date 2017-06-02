import React from 'react'
import ReactDOM from 'react-dom'
import domslider from 'dom-slider'
import elementClass from 'element-class'

import Navbar from './navbar.js'
import Search from './search.js'

const baseURL = window.__baseURL__

function setupCopyButtons() {
  const copyableBlocks = document.getElementsByClassName('highlight')
  for (const highlightElement of copyableBlocks) {
    const text = highlightElement.innerText.trim()
    const copyButtonContainer = document.createElement('div')
    const copyButton = document.createElement('button')
    copyButtonContainer.className = 'copy-button-container'
    copyButton.className = 'copy-button'
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

function setupSidebar () {
  const tocLinks = document.querySelectorAll('.toc__link')

  tocLinks.forEach((link) => {
    // handle opening & closing of the toc
    const nestedList = link.nextSibling

    if (nestedList) {
      link.addEventListener('click', (e) => {
        elementClass(link).toggle('toc__link--open')
        nestedList.slideToggle(400)
      })
    }

    link.addEventListener('click', (e) => {
      tocLinks.forEach(l => elementClass(l).remove('toc__link--active'))
      elementClass(link).add('toc__link--active')
    })
  })
}


class Single extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null
    }
  }

  componentDidMount() {
    setupCopyButtons()
    setupSidebar()
  }

  onResults = (results) => {
    this.setState({searchResults: results})
  }

  render () {

    return (
      <div>
        <Navbar baseURL={baseURL}>
          <Search baseURL={baseURL} onResults={this.onResults} />
        </Navbar>
      </div>
    )
  }
}

ReactDOM.render(<Single />, document.getElementById('root'))
