// imports
import React, { useState, useEffect } from 'react';
import sendAsync from '../message-control/renderer';

// components
import Note from '../components/Note'
import BottomMenu from '../components/BottomMenu'

//function App() {
const App = () => {

    // const [message, setMessage] = useState('SELECT * FROM notes;');
    const [response, setResponse] = useState();
    const [tab, setTab] = useState(1)

    const [notes, setNotes] = useState([])
    const [bottomMenuVisible, setBottomMenuVisible] = useState("false")
    const [focussedNoteId, setFocussedNoteId] = useState(null)
    const [saveIcon, setSaveIcon] = useState("cloud")



    useEffect(() => {
        let query = 'SELECT * FROM notes WHERE tab = 1;'

        send(query);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function send(sql) {
        sendAsync(sql).then((result) => {
            console.log(result[0])
            setNotes([]);
            setNotes(result)
        });
    }

    const AddNewNote = (value) => {
        // Insert into db

        try {

            let query =
                `INSERT INTO notes ('order', tab) VALUES (${notes.length + 1}, ${tab});`;
            setResponse(query)

            sendAsync(query).then((result) => {
                console.log("New Insert Result: " + JSON.stringify(result))
                if (!result) {
                    alert("There was an issue creating new note.")
                } else {
                    alert(result)
                }
            });


            // Retrieve new note
            let retriveNewRowQuery = `SELECT max(*) FROM notes WHERE tab = ${tab};`;
            //alert(retriveNewRowQuery)
            sendAsync(retriveNewRowQuery).then((result) => {
                if (!result) return;
                console.log(JSON.stringify(result))
                var newRowToAdd = {
                    id: result.id,
                    title: result.id,
                    content: result.content
                }
                // Append to list
                setNotes(currentNotes => [...currentNotes, newRowToAdd]);

            });
        } catch (error) {
            alert("ERr:" + error)
        }
    }

    const DeleteNote = (value) => {
        //alert(value)
        const newNotesList = notes.filter((item) => item.id !== focussedNoteId);
        setFocussedNoteId(19);
        setNotes(newNotesList)

        var deleteQuery = "";
        sendAsync("").then((result) => {

        })
    };





    const sendNoteIDToParent = (index) => {
        setFocussedNoteId(index);
    };

    const showBottomMenu = (value) => {
        setBottomMenuVisible(value ? "" : "disabled")
    }

    // const SaveNote = (id, title, content) => {
    async function SaveNote(id, title, content) {
        console.log("Saving note: " + id, title, content)
        //setSaveIconColour("orange")
        setSaveIcon("cloud-upload-alt")
        let query =
            `UPDATE notes
            SET title = '${title}', 
            content = '${content}'
            WHERE id = ${focussedNoteId};`;

        console.log(query)
        
        await send(query)
        // sendAsync(query).then((result) => {
        //     if (!result) {
        //         alert("There was an issue saving!")
        //     } else {
        //         console.log(result)
        //     }
        // });
        // var delayInMilliseconds = 1000; //1 second
        // setTimeout(function () {
        //   //your code to be executed after 1 second
        //   setSaveIcon("cloud")
        //   //setSaveIconColour("aqua")
        // }, delayInMilliseconds);
    }

    return (
        <div className="container App">
            <header className="App-header">
                <h1>
                    Standalone application with Electron, React, and
                    SQLite stack.
                </h1>
            </header>
            <article>
                <p>
                    Say <i>ping</i> to the main process.
                </p>
                {/* <input
                    type="text"
                    className="form-control"
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => send(message)}>
                    Send
                </button> */}
                <br />
                <p>Main process responses:</p>
                <br />
                <div>
                    {(response && JSON.stringify(response, null, 2)) ||
                        'No query results yet!'}
                </div>
            </article>
            <hr />

            {notes.map(r =>
                // <Note key={r.id}
                //     id={r.id}
                //     title={JSON.stringify(r.id)}
                //     content={r.content}
                //     onClick={() => DeleteNote(r.id)}
                // />
                <Note key={r.id}
                    id={r.id}
                    title={JSON.stringify(r.id)}
                    content={r.content}
                    sendNoteIDToParent={sendNoteIDToParent}
                    showBottomMenu={showBottomMenu}
                    saveNote={SaveNote} />
            )}
            <BottomMenu
                id={focussedNoteId}
                disabled={bottomMenuVisible}
                addNewNote={AddNewNote}
                deleteNote={DeleteNote}
                saveNote={SaveNote} />

        </div>
    )
}

export default App;
