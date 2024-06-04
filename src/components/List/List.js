import React, { memo } from 'react'
import './List.styl'

const List = ({ children }) => <div className='com-list'>{children}</div>

export default memo(List)
