import React from 'react'
// import MainRouter from '@/layout/MainRouter'
import Cabinet from '@/pages/Cabinet'
import CabinetPick from '@/pages/CabinetPick'
import CabinetPickCode from '@/pages/CabinetPickCode'
import CabinetPickList from '@/pages/CabinetPickList'
import CabinetSave from '@/pages/CabinetSave'
import CabinetSaveQuery from '@/pages/CabinetSaveQuery'

function App() {
  return (
    <div className='App'>
      {/* <MainRouter /> */}
      <Cabinet />
      <CabinetPick />
      <CabinetPickCode />
      <CabinetPickList />
      <CabinetSave />
      <CabinetSaveQuery />
    </div>
  )
}

export default App
