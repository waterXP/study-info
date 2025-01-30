import { memo } from 'react'
import './Trans.styl'
import { trans } from '@/utils/tool'

const Trans = ({ text }) => trans(Array.isArray(text) ? text : [text])

export default memo(Trans)
