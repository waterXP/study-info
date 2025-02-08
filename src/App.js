import React, { useState, useCallback, useMemo, memo } from 'react'
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
  const [url, setUrl] = useState('')
  const Comp = useMemo(() => ComMap[url] || ComMap.default, [url])
  const onUrl = useCallback(url => {
    setUrl(url)
  }, [])
  return (
    <div className='App'>
      {/* <MainRouter /> */}
      <Comp onUrl={onUrl} />
    </div>
  )
}

export default memo(App)
