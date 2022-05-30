// imports
import React, { useState, useEffect /*, Component */ ,componentDidUpdate } from 'react';
import sendAsync /*, { storeSet, storeGet, storeDelete, storeCount } */ from '../message-control/renderer'
import BottomMenu from '../components/BottomMenu'

// components
import Note from '../components/Note'
import { jsonDiff } from 'prettier';
import { isWindows } from 'prettier';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


const Home = (props) => {
  
  
  const { tabID = 1} = useParams();

  const [notes, setNotes] = useState([]);
  const [focussedNoteId, setFocussedNoteId] = useState(null)
  const [noteHasFocus, setNoteHasFocus] = useState(false)
  const [editorOptions, setEditorOptions] = useState()

  const [saveIcon, setSaveIcon] = useState("cloud")
  const [saveIconColour] = useState("aqua")
 
  useEffect(() => {
    console.log(new Date())
    console.log("Tab:", tabID);
    LoadTab(tabID);
  

  }, [tabID]);

  //logger.trace("Entering cheese testing");
  // Init load of notes
  async function LoadTab() {
    try {

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
      //console.log("Notes query", getNotesquery)
      let notesResult = await sendAsync("GetNotes", getNotesquery, [(tabID ? tabID : 1)]);
      //console.log("Notes result: "+ JSON.stringify(notesResult))
      if (notesResult.status == 1)
        setNotes(notesResult.data)

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

      setNoteHasFocus(true);


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

  const DeleteNote = (value) => {

    if (focussedNoteId == null) {
      alert("No note is selected to delete!")
      return;
    }

    if (1 == 1 /*window.confirm("Delete note?")*/) {
      let query = `DELETE FROM notes WHERE id = ?;`;
      sendAsync("DeleteNote", query, [focussedNoteId]).then((result) => {
        if (!result) {
          alert("There was an issue deleting!")
        } else {
          const newNotesList = notes.filter((item) => item.id !== focussedNoteId);
          setNotes(newNotesList)
          console.log("Notes: " + focussedNoteId + " has been deleted.")
        }
      });
      setNoteHasFocus(false);
      return;
    }
  }

  const sendNoteIDToParent = (index) => {
    setFocussedNoteId(index);
  };

  const showBottomMenu = (value) => {
    setNoteHasFocus(value)
  }


  const SaveNote = (id, title, content) => {
    //console.log("Saving note: " + id)

    //setSaveIconColour("orange")
    setSaveIcon("cloud-upload-alt")
    let query = `UPDATE notes SET title = ?, content = ? WHERE id = ?;`;

    sendAsync("SaveNote", query, [title, content, id]).then((result) => {
      if (!result) {
        alert("There was an issue saving!")
      } else {
        console.log("Saved: " + id)
      }
    });
    // var delayInMilliseconds = 1000; //1 second
    // setTimeout(function () {
    //   //your code to be executed after 1 second
    //   setSaveIcon("cloud")
    //   //setSaveIconColour("aqua")
    // }, delayInMilliseconds);
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
        saveNote={SaveNote} />



    </div>
  );

}

export default Home;
