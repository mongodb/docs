import {MarianUI} from './Marian.js';
import NavbarDropdown from './navbar-dropdown.js';
import PropTypes from 'prop-types';
import Velocity from 'velocity-animate';
import classNames from 'classnames';
import preact from 'preact';

// PM has asked that we not use the download arrow anymore, so commenting this out.
// function DownloadArrowIcon() {
//     return (<svg height="11" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m8.8 6.8-1.2-1.2-2.1 2v-7.6h-1.7v7.6l-2.1-2-1.2 1.2 4.2 4.2z" fill="#13aa52"/></svg>);
// }

function RocketDownloadIcon() {
    return (<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g id="Icons" fill="#13aa52"><path class="cls-1" d="M15.67.32a.79.79,0,0,0-.76-.2,18.67,18.67,0,0,0-3.77,1.22l3.51,3.51a18.64,18.64,0,0,0,1.22-3.77A.79.79,0,0,0,15.67.32Z"/><path class="cls-1" d="M8,3.5,2.31,9.22l4.45,4.45L12.49,8a11,11,0,0,0,1.35-1.68L9.72,2.15A11,11,0,0,0,8,3.5Z"/><path class="cls-1" d="M1.2,11.45C.28,12.37.09,15.91.09,15.91s3.53-.19,4.45-1.11a2.34,2.34,0,0,0,.68-1.55L2.75,10.77A2.34,2.34,0,0,0,1.2,11.45Z"/><polygon class="cls-1" points="4.83 5.88 1.2 5.88 0.09 7 1.9 8.81 4.83 5.88"/><polygon class="cls-1" points="8.99 15.91 10.11 14.79 10.11 11.18 7.19 14.1 8.99 15.91"/></g></svg>);
}

class Navbar extends preact.Component {
    constructor (props) {
        super(props);
        this.state = JSON.parse(props.navprops);
        this.state.enableMarian = Boolean(document.body.getAttribute('data-enable-marian'));

        // There are four supported configurations:
        // 1) No Marian
        // 2) data-project-title & data-search-properties are set
        // 3) data-project-title & data-search-properties are empty
        // 4) data-search-properties is not set, but data-project and data-branch are

        if (this.state.enableMarian) {
            let label = document.body.getAttribute('data-project-title');
            let searchProperties = document.body.getAttribute('data-search-properties');
            if (searchProperties === null) {
                const projectName = document.body.getAttribute('data-project');
                const projectBranch = document.body.getAttribute('data-branch');
                searchProperties = `${projectName}-${projectBranch}`;

                if (label) {
                    if (projectBranch && projectBranch !== 'master') {
                        label += ` ${projectBranch}`;
                    }
                }
            }

            this.state.marian = new MarianUI(searchProperties, label, (newQuery) => {
                this.setState({
                    'searchText': newQuery
                });

                this.search();
            });
            this.state.timeout = -1;
            this.state.searchText = this.state.marian.query;

            window.history.onnavigate = () => {
                this.setState({
                    'searchText': ''
                });
                this.search();
            };
        }

        this.calculateBlurredWidth = this.calculateBlurredWidth.bind(this);
        this.calculateFocusWidth = this.calculateFocusWidth.bind(this);
        this.animateSearch = this.animateSearch.bind(this);

        this.onInput = this.onInput.bind(this);
    }

    onInput (event) {
        if (!this.state.enableMarian) { return; }

        this.setState({
            'searchText': event.target.value
        });

        window.clearTimeout(this.state.timeout);
        this.setState({'timeout':
            window.setTimeout(() => {
                this.search();
            }, 250)});
    }

    search () {
        if (!this.state.enableMarian) { return; }

        window.clearTimeout(this.state.timeout);
        this.state.marian.search(this.state.searchText);
    }

    componentDidMount () {
        // Pass the animateSearch function
        const animateSearch = this.animateSearch;

        if (this.state.enableMarian) {
            const input = document.querySelector('.navbar-search');
            animateSearch(input);

            return;
        }
    }

    // Animate the search bar on focus, blur and window resize
    animateSearch (input) {
        const calculateBlurredWidth = this.calculateBlurredWidth;
        const calculateFocusWidth = this.calculateFocusWidth;

        // Set the initial size of the search bar depending on browser size
        input.style.width = calculateBlurredWidth();

        // Width of the search bar must be set manually when in or out of focus
        input.onfocus = function() {
            // Stop any executing animations, then start expanding
            Velocity(input, 'stop');
            Velocity(input, {'width': calculateFocusWidth()}, {'duration': 200});
        };

        input.onblur = function() {
            // Stop any executing animations, then start collapsing
            Velocity(input, 'stop');
            Velocity(input, {'width': calculateBlurredWidth()}, {'duration': 200});
        };

        // Resize search bar when the browser is resized
        window.addEventListener('resize', () => {
            document.querySelector('.navbar-search').style.width = calculateBlurredWidth();
        });
    }

    // Calculates the size of the search bar when it's not in focus
    calculateBlurredWidth () {
        const totalWidth = document.querySelector('.navbar__right').clientWidth;
        const linksWidth = document.querySelector('.navbar-links').clientWidth;
        const downloadWidth = document.querySelector('.navbar-download').clientWidth;

        const searchWidth = totalWidth - (linksWidth + downloadWidth);

        // Return as a string to forcefeed to velocity.js
        return `${searchWidth}px`;
    }

    // Calculates the size of the search bar when it's in focus, cursor
    calculateFocusWidth () {
        return `${document.querySelector('.navbar__right').clientWidth}px`;
    }

    render () {
        let searchBar = null;
        if (this.state.enableMarian) {
            searchBar = <input type="search"
                className="navbar-search"
                onInput={this.onInput}
                value={this.state.searchText}
                placeholder="Search Documentation"
                aria-label="Search Documentation"></input>;
        }

        function NavbarDownloadButton() {
            const dataProject = document.body.getAttribute('data-project');
            const dataProjectIsAtlas = dataProject === 'atlas';
            const linkText = dataProjectIsAtlas ? 'Deploy a free cluster' : 'Get MongoDB';
            const linkUrl = `https://www.mongodb.com/download-center?utm_source=${dataProject}&utm_campaign=download-mongodb-navbar-cta&utm_medium=docs`;
            const linkIcon = dataProjectIsAtlas ? <RocketDownloadIcon /> : '';

            return (
                <div className="navbar-download">
                    <a href={ linkUrl } className="navbar-download__text">{ linkText }</a>
                    { linkIcon }
                </div>
            );
        }

        const linkElements = this.state.links.map((link, i) => {
            const linkClass = classNames({
                'navbar-links__item': true,
                'navbar-links__item--active': link.active
            });

            return <a href={ link.url } key={i} className={ linkClass }>{ link.text }</a>;
        });

        return (
            <div style="position: fixed; top: 0;">
                <a href="https://www.mongodb.com/world">
                    <img className="show-medium-and-up" src="https://docs.mongodb.com/images/mongodb-live-banner.png"  alt="Register Now for MongoDB.live, free & fully virtual on June 9th-10th" />
                    <img className="hide-medium-and-up" src="https://docs.mongodb.com/images/mongodb-live-banner-mobile.png" alt="Register Now for MongoDB.live, free & fully virtual on June 9th-10th" />
                </a>
                <nav className="navbar">
                    <div className="navbar__left">
                        <a href="https://www.mongodb.com/">
                            <img src="https://docs.mongodb.com/images/mongodb-logo.png" className="navbar-brand" alt="MongoDB Logo" />
                        </a>

                        <span className="navbar-seperator"></span>

                        <NavbarDropdown links={this.state.dropdown} />
                    </div>

                    <div className="navbar__right">
                        <div className="navbar-links">
                            { linkElements }
                        </div>

                        <NavbarDownloadButton />
                        { searchBar }
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    'navprops': PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)))
};

const navbar = document.getElementById('navbar');
preact.render(<Navbar {...(navbar.dataset)} />, navbar);
