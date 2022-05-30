// imports
import React, { useState, useEffect } from 'react';
import sendAsync from '../message-control/renderer';
import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Tab(props) {
    const [activeClass, setActiveClass] = useState(null)
    useEffect(() =>{
        setActiveClass(props.tab.id == props.activeTabID ? "active" : null)
    }, [null, props.activeTabID])
    return (
        <li className={"nav-item tab-item " + activeClass} onClick={() => props.setActiveTabID(props.tab.id)} >
            <Link className="nav-link" to={`/tab/${props.tab.id}`}>
                {props.tab.title}
            </Link>
        </li>
    )
}

export default Tab;
