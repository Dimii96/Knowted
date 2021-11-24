// imports
import React, { useState, useEffect /*, Component */ } from 'react';
import sendAsync, { storeSet, storeGet, storeDelete, storeCount } from '../message-control/renderer'
import BottomMenu from '../components/BottomMenu'

// components
import Note from '../components/Note'


const Home = () => {

  const [notes, setNotes] = useState([]);
  const [tab] = useState(1)
  const [focussedNoteId, setFocussedNoteId] = useState(null)
  const [noteHasFocus, setNoteHasFocus] = useState(false)

  const [saveIcon, setSaveIcon] = useState("cloud")
  const [saveIconColour] = useState("aqua")

  useEffect(() => {
    LoadTab();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //logger.trace("Entering cheese testing");
  // Init load of notes
  async function LoadTab() {
    try {
      
      let query = `SELECT * FROM notes WHERE tab = ${tab} ORDER BY [order] ASC`;
      let result = await sendAsync(query);
      console.log("Restul:")
      console.log(result.length)
      if(result.length > 0) {
        setNotes(result)
      } 
    } catch (error) {
      
    }
  }

  const AddNewNote = async (value) => {

    // Insert into db
    let query = `
    INSERT INTO notes ('order', tab)
    VALUES (${notes.length + 1}, ${tab});`;
    await sendAsync(query).then((result) => {
      console.log("New Insert Result: " + JSON.stringify(result))
      if (!result) {
        alert("There was an issue creating new note.")
      } else {

      }
    });

    // Retrieve new note
    let retriveNewRowQuery = `SELECT max(id) AS id FROM notes WHERE tab = ${tab};`;
    await sendAsync(retriveNewRowQuery).then((result) => {
      console.log("MAX: ")
      console.log(JSON.stringify(result))
      var newRowToAdd = {
        id: result[0].id,
        title: "",
        content: ""
      }
      console.log(newRowToAdd)
      // Append to list
      setNotes(notes => [...notes, newRowToAdd])
    });
  }

  const DeleteNote = (value) => {

    if (focussedNoteId == null) {
      alert("No note is selected to delete!")
      return;
    }

    let query = `DELETE FROM notes WHERE id = '${focussedNoteId}';`;
    if (window.confirm("Delete note?")) {

      sendAsync(query).then((result) => {
        if (!result) {
          alert("There was an issue deleting!")
        } else {
          const newNotesList = notes.filter((item) => item.id !== focussedNoteId);
          setNotes(newNotesList)
          console.log("Notes: " + focussedNoteId + " has been deleted.")
        }
      });
    }

  }

  const sendNoteIDToParent = (index) => {
    setFocussedNoteId(index);
  };

  const showBottomMenu = (value) => {
    setNoteHasFocus(value)
  }


  const SaveNote = (id, title, content) => {
    console.log("Saving note: " + id)
    //setSaveIconColour("orange")
    setSaveIcon("cloud-upload-alt")
    let query =
      `UPDATE notes
    SET title = '${title}', 
    content = '${content}'
    WHERE id = ${id};`;

    sendAsync(query).then((result) => {
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

      {/* <Header title={test} /> */}

      {notes.length > 0 ?
        <div id="notes">
          {notes.map(r =>
            <Note key={r.id}
              id={r.id}
              title={r.title}
              content={r.content}
              sendNoteIDToParent={sendNoteIDToParent}
              showBottomMenu={showBottomMenu}
              saveNote={SaveNote} />
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
        disabled={false}
        addNewNote={AddNewNote}
        deleteNote={DeleteNote}
        saveNote={SaveNote} />



    </div>
  );

}

export default Home;
