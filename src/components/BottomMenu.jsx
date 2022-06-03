// imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderNone } from '@fortawesome/free-solid-svg-icons';


const BottomMenu = ({ id, disabled, addNewNote, deleteNote, saveNote, noteHasFocus }) => {
  
  useEffect(() => {
    // console.log("Has focus:", noteHasFocus)
  }, []);

  // const handleDelete = () => {
  //   deleteNote(id)
  // }

  return (

    <div id="bm-container" className={"row px-3"}>
      <div id="bm-main">

        {/* <div className={"btn btn-outline-dark btn-sm bm-item"}
          onClick={() => saveNote(id)} >
          <FontAwesomeIcon icon="save" />
        </div> */}
        <button className={"btn btn-outline-dark btn-sm bm-item " + disabled}
          onClick={addNewNote} >
          <FontAwesomeIcon icon="plus-circle" />
        </button>

        {(1) ?
          <>
            <div className="bm-item ">
              <FontAwesomeIcon icon="grip-lines-vertical" className="mx-1" />
            </div>

            <button className={"btn btn-outline-dark btn-sm bm-item "}
              onMouseDown={(e) => deleteNote(id)}
              disabled={!noteHasFocus} >
              <FontAwesomeIcon icon="trash" />
            </button>
            {/* <small className="bm-item">{noteHasFocus ? id : "--"}</small> */}
          </>
          : null}
      </div>

      {/* <div id="bm-toggle" className="">
        <div className="btn btn-outline-dark btn-sm bm-item">
          <FontAwesomeIcon icon="chevron-right" />
        </div>
      </div> */}

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



