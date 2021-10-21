import React from 'react';
import { Link } from "react-router-dom"

function Settings() {
  return (
    <div className="container">
      <div id="page-title">Settings</div>
      <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>title</label>
          </div>
          <div className="section-main">
            <p>Application settings and options will go here</p>
            <Link className="App-link" to="/">Link to Home</Link>
          </div>
          {/* <div className="section-footer">footer</div> */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
