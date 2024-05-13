import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const gotoBooks = useCallback(() => {
    navigate('/books')
  }, [navigate])
  const gotoMenu = useCallback(() => {
    navigate('/menu')
  }, [navigate])
  return (
    <div className='pg-main'>
      <div className='pg-main_link is-clickable' onClick={gotoBooks}>
        绘本
      </div>
      <div className='pg-main_link is-clickable' onClick={gotoMenu}>
        软考
      </div>
    </div>
  )
}
Main.propTypes = {}

export default memo(Main)
