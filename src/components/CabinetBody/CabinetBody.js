import React, { memo, useMemo } from 'react'
import './CabinetBody.styl'
import CabinetReturn from '@/components/CabinetReturn'

const CabinetBody = ({
  className,
  onReturn,
  children,
  delay,
  onUrl,
  userInfo
}) => {
  const cName = useMemo(
    () => ['com-cabinet-body', className].filter(Boolean).join(' '),
    [className]
  )
  return (
    <div className={cName}>
      {delay && (
        <CabinetReturn
          onClick={onReturn}
          delay={delay}
          onUrl={onUrl}
          userInfo={userInfo}
        />
      )}
      {children}
    </div>
  )
}

export default memo(CabinetBody)
