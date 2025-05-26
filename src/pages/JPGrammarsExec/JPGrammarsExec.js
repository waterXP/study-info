import React, { memo, useCallback } from 'react'
import './JPGrammarsExec.styl'
import { useNavigate } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import grammar from '@/consts/jp/exec/grammar'

const JPGrammars = () => {
  const navigate = useNavigate()
  const gotoDetail = useCallback(
    id => {
      navigate(`/jp-grammar-exec?id=${id}`)
    },
    [navigate]
  )
  return (
    <Page>
      <Header to='/' type='jp' />
      <Content>
        {grammar.map(({ title, id }) => (
          <p
            key={id}
            className='pg-jp-grammars-exec_item on-click'
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
