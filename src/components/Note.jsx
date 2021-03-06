// imports
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import sendAsync from "../message-control/renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Editor } from "@tinymce/tinymce-react";

// import tinymce from "tinymce";

const Note = ({
  id,
  title,
  content,
  editable,
  sendNoteIDToParent,
  showBottomMenu,
  saveNote,
  editorOptions,
}) => {
  const [contentState, setContentState] = useState(content);
  const [titleState, setTitleState] = useState(title);
  const [toolbar, setToolbar] = useState("");
  const [enabledd, setEnabled] = useState(true);

  // useEffect(() => {
  //   if (editorOptions) {
  //     setToolbar(editorOptions);
  //   } else {
  //     // Default to all
  //     setToolbar(
  //       "undo redo | formatselect | " +
  //         "bold italic backcolor | alignleft aligncenter " +
  //         "alignright alignjustify | bullist numlist outdent indent | " +
  //         "removeformat | help"
  //     );
  //   }
  // }, []);
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
    showBottomMenu(true);
    sendNoteIDToParent(id);
  };

  const SaveNote = (event) => {
    setContentState(event.currentTarget.innerText);
    saveNote(id, titleState, event.currentTarget.innerText);
    showBottomMenu(false);
    // sendNoteIDToParent(null);
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("XZ: " + editorRef.current.getContent());
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
          {/* <input
            type="text"
            className="note-title"
            value={titleState}
            onBlur={SaveNote}
            hidden
          /> */}

          <div
            role="textbox"
            // contentEditable={true}
            contentEditable="plaintext-only"
            suppressContentEditableWarning={true}
            className="note-content"
            value={contentState ? contentState : ""}
            //onKeyDown={e => setContentState(e.target.innerHTML)}
            onInput={(e) => {
              //SaveNote;
              //this.cursor = e.target.selectionStart;
            }}
            onBlur={SaveNote}
            onFocus={handleFocus}
          >
            {contentState}
          </div>

          {/* https://stackoverflow.com/questions/46000544/react-controlled-input-cursor-jumps */}
          {/* <Editor 
             id={"note-" + id}
             className="note"
             //tinymceScriptSrc={process.env.PUBLIC_URL + '/js/tinymce/tinymce.min.js'}
             apiKey="oskp6rm7cjwp39oz8g7hpalw870n128tgax61gh0sxnod2yy"
             //onInit={(evt, editor) => editorRef.current = editor}
             initialValue={contentState}
             init={{
               minheight: 200,
               menubar: false,
               resize: false,
               plugins: 
               [ 
                 ' autoresize'
                 // 'autoresize advlist autolink lists link image charmap print preview anchor',
                 // 'searchreplace visualblocks code fullscreen',
                 // 'insertdatetime media table paste code help wordcount'
               ],
               toolbar: toolbar,
               toolbar_location: 'right',
               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
               autoresize_bottom_margin: 0,
               branding: true,
               statusbar: false,
               //inline: true,
               count: false
             }}
             onKeyUp={e => setContentState(e.currentTarget.innerText)}
             onFocus={handleFocus}
             onBlur={SaveNote}
           /> */}
        </div>
      </div>
    </div>
  );
};

Note.propTypes = {
  title: PropTypes.string,
};

Note.defaultProps = {
  title: "Note Default",
};

export default Note;
