import React, { memo, useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Icon.styl'

const Icon = ({ className, type, ...rest }) => {
  const cName = useMemo(
    () => [className, 'com-icon iconfont', type].filter(Boolean).join(' '),
    [className, type]
  )
  return <u className={cName} {...rest} />
}
Icon.propTypes = {
}

export default memo(Icon)
