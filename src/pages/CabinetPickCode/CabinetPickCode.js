import React, { memo, useCallback } from 'react'
import './CabinetPickCode.styl'
import { message } from 'antd'
import CabinetBody from '@/components/CabinetBody'
import CabinetInput from '@/components/CabinetInput'
import { takeExpressFromCode } from '@/api/expressLocker'

const CabinetPickCode = ({ onUrl, userInfo, setLoading, updateCodePick, handleOpen }) => {
  const handleFullChange = useCallback(
    values => {
      setLoading(true)
      takeExpressFromCode({ takeCode: values.join('') })
        .then(d => {
          if (d.code === 200 && d.data) {
            updateCodePick(d.data)
            handleOpen('code-pick', { ...d.data })
            // onUrl('code-result')
          } else {
            message.error('取件码不正确')
          }
        })
        .catch(e => {
          message.error(e.msg || '取件码不正确')
        })
        .finally(() => {
          setLoading(false)
        })
      // if (values.join('') === '8888') {
      //   onUrl('pick-list')
      // } else {
      //   message.error('取件码不正确')
      // }
    },
    [onUrl]
  )
  return (
    <CabinetBody delay={90} onUrl={onUrl} userInfo={userInfo}>
      <div className='pg-cabinet-pick-code'>
        <div className='pg-cabinet-pick-code_body'>
          <CabinetInput title='输入取件码' onFullChange={handleFullChange} />
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPickCode)
