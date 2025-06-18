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
import CabinetCodeResult from '@/pages/CabinetCodeResult'
import {
  initAndroid,
  checkFace,
  openLocker,
  waitLocker,
  closeScreenLight,
  openScreenLight,
  getBaseUrl
} from '@/api/android'
import { updateInstance } from '@/api'
import { saveExpress, takeExpress } from '@/api/expressLocker'

message.config({
  top: 100
})

const ComMap = {
  default: Cabinet,
  pick: CabinetPick,
  'pick-code': CabinetPickCode,
  'pick-list': CabinetPickList,
  save: CabinetSave,
  'save-query': CabinetSaveQuery,
  'code-result': CabinetCodeResult
}

const App = () => {
  const [inHiding, setInHiding] = useState(false)
  const [loading, setLoading] = useState(false)
  const refNextUrl = useRef('save-query')
  const refOpenParams = useRef(null)
  const refBoxInfo = useRef(null) // 操作的柜子信息
  const [hasOthers, setHasOthers] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [deviceCode, setDeviceCode] = useState('34049E63C6F7')
  const [doorInfo, setDoorInfo] = useState(null)
  const [url, setUrl] = useState('')
  const [codePick, updateCodePick] = useState(null)
  // 更新用户信息
  const updateUserInfo = useCallback(userInfo => {
    const { action, success } = userInfo || {}
    if (success) {
      if (action === 'detect_face' || action === 'scanqrcode') {
        setUserInfo(userInfo)
        if (refNextUrl.current === 'save-query') {
          setUrl('save-query')
        } else if (refNextUrl.current === 'pick-list') {
          setUrl('pick-list')
        }
      }
    } else {
      message.error((userInfo && userInfo.message) || '用户识别失败')
    }
  }, [])
  // 更新开锁、关锁信息
  const afterDoorOperate = useCallback(result => {
    const doorInfo = result || {}
    if (refBoxInfo.current) {
      doorInfo.boxName = refBoxInfo.current.boxName
    }
    if (
      refBoxInfo.current.boardNum === doorInfo.boardNum &&
      refBoxInfo.current.boxNum === doorInfo.boxNum
    ) {
      setDoorInfo(doorInfo)
    }
    if (result) {
      // if (refNextUrl.current === 're-open-save') {
      //   if (result.status === 'open') {
      //     waitLocker(refBoxInfo.current.boardNum)
      //   }
      // } else
      if (refNextUrl.current === 'save') {
        if (result.status === 'open') {
          waitLocker(refBoxInfo.current.boardNum, refBoxInfo.current.boxNum)
          // if (refOpenParams.current && refOpenParams.current.saved) {
          //   fetch pick packget
          // }
        }
        if (refOpenParams.current && !refOpenParams.current.saved) {
          if (result.status === 'close') {
            refOpenParams.current.saved = true
            const params = { ...refOpenParams.current }
            saveExpress(params).finally(() => {
              setLoading(false)
            }).catch(e => {
              message.error(e.msg || e.message || '存件失败')
            })
          } else {
            setUrl('save')
          }

          // const params = { ...refOpenParams.current }
          // refOpenParams.current.saved = true
          // setLoading(true)
          // saveExpress(params)
          //   .then(d => {
          //     if (d.code === 200) {
          //       setUrl('save')
          //     }
          //   })
          //   .finally(() => {
          //     setLoading(false)
          //   })
        }
      } else if (refNextUrl.current === 'pick') {
        if (refOpenParams.current && !refOpenParams.current.picked) {
          const params = { ...refOpenParams.current }
          refOpenParams.current.picked = true
          setLoading(true)
          takeExpress(params)
            .then(d => {
              if (d.code === 200) {
                setUrl('pick')
              }
              // setUrl('pick')
            })
            .finally(() => {
              setLoading(false)
            })
          // } else {
          //   setUrl('pick')
        }
      } else if (refNextUrl.current === 'code-pick') {
        if (refOpenParams.current && !refOpenParams.current.picked) {
          const params = { ...refOpenParams.current }
          refOpenParams.current.picked = true
          setLoading(true)
          takeExpress(params)
            .then(d => {
              if (d.code === 200) {
                setUrl('code-result')
              }
              // setUrl('pick')
            })
            .finally(() => {
              setLoading(false)
            })
          // } else {
          //   setUrl('pick')
        }
      }
    }
  }, [])
  // 初始化页面回调
  useEffect(() => {
    initAndroid(
      deviceCode => {
        setDeviceCode(deviceCode)
        updateInstance(getBaseUrl())
      },
      updateUserInfo,
      afterDoorOperate
    )
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
      } else if (keyword === 'code-pick') {
        const { boardNum, boxNum, expressCode } = box
        // setHasOthers(hasOthers)
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
  const reOpen = useCallback(
    keyword => {
      refNextUrl.current = keyword
      const { boardNum, boxNum } = doorInfo
      if (window.plus) {
        openLocker(boardNum, boxNum)
      } else {
        afterDoorOperate({
          boardNum,
          boxNum,
          status: keyword
        })
      }
    },
    [doorInfo]
  )
  const onScreenClose = useCallback(() => {
    setInHiding(true)
    closeScreenLight()
  }, [])
  const onScreenOpen = useCallback(() => {
    if (inHiding) {
      setInHiding(false)
      openScreenLight()
    }
  }, [inHiding])
  return (
    <Spin spinning={!deviceCode || loading} size='large' tip='加载中……'>
      <div className='lay-app' onClick={onScreenOpen}>
        {!inHiding && (
          <Comp
            onUrl={onUrl}
            setInHiding={onScreenClose}
            userInfo={userInfo}
            deviceCode={deviceCode}
            doorInfo={doorInfo}
            handleFace={handleFace}
            handleOpen={handleOpen}
            reOpen={reOpen}
            hasOthers={hasOthers}
            setLoading={setLoading}
            codePick={codePick}
            updateCodePick={updateCodePick}
          />
        )}
      </div>
    </Spin>
  )
}

export default memo(App)
