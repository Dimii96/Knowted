// imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const BottomMenu = ({ id, disabled, addNewNote, deleteNote, noteHasFocus }) => {
  
  return (

    <div id="bm-container" className={"row px-3"}>
      <div id="bm-main">
        <button className={"btn btn-outline-dark btn-sm bm-item " + disabled}
          onClick={addNewNote} >
          <FontAwesomeIcon icon="plus-circle" />
        </button>

          <>
            <div className="bm-item ">
              <FontAwesomeIcon icon="grip-lines-vertical" className="mx-1" />
            </div>
            <button className={"btn btn-outline-dark btn-sm bm-item "}
              onMouseDown={(e) => deleteNote(id)}
              disabled={!noteHasFocus} >
              <FontAwesomeIcon icon="trash" />
            </button>
          </>
      </div>

    </div>
  );
}

BottomMenu.propTypes = {
  title: PropTypes.string
}

BottomMenu.defaultProps = {
  title: "Task Tracker"
}

export default BottomMenu;



