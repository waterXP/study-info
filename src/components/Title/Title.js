import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './Title.styl'

const Title = ({ children, intro }) => (
  <div className='com-title'>
    {children}
    {intro && <p className='com-title_intro'>{intro}</p>}
  </div>
)
Title.propTypes = {}

export default memo(Title)
