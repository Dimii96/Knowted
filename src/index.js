import React from 'react';
import { Link } from "react-router-dom"
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'

// import App from './App';
import * as serviceWorker from './serviceWorker';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';

// Pages 
import Home from "./pages/Home"
import About from "./pages/About"
import Settings from "./pages/Settings"
import App from "./pages/z_App"

// Components
import Footer from './components/Footer'


// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faCoffee, faPlus, faExclamationCircle, faCircle, faSave,
    faEdit, faCheck, faTimes, faCog, faFilter, faGripLinesVertical, faHome,
    faTrash, faSpinner, faCloud, faCloudUploadAlt, faCloudDownloadAlt, faPlusCircle,
    faGripVertical, faEllipsisH, faChevronRight, faChevronUp, faChevronDown, faWrench,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faCoffee, faPlus, faExclamationCircle, faCircle, faSave,
    faEdit, faCheck, faTimes, faCog, faFilter, faGripLinesVertical, faHome,
    faTrash, faSpinner, faCloud, faCloudUploadAlt, faCloudDownloadAlt, faPlusCircle,
    faGripVertical, faEllipsisH, faChevronRight, faChevronUp, faChevronDown, faWrench)


ReactDOM.render(
    <Router>
        <main>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand px-1" href="/" style={{ border: '1px solid white', borderRadius: '5px' }}>Knowted<span className="title-beta">beta</span></a>
                    <button className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse  justify-content-end" id="navbarNav">
                        <ul className="navbar-nav white">

                            <li className="nav-item">
                                <Link className="nav-link" to="/"><FontAwesomeIcon icon="home" /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/settings"><FontAwesomeIcon icon="cog" /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app"><FontAwesomeIcon icon="circle" /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </main>
        <body>
            <Route exact path="/" component={Home} />
            <Route path="/app" component={App} />
            <Route path="/about" component={About} />
            <Route path="/Settings" component={Settings} />
            {/* <Footer /> */}
        </body>
    </Router>,

    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
