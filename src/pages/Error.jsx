import React, { useState, useEffect /*, Component */ } from 'react';
import { Link } from "react-router-dom"
import sendAsync from '../message-control/renderer'

function Error() {

  return (
    <div className="container">
      <div id="page-title">Error</div>  
   
      <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>Looks like there was an error...</label>
          </div>
          <div className="section-main">
            <ul>
              <li><Link className="App-link" to="/">Link to Home</Link></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Error;
