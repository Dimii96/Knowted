// imports
import React from 'react';
import { Link } from "react-router-dom"

// import React, { useState } from 'react';
import PropTypes from 'prop-types'
// import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBorderNone } from '@fortawesome/free-solid-svg-icons';


const BottomMenu = ({ id, disabled, addNewNote, deleteNote, saveNote }) => {

  const handleDelete = () => {
    deleteNote(id)
  }

  return (
    <div id="bm-container" className={"row px-3"}>

      <div id="bm-main" className="">

        <div className="bm-item">
          {id}
        </div>

        {/* <button type="button" className={"btn btn-outline-dark btn-sm bm-item"}
            onClick={AddNewNote}
            disabled={disabled} >
            <FontAwesomeIcon icon="plus-circle" />
          </button> */}

        <div className={"btn btn-outline-dark btn-sm bm-item " + disabled}
          onClick={() => addNewNote(id)} >
          <FontAwesomeIcon icon="plus-circle" />
        </div>

        <button type="button" className={"btn btn-outline-dark btn-sm bm-item"}
          disabled={disabled} >
          <FontAwesomeIcon icon="chevron-down" />
        </button>

        <div className="bm-item ">
          <FontAwesomeIcon icon="grip-lines-vertical" />
        </div>
        <button type="button" className={"btn btn-outline-dark btn-sm bm-item"}
          onClick={deleteNote}
          disabled={disabled} >
          <FontAwesomeIcon icon="trash" />
        </button>

        <div className={"btn btn-outline-dark btn-sm bm-item " + disabled}
          onClick={handleDelete} >
          <FontAwesomeIcon icon="trash" />
        </div>

        <div id="bm-toggle" className="">

          {/* <div className="btn btn-outline-dark btn-sm bm-item ">
          <FontAwesomeIcon icon="chevron-right" />
        </div> */}
          <div className={"btn btn-outline-dark btn-sm bm-item"}
            onClick={addNewNote}>
            <FontAwesomeIcon icon="plus-circle" />
          </div>
          <Link className={"btn btn-outline-dark btn-sm bm-item"}
            to="/settings" >
            <FontAwesomeIcon icon="wrench" />
          </Link>

          <div className="bm-item">
            {id >= 0 ? id : "n/a"}
          </div>
        </div>

      </div>
    </div>
  )
}


BottomMenu.propTypes = {
  title: PropTypes.string
}

BottomMenu.defaultProps = {
  title: "Task Tracker"
}

export default BottomMenu;



