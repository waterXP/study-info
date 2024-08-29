import React, { memo, useCallback } from 'react'
import './JPTables.styl'
import { useNavigate } from 'react-router-dom'
import tables from '@/consts/jp/tables'
import Breadcrumb from '@com/Breadcrumb'
import Box from '@com/Box'

const JPTables = () => {
  const navigate = useNavigate()
  const gotoTable = useCallback((pId, id) => {
    navigate(`/jp-table?id=${id}&pId=${pId}`)
  }, [navigator])
  return <Box>
    <Breadcrumb to='/' noTop>返回</Breadcrumb>
    {
      tables.map(
        ({ id: pId, title, desc, list }) => <div key={pId}>
          <p className='pg-jp-tables_title'>{title}</p>
          <p className='pg-jp-tables_desc'>{desc}</p>
          <div className='pg-jp-tables_list'>
            {
              list.map(
                ({ id, name }) =>
                  <p
                    key={id}
                    className='pg-jp-tables_name on-click'
                    onClick={() => { gotoTable(pId, id) }}
                  >
                    { name }
                  </p>
              )
            }
          </div>
        </div>
      )
    }
  </Box>
}

export default memo(JPTables)
