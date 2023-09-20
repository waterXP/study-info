import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
// import PropTypes from 'prop-types'
import './Wash.styl'
import { Input } from 'antd'
import Breadcrumb from '@com/Breadcrumb'

const { TextArea } = Input

const Wash = () => {
  const [inSpeaking, setInSpeaking] = useState(false)
  const refValue = useRef('')
  useEffect(
    () => () => {
      speechSynthesis.cancel()
    },
    []
  )
  const onInput = useCallback(
    e => {
      refValue.current = e.target.value
    },
    []
  )
  const onVoice = useCallback(
    () => {
      if (inSpeaking) {
        setInSpeaking(false)
        speechSynthesis.cancel()
      } else if (refValue.current) {
        setInSpeaking(true)
        const msg = new SpeechSynthesisUtterance(
          refValue.current
        )
        speechSynthesis.speak(msg)
        msg.addEventListener(
          'end', () => {
            if (refValue.current) {
              msg.text = refValue.current
              speechSynthesis.speak(msg)
            } else {
              setInSpeaking(false)
            }
          }
        )
      }
    },
    [inSpeaking]
  )
  return <div className='pg-wash hide-scroll'>
    <div className='pg-wash_content'>
      <Breadcrumb to={-1}>返回</Breadcrumb>
      <TextArea
        className='pg-wash_text-area'
        onInput={onInput}
        placeholder='请输入文本'
      />
    </div>
    {
      inSpeaking
        ? <div
          className='pg-wash_button is-clickable is-washing'
          type='primary'
          onClick={onVoice}
        >
          停止洗脑
        </div>
        : <div
          className='pg-wash_button is-clickable'
          type='primary'
          onClick={onVoice}
        >
          开始洗脑
        </div>
    }
  </div>
}
Wash.propTypes = {
}

export default memo(Wash)
