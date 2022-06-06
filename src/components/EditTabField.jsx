import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendAsync from '../message-control/renderer'
import messageBox, {OkayCancel} from '../message-control/confirmationBox'

export default function EditTabField(props) {
  const [hasChanged, setHasChanged] = useState(false)
  const [title, setTitle] = useState(props.tab.title);


  useEffect(() => {
    setHasChanged(props.tab.title != title ? true : false)
  }, [title]);
   
  async function UpdateTitle () {
    
    try {
      props.updateLoadingClass("loading")
      let tmpNewTitle = title
      if(!title || title == "") 
      { 
        tmpNewTitle = "Tab " + (props.tab.order + 1);
        setTitle(tmpNewTitle);
      } else if (title.length > 20) {
        await messageBox("Title cannot be greater than 20 characters long.")
        props.updateLoadingClass("loaded-error")
        return;
      }
      
      let updateQuery = `UPDATE tabs SET title = ? WHERE id = ?`;
      let result = sendAsync("UpdateTab", updateQuery, [tmpNewTitle, props.tab.id]);
      if(result.status = 1) {
        window.location.reload(); // Cheating here and just refreshing page instead of dynimcally updating data
        // props.tab.title = title;
        // props.updateTabTitle(props.tab.id, tmpNewTitle);
        // setHasChanged(false);
      } else {
        await messageBox("There was an issue saving changes to the tab title.");
        props.updateLoadingClass("loaded-error")
      }
    } catch (error) {
      props.updateLoadingClass("loaded-error")

      console.log("There was an issue updating the tab.");
    }
  }

  const  DeleteTab = async () => {
    try {
      props.updateLoadingClass("loading")
      let confirmDelete = await OkayCancel('Are you sure you want to delete "' + props.tab.title + '" and all the notes within?');
      if(confirmDelete.response) {
        // First delete the notes
        let deleteNotesQuery = `DELETE FROM notes WHERE tabid = ?`;
        let deleteNotes = await sendAsync("DeleteNotes", deleteNotesQuery, [props.tab.id]);
        if(deleteNotes.status = 1) {
          console.log("Notes Deleted");
        } else {
          await messageBox("Could not delete the tab as there was an issue deleting the notes within the tab. ");
          return null;
        }

        
        let updateQuery = `DELETE FROM tabs WHERE id = ?`;
        let result = await sendAsync("DeleteTab", updateQuery, [props.tab.id]);
        if(result.status = 1) {
          let updateTabOrderQuery = `UPDATE tabs SET 'order' = ([order] - 1) WHERE [order] >= ?;`;
          let orderUpdateResult = await sendAsync("TabOrderUpdate", updateTabOrderQuery, [props.tab.order]) 
          window.location.reload();
          // const newTabsList = tabs.filter((item) => item.id !== id);
          // setTabList(newTabsList)
        } else {
            await messageBox("There was an issue deleting the tab.");
            props.updateLoadingClass("loading-error")
        }
      } else {
        props.updateLoadingClass("")
      }
    } catch (error) {
      await messageBox("There was an issue deleting the tab.");
      props.updateLoadingClass("loaded-error")
    }
  }


  return (
    <div className="input-group mb-3">
    <div className="input-group-text">{props.tab.order}.</div>
    <input type="text" className="form-control" maxLength={20} aria-label="Tab text" onChange={e => setTitle(e.target.value)} value={title ? title : ""} />
    <button className={"input-group-text btn btn-outline-success " + (!hasChanged ? "black" : null)} disabled={!hasChanged} onClick={() => UpdateTitle()}><FontAwesomeIcon icon="save" /></button>
    <button className="input-group-text btn btn-outline-danger" onClick={() => DeleteTab()}><FontAwesomeIcon icon="trash" /></button>
    {/* <button className="input-group-text btn btn-outline-dark"><FontAwesomeIcon icon="sort-up" /></button>
    <button className="input-group-text btn btn-outline-dark"><FontAwesomeIcon icon="sort-down" /></button>  */}
  </div>
  )
}


