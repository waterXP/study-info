import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const gotoMenu = useCallback(() => {
    navigate('/menu')
  }, [navigate])
  const gotoJapanese = useCallback(() => {
    navigate('/jp')
  }, [navigate])
  return (
    <div className='pg-main'>
      <div className='pg-main_link on-click' onClick={gotoMenu}>
        软考
      </div>
      <div className='pg-main_link on-click' onClick={gotoJapanese}>
        日语
      </div>
    </div>
  )
}
Main.propTypes = {}

export default memo(Main)
