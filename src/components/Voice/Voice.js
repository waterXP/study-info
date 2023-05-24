import React, { memo, useMemo, useState, useCallback, useEffect } from 'react'
// import PropTypes from 'prop-types'
import './Voice.styl'

const Voice = ({ messages }) => {
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
      if (inSpeaking) {
        setInSpeaking(false)
        speechSynthesis.cancel()
      } else {
        setInSpeaking(true)
        const msg = new SpeechSynthesisUtterance(
          messages.join('\n')
        )
        speechSynthesis.speak(msg)
        msg.addEventListener(
          'end', () => {
            // setInSpeaking(false)
            speechSynthesis.speak(msg)
          }
        )
      }
    },
    [inSpeaking, messages]
  )
  if (showVoice) {
    return <div className='com-voice is-clickable' onClick={onClick}>
      voice
    </div>
  }
  return null
}
Voice.propTypes = {
}

export default memo(Voice)
