import React from 'react'
import ReactDOM from 'react-dom'

import Facet from './facet.js'
import Navbar from './navbar.js'
import TutorialList from './tutorialList.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null,
      options: [],
      tutorials: [],
    }

    this.updateFacet = this.updateFacet.bind(this)
    this.clearFacets = this.clearFacets.bind(this)
  }

  componentDidMount () {
    fetch('/tags.json').then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        options: data.tags,
        tutorials: data.tutorials,
      })
    }).catch((err) => {
      // TODO: do something here
    })
  }

  clearFacets () {
    const options = this.state.options.map(option => {
      option.active = false
      return option
    })

    this.setState({ options })
  }

  updateFacet (event) {
    const optionName = event.target.innerHTML

    const index = this.state.options.findIndex(option => option.name == optionName)

    let options = this.state.options
    let option = options[index]
    option.active = !option.active

    options = [
      ...options.slice(0, index),
      option,
      ...options.slice(index + 1, options.length)
    ]

    this.setState({ options })
  }

  onResults = (results) => {
    this.setState({searchResults: results})
  }

  render () {
    // TODO: This should be possible with reduce
    let facetNames = []
    this.state.options.map(option => {
      if (facetNames.indexOf(option.facet) == -1) {
        facetNames = [
          ...facetNames,
          option.facet
        ]
      }
    })

    const facets = facetNames.map((facet, i) => {
      const options = this.state.options.filter(o => o.facet == facet)
      return <Facet key={i} name={facet} options={options} updateFacet={this.updateFacet} />
    })

    const activeOptions = this.state.options.filter(option => option.active)
      .map(option => {
        return { facet: option.facet, name: option.name } // remove active field for stringification
      })

    const tutorialsMatchingFacets = this.state.tutorials.filter(tutorial => {
      let shouldInclude = true // by default show all the tutorials

      activeOptions.map(option => {
        const stringifiedOptions = tutorial.options.map(option => JSON.stringify(option))

        if (stringifiedOptions.indexOf(JSON.stringify(option)) == -1) {
          shouldInclude = false
        }
      })

      return shouldInclude
    })

    let tutorials = tutorialsMatchingFacets
    if (this.state.searchResults !== null) {
      const tutorialsSet = new Set(tutorialsMatchingFacets.map(tutorial => tutorial.url))
      tutorials = this.state.searchResults.filter(slug => {
        return tutorialsSet.has(slug)
      })
    }

    return (
      <div>
        <Navbar onResults={this.onResults} />

        <div className="main">
          <aside className="main__sidebar">
            <div className="filter-header">
              <h5 className="filter-header__title">Filters</h5>
              <a onClick={this.clearFacets}><h5 className="filter-header__clear">X Clear Filters</h5></a>
            </div>
            <div className="filters">
              { facets }
            </div>
          </aside>

          <div className="main__content">
            <h1 className="main__title">Tutorials</h1>
            <TutorialList tutorials={ tutorials } />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
