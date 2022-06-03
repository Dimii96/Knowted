// imports
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

function Tab(props) {
    const [activeClass, setActiveClass] = useState(props.activeTabID)

    useEffect(() =>{
        setActiveClass((props.tab.id == props.activeTabID)  ? "active" : null)
    }, [props.activeTabID])

    return (
        <li className={"nav-item tab-item " + activeClass} onClick={() => props.updateActiveTabID(props.tab.id)} >
            <Link className="nav-link" to={`/tab/${props.tab.id}`}>
                {props.tab.title}
            </Link>
        </li>
    )
}

export default Tab;
