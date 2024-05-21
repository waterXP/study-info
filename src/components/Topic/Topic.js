import React, { memo, useMemo } from 'react'
import './Topic.styl'
import { Table } from 'antd'

const Topic = ({ content, title, columns }) => {
  const dispList = useMemo(() => {
    if (Array.isArray(content)) {
      return content
    }
    if (typeof content === 'string' || typeof content === 'number') {
      return [content]
    }
    return []
  }, [content])
  const dSource = useMemo(() => {
    if (columns) {
      return content.map((v, i) => ({ ...v, index: i }))
    }
    return []
  }, [])
  return (
    <div className='com-topic'>
      {title && <p className='com-topic_title'>{title}</p>}
      {columns ? (
        <Table
          columns={columns}
          dataSource={dSource}
          rowKey='index'
          pagination={false}
        />
      ) : (
        dispList.map((v, i) => (
          <p key={i} className='com-topic_line'>
            {v}
          </p>
        ))
      )}
    </div>
  )
}

export default memo(Topic)
