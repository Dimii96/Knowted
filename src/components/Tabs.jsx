// imports
import React, { useState, useEffect, useContext } from 'react';
import sendAsync from '../message-control/renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// component
import Tab from './Tab'


function Tabs(props) {
    const [tabs, setTabs] = useState(props.tabs)
    const [activeTabID, setActiveTabID] = useState(1)

    useEffect (() => {
        //LoadTabs();
        //console.log("Loading tabs...", props.tabs)
    }, []);

    const LoadTabs = async () => {
        let getTabsquery = `SELECT * FROM tabs ORDER BY [order] ASC`;
        let tabsResult = await sendAsync("GetTabs", getTabsquery);
        setTabs(tabsResult.data)
    };

    const SetActiveTabID = (id) => 
        setActiveTabID(id)
    

    const AddNewTab = async () => {
        try {
            if(tabs.length > 4) {
                alert("Maximum tab limit reached.");
                return;
            }
            let query = `
            INSERT INTO tabs (title, 'order')
            VALUES (?, ?)
            RETURNING id;`;
            let newTabOrderNo = tabs.length + 1;
            let newTitle = "Tab " + newTabOrderNo;
            await sendAsync("CreateNewTab",query, [newTitle, newTabOrderNo]).then((result) => {
                console.log("New Tab Insert: " + JSON.stringify(result))
                if (result.status == 1) {
               
                    // Add tab to nav bar
                    var newTabToAdd = {
                        id: result.data[0].id,
                        title: newTitle,
                        order: newTabOrderNo
                    }
                    setTabs(tabs => [...tabs, newTabToAdd])
                } else {
                    console.log("There was an issue creating new tab.")
                }     
        
            });
        } catch (err) {
            console.log("There was an error creating new tab");
        }
    }
  
    return (
        <>
            {tabs.map(t =>
                <Tab key={t.id} tab={t} activeTabID={activeTabID} setActiveTabID={SetActiveTabID} />
            )}
            <li className="nav-item tab-item" title='Create new tab'>
                <button className="btn nav-link" onClick={() => AddNewTab()}><FontAwesomeIcon icon="plus" /></button>
            </li>
        </>
    )
}

export default Tabs;
