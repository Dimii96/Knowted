// imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e


const Section = ({ id, title, content, sendNoteIDToParent, showBottomMenu, saveNote  }) => {
  const [response, setResponse] = useState(content);
  // const [saveIcon, setSaveIcon] = useState("cloud")
  // const [saveIconColour] = useState("aqua")
  const [test, setTest] = useState();


  // const handleKeyDown = (event) => {
    
  //   event.preventDefault();
  //   saveNote(response);
  //   let charCode = String.fromCharCode(event.which).toLowerCase();
  //   console.log("Char", charCode)
  //   if ((event.ctrlKey || event.metaKey) && charCode === 's') {
  //     saveNote("sdf");
  //   } else if ((event.ctrlKey || event.metaKey) && charCode === 'c') {
  //     alert("CTRL+C Pressed");
  //   } else if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
  //     alert("CTRL+V Pressed");
  //   }
  // }

  const handleFocus = (event) => {
    showBottomMenu(true)
    sendNoteIDToParent(id);
  }

  
  const handleBlur = (event) => {
    saveNote(id, response);
    // showBottomMenu(false)
    // sendNoteIDToParent(null);
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
            // onKeyUp={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            //onChange={e => blah(e.target.value)}
            onChange={e => setResponse(e.target.value)}
            //onChange={({ target: { value } }) => { setResponse(value)} }
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



