import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const gotoMenu = useCallback(() => {
    navigate('/menu')
  }, [navigate])
  const gotoJLPT = useCallback(() => {
    navigate('/jlpt')
  }, [navigate])
  const gotoCabinet = useCallback(() => {
    navigate('/cabinet')
  }, [navigate])
  const gotoAI = useCallback(() => {
    navigate('/ai')
  }, [navigate])
  const gotoDeprive3 = useCallback(() => {
    navigate('/deprive3')
  }, [navigate])
  const gotoCardTest = useCallback(() => {
    navigate('/card-game')
  }, [navigate])
  return (
    <div className='pg-main'>
      <div className='pg-main_link on-click' onClick={gotoMenu}>
        软考
      </div>
      <div className='pg-main_link on-click' onClick={gotoJLPT}>
        JLPT
      </div>
      <div className='pg-main_link on-click' onClick={gotoCabinet}>
        Cabinet
      </div>
      <div className='pg-main_link on-click' onClick={gotoAI}>
        AI Test
      </div>
      <div className='pg-main_link on-click' onClick={gotoDeprive3}>
        i18n
      </div>
      <div className='pg-main_link on-click' onClick={gotoCardTest}>
        Card Test
      </div>
    </div>
  )
}
Main.propTypes = {}

export default memo(Main)
