import React, { memo, useMemo } from 'react'
import './CabinetBody.styl'
import CabinetReturn from '@/components/CabinetReturn'

const CabinetBody = ({ className, onReturn, children, delay, onUrl }) => {
  const cName = useMemo(
    () => ['com-cabinet-body', className].filter(Boolean).join(' '),
    [className]
  )
  return (
    <div className={cName}>
      {delay && (
        <CabinetReturn onClick={onReturn} delay={delay} onUrl={onUrl} />
      )}
      {children}
    </div>
  )
}

export default memo(CabinetBody)
