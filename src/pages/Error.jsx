import { eventPropTypes } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/EditorPropTypes';
import React, { useState, useEffect /*, Component */ } from 'react';
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function Error(props) {
  const { message } = useParams();

  useEffect(() => {
    props.updateLoadingClass("");
  }, [])
  return (
    <div className="container">
      <div id="page-title">Oops!</div>  
   
      <div className="section">
        <div className="section-content">
          <div className="section-title subheading px-2">
            <label>Looks like there was an error...</label>
          </div>
          <div className="section-main">
            <ul>
              { (message) ?
                <li>{message}</li>
                : null
              }
              <li><Link className="App-link" to="/">Go to first tab</Link></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Error;
