// imports
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Editor } from '@tinymce/tinymce-react';


const Section = ({ id, title, content, sendNoteIDToParent, showBottomMenu, saveNote }) => {
  const [contentState, setContentState] = useState(content);
  const [titleState, setTitleState] = useState(title);
  const [toolbar, setToolbar] = useState('undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help');
  const [enabledd, setEnabled] = useState(true)
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

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


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
          />

          <Editor
            apiKey=""
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={contentState}
            init={{
              height: 800,
              menubar: false,
              plugins: [
                'autoresize advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: toolbar,
              toolbar_location: 'bottom',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              autoresize_bottom_margin: 0,
              branding: false,
            }}
            // onKeyUp={e => setContentState(e.target.innerText)}
            onFocus={handleFocus}
            onBlur={SaveNote}
          />
        </div>
        {/* <textarea
            className="note-content"
            value={contentState ? contentState : ""}sf
            // onKeyUp={handleKeyDown}
            onFocus={handleFocus}
            onBlur={SaveNote}
            //onChange={e => blah(e.target.value)}sadf
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
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string
}

Section.defaultProps = {
  title: "Task Tracker Default"
}

export default Section;



