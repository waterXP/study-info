import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
// import MainRouter from '@/layout/MainRouter'
import Cabinet from '@/pages/Cabinet'
import CabinetPick from '@/pages/CabinetPick'
import CabinetPickCode from '@/pages/CabinetPickCode'
import CabinetPickList from '@/pages/CabinetPickList'
import CabinetSave from '@/pages/CabinetSave'
import CabinetSaveQuery from '@/pages/CabinetSaveQuery'

const ComMap = {
  default: Cabinet,
  pick: CabinetPick,
  'pick-code': CabinetPickCode,
  'pick-list': CabinetPickList,
  save: CabinetSave,
  'save-query': CabinetSaveQuery
}

const App = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [deviceCode, setDeviceCode] = useState('34049E63C6F7')
  const getUserInfo = useCallback(r => {
    setUserInfo(r)
  }, [])
  useEffect(() => {
    if (window.plus) {
      const dCode = window.plus.android.invoke(
        'com.dcp.system.facade.SystemFacade',
        'getDeviceCode'
      )
      setDeviceCode(dCode)
    }
    window.callbackModianAction = result => {
      if (result) {
        if (result.action === 'detect_face') {
          window.alert('人脸识别成功')
          getUserInfo(result)
        } else if (result.action === 'scanqrcode') {
          window.alert('二维码识别成功')
          getUserInfo(result)
        }
      }
    }
    window.callbackOpenDoor = result => {
      if (result) {
        const { status, boardNum, boxNum } = result
        window.alert(
          `${boardNum}-${boxNum}:${status === 'open' ? '打开' : '关闭'}成功`
        )
      } else {
        window.alert('操作失败')
      }
    }
  }, [])
  const [url, setUrl] = useState('')
  const Comp = useMemo(() => ComMap[url] || ComMap.default, [url])
  const onUrl = useCallback(url => {
    setUrl(url)
  }, [])
  return (
    <div className='App'>
      {/* <MainRouter /> */}
      <Comp onUrl={onUrl} userInfo={userInfo} deviceCode={deviceCode} />
    </div>
  )
}

export default memo(App)
