import React from 'react';
import PropTypes from 'prop-types'

import '../Main.css'

const Footer = ({ title }) => {

  return (
    <div id="footer" className="container-fluid">
      <div className="row">
        <div className="col">{title}: 10</div>
        <div className="col">Col: 1</div>
        <div className="col">Char: 134</div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  title: PropTypes.string
}

Footer.defaultProps = {
  title: "Lines"
}

export default Footer;


