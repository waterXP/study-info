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
    updateUserInfo(result)
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

export const waitLocker = (boardNum, boxNum) => {
  if (window.plus) {
    window.plus.android.invoke(
      'com.dcp.application.biz.facade.ExpressLockerFacade',
      'waitReadLockerClose',
      boardNum,
      boxNum
    )
  }
}

export const closeScreenLight = () => {
  if (window.plus) {
    window.plus.android.invoke(
      'com.dcp.application.biz.facade.ExpressLockerFacade',
      'closeScreenLight'
    )
  }
}

export const openScreenLight = () => {
  if (window.plus) {
    window.plus.android.invoke(
      'com.dcp.application.biz.facade.ExpressLockerFacade',
      'openScreenLight'
    )
  }
}

const urls = {
  tst: 'http://221.12.170.114:30009',
  pro: 'http://39.185.129.156:18006/prod-api'
}

export const getBaseUrl = () => {
  if (window.plus) {
    const baseURL = window.plus.android.invoke(
      'com.dcp.system.facade.SystemFacade',
      'getBaseServerUrl'
    )
    return baseURL && typeof baseURL === 'string'
      ? baseURL[baseURL.length - 1] === '/'
        ? baseURL.slice(0, baseURL.length - 1)
        : baseURL
      : urls.pro
  }
  return urls.pro
}

export default null
