// imports
import React, { useState, useEffect /*, Component */ ,componentDidUpdate } from 'react';
import sendAsync /*, { storeSet, storeGet, storeDelete, storeCount } */ from '../message-control/renderer'
import { OkayCancel } from '../message-control/confirmationBox'
import BottomMenu from '../components/BottomMenu'

// components
import Note from '../components/Note'
import { jsonDiff } from 'prettier';
import { isWindows } from 'prettier';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



export default function Home(props) {
  
  const { tabID } = useParams();

  const [notes, setNotes] = useState([]);
  const [focussedNoteId, setFocussedNoteId] = useState(null)
  const [noteHasFocus, setNoteHasFocus] = useState(false)
  const [editorOptions, setEditorOptions] = useState()
 
  useEffect(() => {
    props.updateActiveTabID(tabID)
    LoadTab(tabID);
  }, [tabID]);

  async function LoadTab() {
    try {
      props.updateLoadingClass("loading")

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
      let notesResult = await sendAsync("GetNotes", getNotesquery, [(tabID ? tabID : props.defaultTabID)]);
      if (notesResult.status == 1)
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

  const AddNewNote = async (value) => {
    // Insert into db
    let query = `
    INSERT INTO notes ('order', tab)
    VALUES (?, ?);`;
    await sendAsync("AddNewNote",query, [(notes.length + 1), tabID]).then((result) => {
      //console.log("New Insert Result: " + JSON.stringify(result))
      if (!result) {
        alert("There was an issue creating new note.")
      } else {

      }
    });

    // Retrieve new note
    let retriveNewRowQuery = `SELECT max(id) AS id FROM notes WHERE tab = ${tabID};`;
    await sendAsync("GetNewNote", retriveNewRowQuery).then((result) => {
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
  //async function DeleteNote (value){
    if (focussedNoteId == null) {
      alert("No note is selected to delete!")
      return;
    }
  
    var confirmDelete = await OkayCancel("Are you sure you want to delete this note?");
    
    if (confirmDelete.response == 1){
      props.updateLoadingClass("loading")

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
      return;
    }
  }

  const sendNoteIDToParent = (index) => {
    setFocussedNoteId(index);
  };

  const showBottomMenu = (value) => {
    setNoteHasFocus(value)
  }

  const SaveNote = async  (id, title, content) => {
    props.updateLoadingClass("loading")
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
      <div className="row">{tabID}</div>
      
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
              editorOptions={editorOptions} />
            /* <div className="col-12 text-center">
              <button className="btn btn-primary btn-sm rounded-circle">+</button>
            </div> */
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
        />
    </div>
  );

}


