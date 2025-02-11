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
import { initAndroid, checkFace, openLocker, waitLocker } from '@/api/android'
import { saveExpress, takeExpress } from '@/api/expressLocker'

const ComMap = {
  default: Cabinet,
  pick: CabinetPick,
  'pick-code': CabinetPickCode,
  'pick-list': CabinetPickList,
  save: CabinetSave,
  'save-query': CabinetSaveQuery
}

const App = () => {
  const refNextUrl = useRef('save-query')
  const refOpenParams = useRef(null)
  const refBoxInfo = useRef(null) // 操作的柜子信息
  const [hasOthers, setHasOthers] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [deviceCode, setDeviceCode] = useState('34049E63C6F7')
  const [doorInfo, setDoorInfo] = useState(null)
  const [url, setUrl] = useState('')
  // 更新用户信息
  const updateUserInfo = useCallback(userInfo => {
    setUserInfo(userInfo)
    console.log('update user info')
    if (refNextUrl.current === 'save-query') {
      setUrl('save-query')
    } else if (refNextUrl.current === 'pick-list') {
      setUrl('pick-list')
    }
  }, [])
  // 更新开锁、关锁信息
  const afterDoorOperate = useCallback(result => {
    const doorInfo = result || {}
    if (refBoxInfo.current) {
      doorInfo.boxName = refBoxInfo.current.boxName
    }
    setDoorInfo(doorInfo)
    if (result) {
      if (refNextUrl.current === 'save') {
        if (result.status === 'open') {
          waitLocker(refBoxInfo.current.boardNum)
        }
        saveExpress(refOpenParams.current).then(d => {
          if (d.code === 200) {
            setUrl('save')
          }
        })
      } else if (refNextUrl.current === 'pick') {
        takeExpress(refOpenParams.current).then(d => {
          if (d.code === 200) {
            setUrl('pick')
          }
        })
      }
    }
  }, [])
  // 初始化页面回调
  useEffect(() => {
    initAndroid(setDeviceCode, updateUserInfo, afterDoorOperate)
  }, [])
  // 根据url获取内容
  const Comp = useMemo(() => ComMap[url] || ComMap.default, [url])
  // 根据内容初始化数据
  useEffect(() => {
    if (Comp === ComMap.default) {
      setUserInfo(null)
    }
  }, [Comp])
  const onUrl = useCallback(url => {
    setUrl(url)
  }, [])
  // 刷脸
  const handleFace = useCallback(status => {
    refNextUrl.current = status
    if (window.plus) {
      checkFace()
    } else {
      setUserInfo({
        personId: '123',
        personName: 'tao'
      })
      setUrl(status)
    }
  }, [])
  const handleOpen = useCallback(
    (keyword, box, receiver) => {
      refBoxInfo.current = box
      if (keyword === 'save') {
        if (userInfo) {
          refNextUrl.current = keyword
          const { userId: takeUserId, userName: takeUserName } = receiver || {}
          const { personId: saveUserId, personName: saveUserName } =
            userInfo || {}
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
      } else if (keyword === 'pick') {
        const { boardNum, boxNum, expressCode, hasOthers } = box
        setHasOthers(hasOthers)
        refNextUrl.current = keyword
        refOpenParams.current = {
          expressCode
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
      }
    },
    [userInfo, deviceCode]
  )
  const reOpen = useCallback(() => {
    refNextUrl.current = 're-open'
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
  }, [userInfo, deviceCode])
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
          hasOthers={hasOthers}
        />
      </div>
    </Spin>
  )
}

export default memo(App)
