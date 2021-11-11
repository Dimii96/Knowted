// imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Section = ({ id, title, content, sendNoteIDToParent, showBottomMenu, saveNote }) => {
  const [contentState, setContentState] = useState(content);
  const [titleState, setTitleState] = useState(title);
  // const [saveIcon, setSaveIcon] = useState("cloud")
  // const [saveIconColour] = useState("aqua")

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

  const handleFocus = () => {
    showBottomMenu(true)
    sendNoteIDToParent(id);
  }

  const SaveNote = () => {
    saveNote(id, titleState, contentState);
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
          <input
            type="text"
            className="note-title"
            value={titleState}
            onBlur={SaveNote}
            onFocus={handleFocus}
            onChange={e => setTitleState(e.target.value)}
          />
          <textarea
            className="note-content"
            value={contentState ? contentState : ""}
            // onKeyUp={handleKeyDown}
            onFocus={handleFocus}
            onBlur={SaveNote}
            //onChange={e => blah(e.target.value)}
            onChange={e => setContentState(e.target.value)}
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
  title: "Task Tracker Default"
}

export default Section;



