import React, { memo, useCallback } from 'react'
import './JPTables.styl'
import { useNavigate } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import tables from '@/consts/jp/tables'

const JPTables = () => {
  const navigate = useNavigate()
  const gotoTable = useCallback(
    (pId, id) => {
      navigate(`/jp-table?id=${id}&pId=${pId}`)
    },
    [navigator]
  )
  return (
    <Page>
      <Header to='/' />
      <Content>
        {tables.map(({ id: pId, title, desc, list }) => (
          <div key={pId} className='pg-jp-tables_content'>
            <p className='pg-jp-tables_title'>{title}</p>
            <p className='pg-jp-tables_desc'>{desc}</p>
            {list.map(({ id, name }) => (
              <p
                key={id}
                className='pg-jp-tables_name on-click'
                onClick={() => {
                  gotoTable(pId, id)
                }}
              >
                {name}
              </p>
            ))}
          </div>
        ))}
      </Content>
    </Page>
  )
}

export default memo(JPTables)
