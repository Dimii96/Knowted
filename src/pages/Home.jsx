// imports
import React, { useState, useEffect /*, Component */ } from 'react';
import sendAsync, { storeSet, storeGet, storeDelete, storeCount } from '../message-control/renderer'
import BottomMenu from '../components/BottomMenu'

// components
import Note from '../components/Note'


const Home = () => {

  const [notes, setNotes] = useState([]);
  const [test, setTest] = useState(JSON.stringify(new Date));
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
      let query = `SELECT * FROM notes WHERE tab = ${tab} ORDER BY [order] ASC`;
      await sendAsync(query).then((result) => {
        if (result) setNotes(result)
        //console.log(result)
    });
  }
  
  const AddNewNote = async (value) => {

    // Insert into db
    let query = `
    INSERT INTO notes ('order', tab)
    VALUES (${notes.length + 1}, ${tab});`;
    await sendAsync(query).then((result) => {
      //console.log("New Insert Result: " + JSON.stringify(result))
      if (!result) {
        alert("There was an issue creating new note.")
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
       // Append to list
       setNotes(notes => [...notes, newRowToAdd])
     });
  }

  // const AddNewNote = async () => {
  //   let notesList = await storeGet("notes");
  //   console.log(notesList)
  //   var newNote = {
  //     id: Math.floor(Math.random() * 2147483647),
  //     title: "",
  //     content: "",
  //     order: 1,
  //     tab: 1
  //   }
  //   notesList.push(newNote)

  //   let result = await storeSet("notes", notesList)
  //   //console.log("Saved note: " + result);
  //   if (result) {
  //     setNotes(notes => notes.concat(newNote))
  //     //setNotes(notes, [newNote])
  //   }
  // }

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


  const SaveNote = (id, title, content) => {
    //console.log("Saving note: " + id)
    //setSaveIconColour("orange")
    setSaveIcon("cloud-upload-alt")
    let query = 
    `UPDATE notes
    SET title = '${title}', 
    content = '${content}'
    WHERE id = ${id};`;
    
    //console.log(query)

    sendAsync(query).then((result) => {
      if (!result) {
        alert("There was an issue saving!")
      } else { 
        //console.log("Saved: " + result)
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



    </div>
  ); 

}

export default Home;
