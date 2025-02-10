import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.styl'
import CabinetPickList from '@/pages/CabinetPickList'
import reportWebVitals from './reportWebVitals'

const plusReady = () => {
  // eslint-disable-next-line no-alert
  window.alert(
    window.plus.android.invoke(
      'com.dcp.system.facade.SystemFacade',
      'getDeviceCode'
    )
  )
}

if (window.plus) {
  plusReady()
} else {
  document.addEventListener('plusready', plusReady, false)
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CabinetPickList />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
