import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendAsync from '../message-control/renderer'

export default function EditTabField(props) {
  const [hasChanged, setHasChanged] = useState(false)
  const [title, setTitle] = useState(props.tab.title);


  useEffect(() => {
    setHasChanged(props.tab.title != title ? true : false)
  }, [title]);
   
  function UpdateTitle () {
     try {
      let tmpNewTitle = title
      if(!title || title == "") 
      { 
        tmpNewTitle = "Tab " + (props.tab.order + 1);
        setTitle(tmpNewTitle);
      }
      
      let updateQuery = `UPDATE tabs SET title = ? WHERE id = ?`;
      let result = sendAsync("UpdateTab", updateQuery, [tmpNewTitle, props.tab.id]);
      if(result.status = 1) {
        window.location.reload(); // Cheating here and just refreshing page instead of dynimcally updating data
        // props.tab.title = title;
        // props.updateTabTitle(props.tab.id, tmpNewTitle);
        // setHasChanged(false);
      } else {
        console.log("There was an issue saving changes to the tab title.");
      }
    } catch (error) {
      console.log("There was an issue updating the tab.");
    }
  }

  const  DeleteTab = async () => {
    try {
      if(window.confirm('Are you sure you want to delete tab "' + props.tab.title + '" this tab and all the notes within?')) {

        let updateQuery = `DELETE FROM tabs WHERE id = ?`;
        let result = await sendAsync("DeleteTab", updateQuery, [props.tab.id]);
        if(result.status = 1) {
          let updateTabOrderQuery = `UPDATE tabs SET 'order' = ([order] - 1) WHERE [order] >= ?;`;
          let orderUpdateResult = await sendAsync("TabOrderUpdate", updateTabOrderQuery, [props.tab.order]) 
          console.log(orderUpdateResult)
          window.location.reload();
          // const newTabsList = tabs.filter((item) => item.id !== id);
          // setTabList(newTabsList)
        } else {
            console.log("There was an issue deleting the tab.");
        }
      }
    } catch (error) {
      console.log("There was an issue deleting the tab.");
      
    }
  }


  return (
    <div className="input-group mb-3">
    <div className="input-group-text">{props.tab.order}.</div>
    <input type="text" className="form-control" aria-label="Tab text" onChange={e => setTitle(e.target.value)} value={title ? title : ""} />
    <button className={"input-group-text btn btn-outline-success " + (!hasChanged ? "black" : null)} disabled={!hasChanged} onClick={() => UpdateTitle()}><FontAwesomeIcon icon="save" /></button>
    <button className="input-group-text btn btn-outline-danger" onClick={() => DeleteTab()}><FontAwesomeIcon icon="trash" /></button>
    {/* <button className="input-group-text btn btn-outline-dark"><FontAwesomeIcon icon="sort-up" /></button>
    <button className="input-group-text btn btn-outline-dark"><FontAwesomeIcon icon="sort-down" /></button>  */}
  </div>
  )
}


