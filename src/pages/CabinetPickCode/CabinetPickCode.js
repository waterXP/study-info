import React, { memo, useCallback } from 'react'
import './CabinetPickCode.styl'
// import { message } from 'antd'
// import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'
import CabinetInput from '@/components/CabinetInput'

const CabinetPickCode = () => {
  // const navigate = useNavigate()
  const handleFullChange = useCallback(
    () => {}, []
    // values => {
    //   if (values.join('') === '8888') {
    //     navigate('/pick-list')
    //   } else {
    //     message.error('取件码不正确')
    //   }
    // },
    // [navigate]
  )
  return (
    <CabinetBody className='pg-cabinet-pick-code' delay={90}>
      <CabinetInput title='输入取件码' onFullChange={handleFullChange} />
    </CabinetBody>
  )
}

export default memo(CabinetPickCode)
