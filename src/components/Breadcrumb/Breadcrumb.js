import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Breadcrumb.styl'
import { useNavigate } from 'react-router-dom'
import TextButton from '@com/Buttons/TextButton'

const Breadcrumb = ({ to = '/', children }) => {
  const navigate = useNavigate()
  const onClick = useCallback(
    e => {
      e.stopPropagation()
      navigate(to)
    },
    [to, navigate]
  )
  return <div className='com-breadcrumb' onClick={onClick}>
    <span>&lt;&nbsp;</span>
    <TextButton>{ children }</TextButton>
  </div>
}
Breadcrumb.propTypes = {
}

export default memo(Breadcrumb)
