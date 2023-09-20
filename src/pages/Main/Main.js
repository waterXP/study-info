import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const gotoBooks = useCallback(
    () => {
      navigate('/books')
    },
    [navigate]
  )
  const gotoOverview = useCallback(
    () => {
      navigate('/overview')
    },
    [navigate]
  )
  return <div className='pg-main'>
    <div className='pg-main_link is-clickable' onClick={gotoBooks}>绘本</div>
    <div className='pg-main_link is-clickable' onClick={gotoOverview}>软考</div>
  </div>
}
Main.propTypes = {
}

export default memo(Main)
