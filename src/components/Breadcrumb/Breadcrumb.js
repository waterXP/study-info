import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Breadcrumb.styl'
import { useNavigate } from 'react-router-dom'
import TextButton from '@com/Buttons/TextButton'

const Breadcrumb = ({ to = '/', children, noTop, title }) => {
  const navigate = useNavigate()
  const onClick = useCallback(
    e => {
      e.stopPropagation()
      navigate(to)
    },
    [to, navigate]
  )
  const onHome = useCallback(
    e => {
      e.stopPropagation()
      navigate('/menu')
    },
    [to, navigate]
  )
  return (
    <div className='com-breadcrumb'>
      <span className='com-breadcrumb_flag'>&lt;&nbsp;</span>
      {!noTop && (
        <>
          <TextButton onClick={onHome}>首页</TextButton>
          <span>&nbsp;/&nbsp;</span>
        </>
      )}
      <TextButton onClick={onClick}>{children}</TextButton>
      { title && <span>&nbsp;&nbsp;{title}</span>}
    </div>
  )
}
Breadcrumb.propTypes = {}

export default memo(Breadcrumb)
