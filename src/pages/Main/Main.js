import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import { columns, dataSource } from '@/consts/overall'

const scroll = { x: 772, y: 'calc(100vh - 215px)' }

const Main = () => {
  const viewMode = useSelector(({ viewMode }) => viewMode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onRow = useCallback(
    ({ id }) => ({
      onClick: () => {
        navigate(`/chapter?id=${id}`)
      }
    }),
    [navigate]
  )
  const toggleMode = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeViewMode' })
    }, []
  )
  return <div className='pg-main'>
    <div className='pg-main--header'>
      <p className='pg-main--title'>五组十域表</p>
      <div
        className={
          viewMode === 'recite'
            ? 'pg-main--mode is-clickable'
            : 'pg-main--mode is-clickable is-mode-reading'
        }
        onClick={toggleMode}
      >
        { viewMode === 'recite' ? '背诵模式' : '阅读模式' }
      </div>
    </div>
    <Table
      rowKey='realm'
      tableLayout='fixed'
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size='small'
      onRow={onRow}
      scroll={scroll}
    />
  </div>
}
Main.propTypes = {
}

export default memo(Main)
