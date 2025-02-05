import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './index.styl'
import App from './App'
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
