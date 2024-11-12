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
  const gotoTables = useCallback(() => {
    navigate('/jp-tables')
  }, [navigate])
  const gotoNotes = useCallback(() => {
    navigate('/jp-notes')
  }, [navigate])
  const gotoPpt = useCallback(() => {
    navigate('/jp-ppts')
  }, [navigate])
  const gotoN2 = useCallback(() => {
    navigate('/jp-n2s')
  }, [navigate])
  const gotoN2Words = useCallback(() => {
    navigate('/jp-n2-words')
  }, [navigate])
  const gotoDeprive = useCallback(() => {
    navigate('/deprive')
  }, [navigate])
  return (
    <div className='pg-main'>
      <div className='pg-main_link on-click' onClick={gotoDeprive}>
        Deprive
      </div>
      <div className='pg-main_link on-click' onClick={gotoMenu}>
        软考
      </div>
      <div className='pg-main_link on-click' onClick={gotoJapanese}>
        日语
      </div>
      <div className='pg-main_link on-click' onClick={gotoTables}>
        背颂
      </div>
      <div className='pg-main_link on-click' onClick={gotoNotes}>
        语法
      </div>
      <div className='pg-main_link on-click' onClick={gotoPpt}>
        PPT
      </div>
      <div className='pg-main_link on-click' onClick={gotoN2}>
        N2
      </div>
      <div className='pg-main_link on-click' onClick={gotoN2Words}>
        N2 Words
      </div>
    </div>
  )
}
Main.propTypes = {}

export default memo(Main)
