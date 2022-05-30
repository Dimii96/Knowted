import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import sendAsync from '../message-control/renderer'

// Components
import EditTabField from '../components/EditTabField';

function Settings(props) {

  const [tinyMCESettings, setTinyMCESettings] = useState([]);
  const [tabList, setTabList] = useState([]);

  useEffect(() => {
    LoadSettings();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Init load of settings
  async function LoadSettings() {

    // // Retrieve Tiny.MCE settings
    // let query = `SELECT * FROM tinymce_options WHERE type = 'toolbar'`;
    // try {
    //   let result = await sendAsync("LoadTinyMCESettings", query);
    //   setTinyMCESettings(result)
    // } catch (error) {
    //   alert("There was an issue retrieving Editor Options.")
    // }

     // Retrieve Tabs
    let query = `SELECT * FROM tabs ORDER BY 'order' ASC;'`;
    try {
      let result = await sendAsync("GetTabs", query);
      setTabList(result.data)
    } catch (error) {
      alert("There was an issue retrieving tab.")
    }
  }

  async function UpdateSetting(id, checked) {

    try {
      let enabled = checked ? 1 : 0;
      let query = `UPDATE tinymce_options SET enabled = ${enabled} WHERE id = ${id}`;
      let result = await sendAsync("UpdateSettings", query)
    } catch (error) {
      console.log("Failed to save setting. Please retry later.")
    }
    finally {
      // Refresh settings
      //LoadSettings()
    }

  }
  // const UpdateTabTitle = async(id, title) => {
  //   window.location.href = "/settings";
  // }

  // const DeleteTab = async(id) => {

  //   try {
  //     console.log("Settings/DeleteTab/" + id);
  //     let deleteTabQuery = 'DELETE FROM tabs WHERE id = ?;';
  //     let result = await sendAsync("DeleteTab", deleteTabQuery, [id])
  //     if(result.status) {
  //       window.location.reload();
  //     } else {
  //       console.log("There was an error deleting the tab.")
  //     }

  //   } catch (error) {

  //   }
  // }
  


  return (
    <div className="container">
      <div id="page-title">Settings</div>

      <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>Tabs</label>
          </div>
          <div className="section-main mx-3">
              {tabList.map(t => 
               <EditTabField key={t.id} tab={t} /*deleteTab={DeleteTab}*/ updateTabTitle={props.updateTabTitle} />
              )}
              {/* <div className='alert alert-light p-1 m-0'><strong>Note:</strong> Deleted tabs are archived for 7 days before permanatly being removed. You can view and retrive archived tabs <a href='#' className='alert-link'>here</a></div> */}
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
              <li>More application settings and options will go here</li>
              <li>Your notes and note headings (currently unavailable) will automatically save when you click out of the currently active notes box.</li>
              <li><Link className="App-link" to="/">Link to Home</Link></li>
            </ul>
          </div>
        </div>
      </div>


      {/* <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>Customise your notes editor options</label>
          </div>
          <div className="section-main">

            <form className="px-2">
              {tinyMCESettings.map(s =>
                <div key={s.id} className="form-check">
                  <input id={"tinymce-option-" + s.id} className="form-check-input" type="checkbox" defaultChecked={s.enabled} onClick={(e) => UpdateSetting(s.id, e.target.checked)}></input>
                  <label className="form-check-label" htmlFor="flexCheckDefault">{s.description}</label>
                </div>
              )}
            </form>

          </div>
        </div>
      </div> */}


      {/*
      <div className="section">
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
      */}
     


    </div>
  );
}

export default Settings;
