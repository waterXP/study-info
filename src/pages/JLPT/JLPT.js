import React, { memo, useCallback } from 'react'
import './JLPT.styl'
import { useNavigate } from 'react-router-dom'

const JLPT = () => {
  const navigate = useNavigate()
  const gotoDeprive = useCallback(() => {
    navigate('/deprive')
  }, [navigate])
  const gotoDeprive2 = useCallback(() => {
    navigate('/deprive2')
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
  const gotoN2Exec = useCallback(() => {
    navigate('/jp-exec')
  }, [navigate])
  const gotoN2Listens = useCallback(() => {
    navigate('/jp-listens')
  }, [navigate])
  const gotoN2Grammars = useCallback(() => {
    navigate('/jp-grammars')
  }, [navigate])
  const gotoN2GrammarsExec = useCallback(() => {
    navigate('/jp-grammars-exec')
  }, [navigate])
  const gotoDeprive4 = useCallback(() => {
    navigate('/deprive4')
  }, [navigate])
  return (
    <div className='pg-jlpt'>
      <div className='pg-jlpt_content'>
        <div className='pg-jlpt_item on-click' onClick={gotoDeprive}>
          Deprive
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoDeprive2}>
          Deprive2
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoJapanese}>
          日语
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoTables}>
          背颂
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoNotes}>
          语法
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoPpt}>
          PPT
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoN2}>
          N2
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoN2Words}>
          N2 Words
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoN2Exec}>
          N2 Exec
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoN2Listens}>
          N2 Listens
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoN2Grammars}>
          N2 Grammars
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoN2GrammarsExec}>
          N2 Grammars Exec
        </div>
        <div className='pg-jlpt_item on-click' onClick={gotoDeprive4}>
          {/* https://jp.hujiang.com/ */}
          From hujiang
        </div>
      </div>
    </div>
  )
}

export default memo(JLPT)
