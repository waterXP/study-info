import React, { memo, useState, useMemo, useEffect } from 'react'
import './JPTable.styl'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import tables from '@/consts/jp/tables'
import Box from '@com/Box'

const JPTable = () => {
  const [searchParams] = useSearchParams()
  const [name, setName] = useState('')
  const [columns, setColumns] = useState([])
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const pId = searchParams.get('pId')
    const id = searchParams.get('id')
    if (pId && id) {
      const unit = tables.find(({ id }) => id === pId)
      if (unit) {
        const target = unit.list.find(({ id }) => id === id)
        if (target) {
          const { name, columns, dataSource } = target
          setName(name)
          setColumns(columns)
          setDataSource(dataSource)
        }
      }
    }
  }, [searchParams])
  const style = useMemo(
    () => {
      if (columns.length) {
        return { width: `${100 / columns.length}%` }
      }
      return {}
    },
    [columns]
  )
  return (
    <Box>
      <Breadcrumb to='/jp-tables' noTop>返回</Breadcrumb>
      <p className='pg-jp-table_title'>{name}</p>
      <div className='pg-jp-table_column is-header'>
        {columns.map(v => (
          <div key={v} className='pg-jp-table_cell is-header' style={style}>{v}</div>
        ))}
      </div>
      {dataSource.map((v, i) => (
        <div key={i} className='pg-jp-table_column'>
          {v.map(v => (
            <div key={v} className='pg-jp-table_cell' style={style}>{v}</div>
          ))}
        </div>
      ))}
      <div className='pg-jp-table_bottom' />
    </Box>
  )
}

export default memo(JPTable)
