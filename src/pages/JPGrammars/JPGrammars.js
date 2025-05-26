import React, { memo, useCallback } from 'react'
import './JPGrammars.styl'
import { useNavigate } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import grammar from '@/consts/jp/tutor/grammar'

const JPGrammars = () => {
  const navigate = useNavigate()
  const gotoDetail = useCallback(
    id => {
      navigate(`/jp-grammar-chapter?id=${id}`)
    },
    [navigate]
  )
  return (
    <Page>
      <Header to='/' type='jp' />
      <Content>
        {grammar.map(({ title, id, desc }) => (
          <div
            key={id}
            className='pg-jp-grammars_item on-click'
            onClick={() => {
              gotoDetail(id)
            }}
          >
            <p className='pg-jp-grammars_title'>{title}</p>
            {desc && <p className='pg-jp-grammars_desc'>{desc}</p>}
          </div>
        ))}
      </Content>
    </Page>
  )
}

export default memo(JPGrammars)
