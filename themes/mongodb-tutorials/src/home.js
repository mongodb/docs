import React from 'react'
import ReactDOM from 'react-dom'

import Facet from './facet.js'
import Navbar from './navbar.js'
import Search from './search.js'
import TutorialList from './tutorialList.js'
import elementClass from 'element-class'

const baseURL = window.__baseURL__

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
    fetch(baseURL + '/tags.json').then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        options: data.tags,
        tutorials: data.tutorials,
      })
    }).catch((err) => {
      // TODO: do something here
    })

    var cx = '017213726194841070573:WMX6838984';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    gcse.onload = gcse.onreadystatechange = function() {
      // hack to set a placeholder in google's custom search input
      var pollInput = window.setInterval(function() {
        var input = document.querySelector('.gsc-input input.gsc-input')

        if (input) {
          input.setAttribute('placeholder', "Search Documentation");
          elementClass(input).add('navbar-search')
          window.clearInterval(pollInput);
        }
      }, 10);
    };

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
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

    const tutorialsMatchingFacets = this.state.tutorials.filter(tutorial => {
      let shouldInclude = true // by default show all the tutorials

      activeOptions.map(activeOption => {
        // Store each tutorial option ID in array
        const tutorialOptionIds = tutorial.options.map(tutorialOption => tutorialOption.id)
          // If an active option ID is not in the array, hide tutorial
          if (tutorialOptionIds.indexOf(activeOption.id) == -1) {
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

    const links = [{
      url: "/redesign/manual/",
      text: "Server",
    }, {
      url: "/redesign/ecosystem/drivers/",
      text: "Drivers",
    }, {
      url: "/redesign/cloud/",
      text: "Cloud",
    }, {
      url: "/redesign/tools",
      text: "Tools",
    }, {
      url: "/redesign/tutorials/",
      text: "Tutorials",
      active: true,
    }];

    return (
      <div>
        <Navbar baseURL={baseURL} links={links}>
          <div id="gsearch" className="gcse-searchbox-only" data-resultsUrl="http://docs.mongodb.com/manual/search/" data-queryParameterName="query"></div>
        </Navbar>

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
            <input className="tutorial-search" placeholder="Search Tutorials" />
            <h1 className="main__title">Tutorials</h1>
            <TutorialList tutorials={ tutorials } baseURL={baseURL} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
