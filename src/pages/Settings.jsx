import React from 'react';
import { Link } from "react-router-dom"

function About() {
  return (
    <div className="container">
      <div id="page-title">Settings</div>
      <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>title</label>
            <small>description</small>
          </div>
          <div className="section-main">
            text here
            <Link className="App-link" to="/">Link to Home</Link>

          </div>
          <div className="section-footer">footer</div>
        </div>
      </div>
    </div>
  );
}

export default About;
