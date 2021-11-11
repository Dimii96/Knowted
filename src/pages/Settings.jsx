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
        </div>
      </div>

      <div className="section" hidden>
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>Accessibility (Not functional yet)</label>
          </div>
          <div className="section-main">

            <div className="row  px-0">
              <div className="col-12">
                <label className="form-label bold">Font Size: 12px</label>
              </div>
              <div className="col-12 col-sm-8 col-md-8 col-lg-6">
                <input type="range" className="form-range " min="0" max="5" defaultValue="3" id="customRange2" />
              </div>

            </div>

            <div className="row px-0">
              <div className="col-12">
                <label className="form-label bold">Theme</label>
              </div>
              <div className="col-12 col-sm-8 col-md-8 col-lg-6">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked/>
                  <label className ="form-check-label" htmlFor="exampleRadios1">
                  Light
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                  <label className ="form-check-label" htmlFor="exampleRadios2">
                  Dark
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled/>
                  <label className ="form-check-label" htmlFor="exampleRadios3">
                  Other
                  </label>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>


    </div>
  );
}

export default Settings;
