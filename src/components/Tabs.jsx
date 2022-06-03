// imports
import React, { useState, useEffect, useContext } from 'react';
import sendAsync from '../message-control/renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessageBox from '../message-control/confirmationBox'

// component
import Tab from './Tab'


export default function Tabs(props) {
    const [tabs, setTabs] = useState(props.tabs)

    useEffect (() => {
        console.log("Tabs List: ", props.activeTabID)
        LoadTabs();
    }, [props.activeTabID]);

    const LoadTabs = async () => {
        let getTabsquery = `SELECT * FROM tabs ORDER BY [order] ASC`;
        let tabsResult = await sendAsync("GetTabs", getTabsquery);
        setTabs(tabsResult.data)
    };

    const UpdateActiveTabID = (id) => 
        props.updateActiveTabID(id)
    
    const AddNewTab = async () => {
        props.updateLoadingClass("loading");
        try {
            if(tabs.length > 4) {
                await MessageBox("Maximum tab limit reached.");
                props.updateLoadingClass("");
                return;
            }
            let query = `
            INSERT INTO tabs (title, 'order')
            VALUES (?, ?)
            RETURNING id;`;
            let newTabOrderNo = tabs.length + 1;
            let newTitle = "Tab " + newTabOrderNo;
            await sendAsync("CreateNewTab",query, [newTitle, newTabOrderNo]).then((result) => {
                if (result.status == 1) {
                
                    // Add tab to nav bar
                    var newTabToAdd = {
                        id: result.data[0].id,
                        title: newTitle,
                        order: newTabOrderNo
                    }
                    setTabs(tabs => [...tabs, newTabToAdd])
                    props.updateLoadingClass("loaded");

                } else {
                    console.log("There was an issue creating new tab.")
                    props.updateLoadingClass("loaded-error");
                }     
        
            });
        } catch (error) {
            console.log("There was an error creating new tab: ", error);
        }
    }
  
    return (
        <>
            {tabs.map(t =>
                <Tab key={t.id} tab={t} activeTabID={props.activeTabID} updateActiveTabID={UpdateActiveTabID} defaultTabID={props.defaultTabID}/>
            )}
            <li className="nav-item tab-item" title='Create new tab'>
                <button className="btn nav-link" onClick={() => AddNewTab()}><FontAwesomeIcon icon="plus" /></button>
            </li>
        </>
    )
}
