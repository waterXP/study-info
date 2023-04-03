import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './Title.styl'

const Title = ({ children }) =>
  <div className='com-title'>{ children }</div>
Title.propTypes = {
}

export default memo(Title)
