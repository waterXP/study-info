import React, { memo } from 'react'
import './AIItem.styl'

const AIItem = ({ item }) => {
  console.log(item)
  return <div className='ai-item'>ai-item</div>
}

export default memo(AIItem)
