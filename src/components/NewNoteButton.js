// imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const NewNoteButton = ({ id }) => {


  return (
    <button
      key={"btn-" + id}
      className="btn btn-outline-dark btn-sm"
    //onClick={() => AddNewNote()}
    >
      <FontAwesomeIcon className="" icon="plus-circle" />
    </button>
  );
}

NewNoteButton.propTypes = {
  title: PropTypes.string
}

NewNoteButton.defaultProps = {
  title: "Task Tracker"
}

export default NewNoteButton;



