// imports
import React, { useState, useEffect /*, Component */ } from 'react';
import sendAsync, { storeSet, storeGet, storeDelete, storeCount } from '../message-control/renderer'
import BottomMenu from '../components/BottomMenu'

// components
import Note from '../components/Note'
import SaveBar from '../components/SaveBar'


const Home = () => {

  const [notes, setNotes] = useState([]);
  const [test, setTest] = useState(JSON.stringify(new Date));
  const [tab] = useState(1)
  const [focussedNoteId, setFocussedNoteId] = useState(null)
  const [noteHasFocus, setNoteHasFocus] = useState(false)

  useEffect(() => {
    LoadTab();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //logger.trace("Entering cheese testing");
  // Init load of notes
  async function LoadTab() {
    try {
      var notesResult = await storeGet("notes");
      if (notesResult) {
        setNotes(notesResult)
      } else {
        var newNote = [{
          id: 1,
          title: "",
          content: "",
          order: 1,
          tab: 1
        }];
        await storeSet("notes", newNote)
        setNotes(newNote)
      }
    } catch (error) {
      console.log("Woops: " + error)
    }
  }

  const AddNewNote = async () => {
    let notesList = await storeGet("notes");
    console.log(notesList)
    var newNote = {
      id: Math.floor(Math.random() * 2147483647),
      title: "",
      content: "",
      order: 1,
      tab: 1
    }
    notesList.push(newNote)

    let result = await storeSet("notes", notesList)
    //console.log("Saved note: " + result);
    if (result) {
      setNotes(notes => notes.concat(newNote))
      //setNotes(notes, [newNote])
    }
  }

  const DeleteNote = async (event) => {
    event.preventDefault();
    try {

      if (focussedNoteId == null) {
        alert("No note is selected to delete!")
        return;
      }

      var notesList = await storeGet("notes");
      var removeIndex = notesList.map(function (item) { return item.id; }).indexOf(focussedNoteId);
      notesList.splice(removeIndex, 1);
      storeSet("notes", notesList)
      setNotes(notesList)

    } catch (error) {
      console.log("Could not delete " + focussedNoteId + "\n --" + error)
    }


  }

  const sendNoteIDToParent = (index) => {
    setFocussedNoteId(index);
  };

  const showBottomMenu = (value) => {
    setNoteHasFocus(value)
  }


  const SaveNote = async (id, title, content) => {
    var udpatedNote = {
      id, title, content
    }
    let result = await storeSet(id, udpatedNote)
    // console.log("Saved note: " + result);


    // console.log("Saving note: " + id, title, content)


  }


  return (
    <div className="container-fluid mt-2">
      <p>Test: {test}</p>

      {/* <Header title={test} /> */}
      {/* <div className="row m-1">
          <div className="col-12 text-center">
      <NewNoteButton id={null} className="m-1 text-center" />

      </div>
    </div>   */}
      <div id="notes">
        {notes.map(r =>
          <Note key={r.id}
            id={r.id}
            title={r.id + " - " + r.title}
            content={r.content}
            sendNoteIDToParent={sendNoteIDToParent}
            showBottomMenu={showBottomMenu}
            saveNote={SaveNote} />
        )}
      </div>

      <BottomMenu
        id={focussedNoteId}
        noteHasFocus={noteHasFocus}
        disabled={false}
        AddNewNote={AddNewNote}
        deleteNote={DeleteNote}
        saveNote={SaveNote} />

      {/* {
      bottomMenuVisible ?
        <BottomMenu id={focussedNoteId} />
        : null
      } */}

      {/* <SaveBar status={""} /> */}

    </div>
  );

}

export default Home;
