// imports
import React, { useState, useEffect } from 'react';

// src: https://codepen.io/Alessia/pen/WBOVNN
export default function CharacterCounter (props) {
  
    const [r, setR] = useState(12);
    const [circleLength, setCircleLength] = useState(2*Math.PI*r);
    const [twitterBlue] = useState("rgb(29, 161, 242)");
    const [ringStyle, setRingStyle] = useState({});
    const [charLimit, setCharLimit] = useState(10001)

    useEffect(() => {
        styleRing();
    }, [props.numChar])

   function styleRing(){
        let colored = (circleLength*props.numChar)/charLimit;
        let gray = circleLength - colored > 0 ? circleLength - colored : 0;
        
        setRingStyle({
            stroke: (charLimit - props.numChar) <= 0 ? "red" : 
                   (charLimit - props.numChar) <= (50) ? "orange" : 
                   twitterBlue,
            strokeDasharray : `${colored}  ${gray}`
          });
      }

  return (
            <>
    <div id="CharacterCounter" className='bm-item'>
        <svg>
            <circle id="gray" cx="50%" cy="50%" r="10"></circle>
            <circle id="colored" cx="50%" cy="50%" r="10" 
            style={ringStyle}></circle>
        </svg>
        <span>{props.numChar}</span>
        </div>
        {(props.numChar >= charLimit) ?
            <small className='bm-item red'>Limit Exceeded. Cannot Save Note</small>
        : null }
    </>
    
  );
}