// imports
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import sendAsync from '../message-control/renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderNone } from '@fortawesome/free-solid-svg-icons';


const SaveBar = ({ status }) => {

  return (
    // TODO: implement saving animation, greenish or orange colour sliding left to right at bottom
    <div id="save-bar"></div>
  );
}

SaveBar.propTypes = {
  title: PropTypes.string
}

SaveBar.defaultProps = {
  title: "Task Tracker"
}

export default SaveBar;



