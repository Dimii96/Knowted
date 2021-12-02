import React, { useState, useEffect /*, Component */ } from 'react';
import { Link } from "react-router-dom"
import sendAsync from '../message-control/renderer'

function Settings() {

  const [tinyMCESettings, setTinyMCESettings] = useState([]);


  useEffect(() => {
    LoadSettings();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Init load of settings
  async function LoadSettings() {

    // Retrieve Tiny.MCE settings
    let query = `SELECT * FROM tinymce_options WHERE type = 'toolbar'`;
    try {
      let result = await sendAsync(query); 
      setTinyMCESettings(result)
    } catch (error) {
      alert("There was an issue retriving Editor Options: \n" + error)
    }
  }


  async function UpdateSetting(id, checked) {

    try {
      let enabled = checked ? 1 : 0;
      //console.log(id, checked)
      let query = `UPDATE tinymce_options SET enabled = ${enabled} WHERE id = ${id}`;
      console.log(query)
      let result = await sendAsync(query)
      console.log(result)
    } catch (error) {
      console.log("Failed to save setting. Please retry later.")
      console.log(error)
    }
    finally {
      // Refresh settings
      //LoadSettings()
    }

  }


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


      <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>Customise your notes editor options</label>
          </div>
          <div className="section-main">

            <form>
              {tinyMCESettings.map(s =>
                <div key={s.id} className="form-check">
                  <input id={"tinymce-option-" + s.id} className="form-check-input" type="checkbox" defaultChecked={s.enabled} onClick={(e) => UpdateSetting(s.id, e.target.checked)}></input>
                  <label className="form-check-label" htmlFor="flexCheckDefault"> {s.option} - {s.enabled} </label>
                </div>
              )}
            </form>


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
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Light
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Dark
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled />
                  <label className="form-check-label" htmlFor="exampleRadios3">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>Tips and Help</label>
          </div>
          <div className="section-main">
            <ul>
              <li>Your notes and not headings will automatically save when you click out of the currently active notes box.</li>
              <li>Stuff</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Settings;
