const plusReady = callback => {
  // eslint-disable-next-line no-alert
  callback(
    window.plus.android.invoke(
      'com.dcp.system.facade.SystemFacade',
      'getDeviceCode'
    )
  )
}

const getDevice = callback => {
  if (window.plus) {
    plusReady(callback)
  } else {
    document.addEventListener(
      'plusready',
      () => {
        plusReady(callback)
      },
      false
    )
  }
}

export const initAndroid = (updateDevice, updateUserInfo, updateDoorInfo) => {
  getDevice(updateDevice)
  window.callbackModianAction = result => {
    if (result && result.action) {
      updateUserInfo(result)
    }
  }
  window.callbackOpenDoor = result => {
    if (result) {
      // const { status, boardNum, boxNum } = result
      updateDoorInfo(result)
      // window.alert(
      //   `${boardNum}-${boxNum}:${status === 'open' ? '打开' : '关闭'}成功`
      // )
      // } else {
      //   window.alert('操作失败')
    }
  }
}

export const checkFace = () => {
  if (window.plus) {
    window.plus.android.invoke(
      'com.dcp.application.biz.facade.ExpressLockerFacade',
      'detectFace'
    )
  }
}

export const openLocker = (boardNum, boxNum) => {
  if (window.plus) {
    window.plus.android.invoke(
      'com.dcp.application.biz.facade.ExpressLockerFacade',
      'openLockerDoor',
      boardNum,
      boxNum
    )
  }
}

export const waitLocker = boardNum => {
  if (window.plus) {
    window.plus.android.invoke(
      'com.dcp.application.biz.facade.ExpressLockerFacade',
      'waitReadLockerClose',
      boardNum
    )
  }
}

export default null
