import React, { memo, useMemo, useState, useCallback, useEffect } from 'react'
// import PropTypes from 'prop-types'
import './Voice.styl'

const Voice = ({ text }) => {
  const [inSpeaking, setInSpeaking] = useState(false)
  const showVoice = useMemo(
    () => {
      if (SpeechSynthesisUtterance && speechSynthesis) {
        return true
      }
      return false
    },
    []
  )
  useEffect(
    () => () => {
      speechSynthesis.cancel()
    },
    []
  )
  const onClick = useCallback(
    e => {
      e.stopPropagation()
      navigator.clipboard.writeText(text)
      if (inSpeaking) {
        setInSpeaking(false)
        speechSynthesis.cancel()
      } else {
        setInSpeaking(true)
        const msg = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(msg)
        msg.addEventListener(
          'end', () => {
            speechSynthesis.speak(msg)
          }
        )
      }
    },
    [inSpeaking, text]
  )
  if (showVoice) {
    return <span className='com-read on-click' onClick={onClick}>
      { children }
    </span>
  }
  return null
}
Voice.propTypes = {
}

export default memo(Voice)
