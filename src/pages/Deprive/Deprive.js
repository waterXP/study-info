import React, { memo, useState, useCallback } from 'react'
import './Deprive.styl'
import { Input, message } from 'antd'

const Deprive = () => {
  const [value, setValue] = useState('')
  const onChange = useCallback(({ target: { value } }) => {
    if (typeof value === 'string') {
      setValue(value.replace(/ /g, ''))
    } else {
      setValue('')
    }
  }, [])
  const onPressEnter = useCallback(({ target: { value } }) => {
    if (typeof value === 'string') {
      const text = value.replace(/ /g, '')
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          message.success('已复制')
        })
      } else if (document.execCommand('Copy')) {
        const oInput = document.createElement('input')
        oInput.value = text
        document.body.appendChild(oInput)
        oInput.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        oInput.style.display = 'none'
        message.success('已复制')
      }
    }
  }, [])
  return (
    <div className='pg-deprive'>
      <Input
        className='pg-deprive_input'
        onChange={onChange}
        placeholder='入力してください'
        onPressEnter={onPressEnter}
      />
      <p className='pg-deprive_value'>{value}</p>
    </div>
  )
}

export default memo(Deprive)
