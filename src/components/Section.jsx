// imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e


const Section = ({ id, title, content }) => {
  const [response, setResponse] = useState(content);
  const [saveIcon, setSaveIcon] = useState("cloud")
  const [saveIconColour] = useState("aqua")
  const [test, setTest] = useState();


  async function SaveNote() {

    //setSaveIconColour("orange")
    setSaveIcon("cloud-upload-alt")

    let query = `UPDATE notes SET content = '${response}' WHERE id = ${id};`;
    setTest(query)

    await sendAsync("SaveNote", query).then((result) => {
      if (!result) {
        alert("There was an issue saving!")
      }
    });

    var delayInMilliseconds = 100; //1 second
    await setTimeout(function () {
      //your code to be executed after 1 second
      setSaveIcon("cloud")
      //setSaveIconColour("aqua")
    }, delayInMilliseconds);
  }

  async function DeleteNote() {

    let query = `DELETE FROM notes WHERE id = '${id}';`;
    //if(confirm("Delete note?")) {
    await sendAsync("DeleteNote", query).then((result) => {
      if (!result) {
        alert("There was an issue deleting!")
      } else {
        alert("Note Deleted!")
      }
    });

    //}
  }

  const handleKeyDown = (event) => {
    event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    console.log(charCode)
    if ((event.ctrlKey || event.metaKey) && charCode === 's') {
      //alert("CTRL+S Pressed");
      SaveNote();
    } else if ((event.ctrlKey || event.metaKey) && charCode === 'c') {
      alert("CTRL+C Pressed");
    } else if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
      alert("CTRL+V Pressed");
    }
  }


  return (
    <div className="section">
      {/* <div className="section-header">
        <div className="section-title px-2">
          {id}
        </div>
      </div> */}


      <div className="section-content">
        <div className="section-main p-0">
          {/* <input type="text" className="col-12" readOnly value={test} /> */}
          <textarea
            value={response ? response : ""}
            onKeyUp={handleKeyDown}
            onChange={({ target: { value } }) => setResponse(value)}
          />
        </div>

        {/* <div className="section-footer text-right">
          <FontAwesomeIcon icon={saveIcon} className="m-1" onClick={() => SaveNote()} />
          <FontAwesomeIcon icon="trash" className="m-1" onClick={() => DeleteNote()} />

          {/ * <button className="btn btn-light red btn-sm" onClick={() => DeleteNote()}>
            <FontAwesomeIcon icon="trash" />
          </button> * /}

        </div> */}
      </div>
    </div >
  );
}

Section.propTypes = {
  title: PropTypes.string
}

Section.defaultProps = {
  title: "Task Tracker"
}

export default Section;



