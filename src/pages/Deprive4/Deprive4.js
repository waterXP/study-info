import React, { memo, useState, useCallback } from 'react'
import './Deprive4.styl'
import { Input } from 'antd'
import { copyToClipboard } from '@/utils/tool'
import { printDocs, printLesson } from '@/utils/printDocs'

const { TextArea } = Input

const Deprive4 = () => {
  const [source, setSource] = useState('')
  const [output1, setOutput1] = useState('')
  const [output2, setOutput2] = useState('')
  const onChangeSource = useCallback(({ target: { value } }) => {
    setSource(value)
  }, [])
  const onLesson = useCallback(() => {
    if (source) {
      setOutput1(printLesson(source))
      setOutput2('')
    } else {
      setOutput1('')
      setOutput2('')
    }
  }, [source])
  const onDocs = useCallback(() => {
    if (source) {
      const { word, phrase } = printDocs(source)
      setOutput1(word)
      setOutput2(phrase)
    } else {
      setOutput1('')
      setOutput2('')
    }
  }, [source])
  const copyText1 = useCallback(() => {
    copyToClipboard(output1 || '')
  }, [output1])
  const copyText2 = useCallback(() => {
    copyToClipboard(output2 || '')
  }, [output2])
  return (
    <div className='pg-deprive-4'>
      <div className='pg-deprive-4_top'>
        <TextArea
          className='pg-deprive-4_item'
          value={source}
          onChange={onChangeSource}
        />
      </div>
      <div className='pg-deprive-4_bottom'>
        <div className='pg-deprive-4_text'>
          <div className='pg-deprive-4_value'>{output1}</div>
          <div className='pg-deprive-4_button on-click' onClick={copyText1}>
            Copy
          </div>
        </div>
        <div className='pg-deprive-4_divider' />
        <div className='pg-deprive-4_text'>
          <div className='pg-deprive-4_value'>{output2}</div>
          <div className='pg-deprive-4_button on-click' onClick={copyText2}>
            Copy
          </div>
        </div>
      </div>
      <div className='pg-deprive-4_tap'>
        <div className='pg-deprive-4_r-button on-click' onClick={onLesson}>
          get lesson
        </div>
        <div className='pg-deprive-4_r-button on-click' onClick={onDocs}>
          get docs
        </div>
      </div>
    </div>
  )
}

export default memo(Deprive4)
