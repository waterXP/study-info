import React, { memo, useState, useEffect, useCallback, useRef } from 'react'
// import PropTypes from 'prop-types'
import './Wash.styl'
import { Input, Button } from 'antd'
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
    <div className='pg-wash--content'>
      <Breadcrumb to={-1}>返回</Breadcrumb>
      <TextArea
        className='pg-wash--text-area'
        onInput={onInput}
        placeholer='请输入文本'
      />
      <Button
        className='pg-wash--button'
        type='primary'
        onClick={onVoice}
      >
        开始洗脑
      </Button>
    </div>
  </div>
}
Wash.propTypes = {
}

export default memo(Wash)
