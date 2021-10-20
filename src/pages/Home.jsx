// imports
import React, { useState, useEffect } from 'react';
import sendAsync from '../message-control/renderer'
import NewNoteButton from '../components/NewNoteButton'
import BottomMenu from '../components/BottomMenu'
// components
// import Header from '../components/Header'
import Section from "../components/Section"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {

  const [content, setContent] = useState([]);
  // const [test, setTest] = useState();
  const [tab] = useState(1)




  useEffect(() => {
    LoadTab();


    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //logger.trace("Entering cheese testing");
  // Init load of notes
  async function LoadTab() {
    let query = `SELECT * FROM notes WHERE tab = ${tab} ORDER BY [order] ASC`;
    await sendAsync(query).then((result) => {
      if (result)
        //console.log(JSON.stringify(result))
        setContent(result)

    });
    // setTest(content.length)  
  }

  function AddNewNote() {

    // Insert into db
    let query = `
    INSERT INTO notes ('order', tab)
    VALUES (${content.length + 1}, ${tab});`;
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
            title: "default",
            content: result.content
          }
          // Append to list
          //setContent(content => content.concat(newRowToAdd))
          setContent([content, newRowToAdd])
        });
      }

    });

    // <BottomMenu id={3}/>



  }

  return (
    <div className="container-fluid mt-2">
      {/* <Header title="title" /> */}
      <BottomMenu id={83} />

      {/* <Header title={test} /> */}
      {/* <div className="row m-1">
          <div className="col-12 text-center">
      <NewNoteButton id={null} className="m-1 text-center" />

      </div>
    </div>   */}
      <div id="notes">
        {content.map(r =>
          <Section key={r.id} id={r.id} title={JSON.stringify(r.id)} content={r.content} />
        )}
      </div>





    </div >
  );
}

export default Home;
