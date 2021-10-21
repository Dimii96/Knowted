// imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderNone } from '@fortawesome/free-solid-svg-icons';


const BottomMenu = ({ id, disabled, AddNewNote, deleteNote, saveNote }) => {
  
  return (

    <div id="bm-container" className={"row px-3" }>

      <div id="bm-main" className="">

        <div className="bm-item">
          {id}
        </div> 

        <div className={"btn btn-outline-dark btn-sm bm-item"}
          onClick={() => saveNote(id)} >
          <FontAwesomeIcon icon="save" />
        </div>

        <div className={"btn btn-outline-dark btn-sm bm-item " + disabled}
        onClick={AddNewNote} >
          <FontAwesomeIcon icon="plus-circle" />
        </div>

        <div className="bm-item ">
          <FontAwesomeIcon icon="grip-lines-vertical" className="mx-1" />
        </div>

        <div className={"btn btn-outline-dark btn-sm bm-item " + disabled} 
        onClick={deleteNote} >
        
          <FontAwesomeIcon icon="trash" />
        </div>

      </div>

      {/* <div id="bm-toggle" className="">
        <div className="btn btn-light btn-sm bm-item ">
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



