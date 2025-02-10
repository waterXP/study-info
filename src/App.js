import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo
} from 'react'
// import MainRouter from '@/layout/MainRouter'
import { Spin, message } from 'antd'
import Cabinet from '@/pages/Cabinet'
import CabinetPick from '@/pages/CabinetPick'
import CabinetPickCode from '@/pages/CabinetPickCode'
import CabinetPickList from '@/pages/CabinetPickList'
import CabinetSave from '@/pages/CabinetSave'
import CabinetSaveQuery from '@/pages/CabinetSaveQuery'
import { initAndroid, checkFace, openLocker } from '@/api/android'
import { saveExpress } from '@/api/expressLocker'

const ComMap = {
  default: Cabinet,
  pick: CabinetPick,
  'pick-code': CabinetPickCode,
  'pick-list': CabinetPickList,
  save: CabinetSave,
  'save-query': CabinetSaveQuery
}

const App = () => {
  const refStatus = useRef('save-query')
  const refOpenParams = useRef(null)
  const [userInfo, setUserInfo] = useState(null)
  const [deviceCode, setDeviceCode] = useState('34049E63C6F7')
  const [doorInfo, setDoorInfo] = useState(null)
  const [url, setUrl] = useState('')
  const updateUserInfo = useCallback(userInfo => {
    setUserInfo(userInfo)
    console.log('update user info')
    if (refStatus.current === 'save-query') {
      setUrl('save-query')
    } else if (refStatus.current === 'pick-list') {
      setUrl('pick-list')
    }
  }, [])
  const afterDoorOperate = useCallback(result => {
    setDoorInfo(result)
    if (result && refStatus.current === 'save') {
      saveExpress(refOpenParams.current).then(d => {
        if (d.code === 200) {
          setUrl('save')
        }
      })
    }
  }, [])
  useEffect(() => {
    initAndroid(setDeviceCode, updateUserInfo, afterDoorOperate)
  }, [])
  const Comp = useMemo(() => ComMap[url] || ComMap.default, [url])
  useEffect(() => {
    if (Comp === ComMap.default) {
      setUserInfo(null)
    }
  }, [Comp])
  const onUrl = useCallback(url => {
    setUrl(url)
  }, [])
  const handleFace = useCallback(status => {
    refStatus.current = status
    if (window.plus) {
      checkFace()
    } else {
      console.log('b')
      setUserInfo({
        personId: '1821',
        personName: 'tao'
      })
      setUrl(status)
    }
  }, [])
  console.log('url', url)
  console.log(Comp)
  const handleOpen = useCallback(
    (keyword, receiver, box) => {
      console.log(keyword, receiver, box)
      if (userInfo) {
        refStatus.current = keyword
        const { userId: takeUserId, userName: takeUserName } = receiver
        const { personId: saveUserId, personName: saveUserName } = userInfo
        const { boardNum, boxNum, boxName } = box
        refOpenParams.current = {
          takeUserId,
          takeUserName,
          saveUserId,
          saveUserName,
          boardNum,
          boxNum,
          boxName,
          deviceCode
        }
        if (window.plus) {
          openLocker(boardNum, boxNum)
        } else {
          afterDoorOperate({
            boardNum,
            boxNum,
            status: 'open'
          })
        }
      } else {
        message.error('未找到存件人信息')
      }
    },
    [userInfo, deviceCode]
  )
  const reOpen = useCallback(
    () => {
      if (userInfo) {
        refStatus.current = 're-open'
        const { boardNum, boxNum } = doorInfo
        if (window.plus) {
          openLocker(boardNum, boxNum)
        } else {
          afterDoorOperate({
            boardNum,
            boxNum,
            status: 're-open'
          })
        }
      } else {
        message.error('未找到存件人信息')
      }
    },
    [userInfo, deviceCode]
  )
  return (
    <Spin spinning={!deviceCode}>
      <div className='App'>
        <Comp
          onUrl={onUrl}
          userInfo={userInfo}
          deviceCode={deviceCode}
          doorInfo={doorInfo}
          handleFace={handleFace}
          handleOpen={handleOpen}
          reOpen={reOpen}
        />
      </div>
    </Spin>
  )
}

export default memo(App)
