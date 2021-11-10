import React from 'react';
import PropTypes from 'prop-types'

import '../Main.css'

const Header = ({ title }) => {
  return (
    <header>
      <h1 className="">{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

Header.defaultProps = {
  title: "Task Tracker"
}

export default Header;

// function Header() {
//   return (
//     <div className="section">
//       <div className="section-content">
//         <div className="section-title subheading px-2">
//           <label>title</label>
//           <small>description</small>
//         </div>
//         <div className="section-main">
//           text here
//         </div>
//         <div className="section-footer">footer</div>
//       </div>
//     </div>
//   );
// }

