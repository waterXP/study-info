import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import { columns, dataSource } from '@/consts/overall'

const Main = () => {
  const navigate = useNavigate()
  const onRow = useCallback(
    ({ id }) => ({
      onClick: () => {
        navigate(`/chapter?id=${id}`)
      }
    }),
    [navigate]
  )
  return <div className='pg-main'>
    <Table
      rowKey='realm'
      tableLayout='fixed'
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size='small'
      onRow={onRow}
    />
  </div>
}
Main.propTypes = {
}

export default memo(Main)
