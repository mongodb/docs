import React from 'react'
import ReactDOM from 'react-dom'

import Facet from './facet.js'
import Search from './Search.js'
import Navbar from './navbar.js'
import TutorialList from './tutorialList.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null,
      options: [
        { name: "MongoDB", facet: 'product', active: false },
        { name: "Atlas", facet: 'product', active: false },
        { name: "Cloud Manager", facet: 'product', active: false },
        { name: "Ops Manager", facet: 'product', active: false },
        { name: "BI Connector", facet: 'product', active: false },
        { name: "Spark Connector", facet: 'product', active: false },
        { name: "Mongo Shell", facet: 'language', active: false },
        { name: "Python", facet: 'language', active: false },
        { name: "Java", facet: 'language', active: false },
        { name: "Node.js", facet: 'language', active: false },
        { name: "PHP", facet: 'language', active: false },
        { name: "C", facet: 'language', active: false },
        { name: "C++ 11", facet: 'language', active: false },
        { name: "C#", facet: 'language', active: false },
        { name: "Perl", facet: 'language', active: false },
        { name: "Ruby", facet: 'language', active: false },
        { name: "CRUD", facet: 'topic', active: false },
        { name: "Aggregation", facet: 'topic', active: false },
        { name: "Administration", facet: 'topic', active: false },
        { name: "Security", facet: 'topic', active: false },
        { name: "Replication", facet: 'topic', active: false },
        { name: "Sharding", facet: 'topic', active: false },
      ],
      tutorials: [
        { 
          title: 'Connecting to MongoDB (Python)',
          url: '/connect-to-mongodb-python',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'Connecting to MongoDB (Mongo Shell)',
          url: '/connect-to-mongodb-shell',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Mongo Shell' },
          ]
        },
        {
          title: 'Setting up a Replica Set',
          url: '/setting-up-a-replica-set',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Mongo Shell' },
            { facet: 'topic', name: 'Replication' },
          ]
        },
        {
          title: 'How to Compass',
          url: '/compass',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [
            { facet: 'product', name: 'Compass' },
          ]
        }
      ],
    }

    this.updateFacet = this.updateFacet.bind(this)
    this.clearFacets = this.clearFacets.bind(this)
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
        <Navbar />

        <Search onResults={this.onResults} />

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
