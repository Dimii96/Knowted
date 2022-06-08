// imports
import React, { useState, useEffect } from 'react';
import sendAsync  from '../message-control/renderer'
import MessageBox, { OkayCancel } from '../message-control/confirmationBox'
import { useHistory  } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

// components
import Note from '../components/Note'
import BottomMenu from '../components/BottomMenu'


export default function Home(props) {
  const { tabID } = useParams();
  const history = useHistory();

  const [notes, setNotes] = useState([]);
  const [focussedNoteId, setFocussedNoteId] = useState(null)
  const [noteHasFocus, setNoteHasFocus] = useState(false)
  const [editorOptions, setEditorOptions] = useState()
  const [selectedTabID, setSelectedTabID] = useState(tabID)
  const [characterCount, setCharacterCount] = useState(0)

  useEffect(() => {
    setSelectedTabID(tabID ? tabID : props.defaultTabID)
  }, [tabID]);
  
  useEffect(() => {
    //history.push("/error");
    //props.updateLoadingClass("loading")

    try {      
        props.updateActiveTabID(selectedTabID)
        LoadTab(selectedTabID);
      } catch (error) {
        history("/error")
      }
  }, [selectedTabID]);

  async function LoadTab() {
    try {
      //props.updateLoadingClass("loading")

      // let getEditorOptionsQuery = `SELECT option from tinymce_options WHERE type = 'toolbar' AND enabled`;
      // let editorOptionsResults = await sendAsync(getEditorOptionsQuery)
      // //console.log(JSON.stringify(editorOptionsResults))
      // let tmpEditorOptionsString = '';
      // if (editorOptionsResults.length > 0) {
      //   editorOptionsResults.forEach(o => {
      //     tmpEditorOptionsString += o.option + ' '
      //   });
      //   setEditorOptions(tmpEditorOptionsString)
      // }

      let getNotesquery = `SELECT * FROM notes WHERE tab = ? ORDER BY [order] ASC`;
      let notesResult = await sendAsync("GetNotes", getNotesquery, [selectedTabID]);
      if (notesResult.status === 1)
        setNotes(notesResult.data)
        await props.updateLoadingClass("loaded")

      // // TinyMCE Options  
      // let getEditorOptionsQuery = `SELECT option from tinymce_options WHERE type = 'toolbar' AND enabled`;
      // let editorOptionsResults = await sendAsync("GetEditorOptions", getEditorOptionsQuery)
      // //console.log(JSON.stringify(editorOptionsResults))
      // let tmpEditorOptionsString = "";
      // editorOptionsResults.forEach(o => {
      //   tmpEditorOptionsString += o.option + " "
      // });
      //setTemp(tmpEditorOptionsString)
      // console.log(tmpEditorOptionsString)

      // if (editorOptionsResults.length > 0)
      //   setEditorOptions([tmpEditorOptionsString])

      setNoteHasFocus(false);


    } catch (error) {
      console.log("There was an error loading the home page.", error)
    }
  }

  const AddNewNote = async () => {

    if(notes.length >= 100) {
      MessageBox("Maximum number of notes (100) reached.");
      return;
    }
    // Insert into db
    let query = `
    INSERT INTO notes ('order', tab)
    VALUES (?, ?);`;
    await sendAsync("AddNewNote",query, [(notes.length + 1), selectedTabID]).then((result) => {
      //console.log("New Insert Result: " + JSON.stringify(result))
      if (!result) {
        alert("There was an issue creating new note.")
      } else {

      }
    });

    // Retrieve new note
    let retriveNewRowQuery = `SELECT max(id) AS id FROM notes WHERE tab = ?;`;
    await sendAsync("GetNewNote", retriveNewRowQuery, [selectedTabID]).then((result) => {
      var newRowToAdd = {
        id: result.data[0].id,
        title: "",
        content: ""
      }
      // Append to list
      setNotes(notes => [...notes, newRowToAdd])
    });
  }

  const DeleteNote = async (value) => {
    if (focussedNoteId == null) {
      alert("No note is selected to delete!")
      return;
    }
  
    props.updateLoadingClass("loading")
    var confirmDelete = await OkayCancel("Are you sure you want to delete this note?");
    if (confirmDelete.response === 1){

      let query = `DELETE FROM notes WHERE id = ?;`;
      await sendAsync("DeleteNote", query, [focussedNoteId]).then((result) => {
        if (!result) {
          props.updateLoadingClass("loaded-error")
          alert("There was an issue deleting!")
        } else {
          const newNotesList = notes.filter((item) => item.id !== focussedNoteId);
          setNotes(newNotesList)
          props.updateLoadingClass("loaded")
        }
      });
      setNoteHasFocus(false);
      return;
    } else {
      props.updateLoadingClass("")
      return;
    }
  }

  const sendNoteIDToParent = (index) => {
    setFocussedNoteId(index);
  };

  const showBottomMenu = (value) => {
    setNoteHasFocus(value)
  }

  const UpdateCharacterCount = (value) => {
    setCharacterCount(value)
  }
  
  const SaveNote = async  (id, title, content) => {
    props.updateLoadingClass("loading")
    setCharacterCount(0);
    let query = `UPDATE notes SET title = ?, content = ? WHERE id = ?;`;
    sendAsync("SaveNote", query, [title, content, id]).then((result) => {
      if (!result) {
        props.updateLoadingClass("loaded-error")
        alert("There was an issue saving!")
      } else {
        props.updateLoadingClass("loaded")
      }
    });
  }

  return (
    <div id="Home" className="container-fluid mt-2">
     
      {notes.length > 0 ?
        <div id="notes">
          {notes.map(r =>
            // <div className="rows">
            <Note key={r.id}
              className="col-12"
              id={r.id}
              title={r.title}
              content={r.content}
              editable={r.editable}
              sendNoteIDToParent={sendNoteIDToParent}
              showBottomMenu={showBottomMenu}
              saveNote={SaveNote}
              editorOptions={editorOptions} 
              updateLoadingClass={props.updateLoadingClass} 
              updateCharacterCount={UpdateCharacterCount}/>
            /* <button className={"btn btn-outline-dark btn-sm" }
           onClick={() => AddNewNote}>
          <FontAwesomeIcon icon="plus-circle" />
        </button>  */
            // </div>
          )}
        </div>
        :
        <div className="row">
          <div className="col-12 br-grey white text-center mt-5 p-3">
            Click the Plus button in the toolbar at the bottom to create a new note.
          </div>
        </div>
      }
      <BottomMenu
        id={focussedNoteId}
        noteHasFocus={noteHasFocus}
        // disabled={false}
        addNewNote={AddNewNote}
        deleteNote={DeleteNote}
        saveNote={SaveNote}
        characterCount={characterCount}
        />
    </div>
  );

}


