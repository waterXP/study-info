import React, { memo, useCallback } from 'react'
import './JPGrammars.styl'
import { useNavigate } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import grammar from '@/consts/jp/exec/grammar'

const JPGrammars = () => {
  const navigate = useNavigate()
  const gotoDetail = useCallback(
    id => {
      navigate(`/jp-grammar?id=${id}`)
    },
    [navigate]
  )
  return (
    <Page>
      <Header to='/' />
      <Content>
        {grammar.map(({ title, id }) => (
          <p
            key={id}
            className='pg-jp-grammars_item on-click'
            onClick={() => {
              gotoDetail(id)
            }}
          >
            {title}
          </p>
        ))}
      </Content>
    </Page>
  )
}

export default memo(JPGrammars)
