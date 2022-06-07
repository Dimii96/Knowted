// imports
import React, {useEffect, useState} from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import sendAsync from '../message-control/renderer';

// Pages 
import Home from "./Home"
// import About from "./About"
import Settings from "./Settings"
import Error from "./Error"


// Components
import Tabs from '../components/Tabs'


// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCoffee, faPlus, faExclamationCircle, faCircle, faSave,
    faEdit, faCheck, faTimes, faCog, faFilter, faGripLinesVertical, faHome,
    faTrash, faSpinner, faCloud, faCloudUploadAlt, faCloudDownloadAlt, faPlusCircle,
    faGripVertical, faEllipsisH, faChevronRight, faChevronUp, faChevronDown, faWrench, faSort,
    faSortUp, faSortDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faCoffee, faPlus, faExclamationCircle, faCircle, faSave,
    faEdit, faCheck, faTimes, faCog, faFilter, faGripLinesVertical, faHome,
    faTrash, faSpinner, faCloud, faCloudUploadAlt, faCloudDownloadAlt, faPlusCircle,
    faGripVertical, faEllipsisH, faChevronRight, faChevronUp, faChevronDown, faWrench, faSort,
    faSortUp, faSortDown)

 

export default function App() {
    const [tabList, setTabList] = useState([])
    const [loadingClass, setLoadingClass] = useState("");
    const [defaultTabID, setDefaultTabID] = useState();
    const [activeTabID, setActiveTabID] = useState()
     
    useEffect (() => {
        LoadTabs();
    }, []);

    const LoadTabs = async () => {
        setLoadingClass("loading")
        let getTabsquery = `SELECT * FROM tabs ORDER BY [order] ASC`;
        let tabsResult = await sendAsync("GetTabs", getTabsquery);
        setDefaultTabID(tabsResult.data[0].id)
        setTabList(tabsResult.data)
    };

    const UpdateTabTitle = (id, text) => {
        console.log("Update TabID: " + id + " to " + text)
    }

    const UpdateActiveTabID = (value) => {
        setActiveTabID(value)
    }

    const DeleteTab = (id) => {
        console.log("Deleting tab...",id)
        // let tabs = tabList.filter((item) => item.id !== id);
        // setTabList(tabList)
    }

    function UpdateLoadingClass(value) {
        setLoadingClass("");
        setTimeout(function() {
            // Need to set a timeout as DOM doesn't update if instantly updating the useState
            setLoadingClass(value); 
        }, 0)   
    }

    return (
    <HashRouter>
        <main>
            <nav className={"navbar navbar-expand navbar-dark bg-dark " + loadingClass}>
                <div className="container-fluid">
                    {/* <a className="navbar-brand px-1" style={{ border: '1px solid white', borderRadius: '5px' }}>Knowted<span className="title-beta">beta</span></a> */}
                    <Link className="navbar-brand px-1" to={`/tab/${defaultTabID}`} style={{ border: '1px solid white', borderRadius: '5px' }}>Knowted<span className="title-beta">beta</span></Link>
                    <button className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse  justify-content-end" id="navbarNav">
                        <ul className="navbar-nav white">
                            {(tabList.length > 0) 
                            ? <Tabs tabs={tabList} activeTabID={activeTabID} updateActiveTabID={UpdateActiveTabID} deleteTab={DeleteTab} updateLoadingClass={UpdateLoadingClass} defaultTabID={defaultTabID} />
                            : null }
                            <li className="nav-item">
                                <Link className="nav-link" to="/settings"><FontAwesomeIcon icon="cog" /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </main>
        <Switch>
            <Route exact path="/" render={() => <Home updateLoadingClass={UpdateLoadingClass} updateActiveTabID={UpdateActiveTabID} defaultTabID={defaultTabID}  />} />  
            <Route path="/tab/:tabID" render={() => <Home updateLoadingClass={UpdateLoadingClass}  updateActiveTabID={UpdateActiveTabID} /> } />
            {/* <Route path="/about" component={About}  /> */}
            <Route exact path="/settings" render={() => <Settings updateLoadingClass={UpdateLoadingClass} /> } />  
            <Route path="/error" render={() => <Error updateLoadingClass={UpdateLoadingClass} />} />  
        </Switch>
    </HashRouter>
)};
