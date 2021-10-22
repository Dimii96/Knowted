// imports
import React, { useState, useEffect /*, Component */} from 'react';
import sendAsync from '../message-control/renderer'
import BottomMenu from '../components/BottomMenu'

// components
import Note from '../components/Note'
import SaveBar from '../components/SaveBar'


const Home = () => {

    const [notes, setNotes] = useState([]);
    const [test, setTest] = useState("Notes");
    const [tab] = useState(1)
    const [focussedNoteId, setFocussedNoteId] = useState(null)
    const [noteHasFocus, setNoteHasFocus] = useState(false)
    // const [noteButtonsDisabled] = useState(false)

    
    useEffect(() => {
      LoadTab();
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
      
    //logger.trace("Entering cheese testing");
    // Init load of notes
    async function LoadTab() {
      console.log("LOAD PAGE: " + new Date )
      let query = `SELECT * FROM notes WHERE tab = ${tab} ORDER BY [order] ASC`;
      await sendAsync(query).then((result) => {
        if (result)
        //console.log(JSON.stringify(result))
        setNotes(result)
    });
  }
  
  const AddNewNote = () => {
    // Insert into db
    let query = `
    INSERT INTO notes (content, 'order', tab)
    VALUES ('', ${notes.length + 1}, ${tab});`;
    sendAsync(query).then((result) => {
      console.log("New Insert Result: " + JSON.stringify(result))
      if (!result) {
        alert("There was an issue creating new note.")
      } else {
        // Retrieve new note
        let retriveNewRowQuery = `SELECT max(*) FROM notes WHERE tab = ${tab};`;
        sendAsync(retriveNewRowQuery).then((result) => {
          if (!result) return;
          console.log(JSON.stringify(result))
          var newRowToAdd = {
            id: result.id,
            order: result.order,
            title: "",
            content: result.content
          }
          // Append to list
          setNotes([notes, newRowToAdd])
        });
      }
      
    });
  }

  const DeleteNote = (event) =>  {    
    event.preventDefault();
    if(focussedNoteId == null) alert("No note is selected to delete!")
    let query = `DELETE FROM notes WHERE id = '${focussedNoteId}';`;
    console.log("Deleting: " + focussedNoteId)
    //if(confirm("Delete note?")) {
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

  const sendNoteIDToParent = (index) => { 
    setFocussedNoteId(index);
  };

  const showBottomMenu = (value) => {
    setNoteHasFocus(value)
  }


  const SaveNote = async (id, title, content) => {
    console.log("Saving note: " + id, title, content)
    //setSaveIconColour("orange")
    let query = 
    `UPDATE notes
    SET title = '${title}', 
    content = '${content}'
    WHERE id = ${focussedNoteId};`;
    
    console.log(query)
    setTest(title + "  ---  " + content )

    //await sendAsync(query)
    
    sendAsync(query).then((result) => {
      if (!result) {
        alert("There was an issue saving!")
      } else { 
        console.log(result)
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
           title={JSON.stringify(r.id)} 
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
