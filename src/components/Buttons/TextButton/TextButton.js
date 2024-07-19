import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './TextButton.styl'

const TextButton = ({ children, onClick }) =>
  <div
    className='com-buttons-text-button on-click'
    onClick={onClick}
  >
    { children }
  </div>
TextButton.propTypes = {
}

export default memo(TextButton)
