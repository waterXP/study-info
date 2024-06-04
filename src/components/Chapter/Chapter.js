import React, { memo } from 'react'
import './Chapter.styl'

const Chapter = ({ children }) => <div className='com-chapter'>{children}</div>

export default memo(Chapter)
