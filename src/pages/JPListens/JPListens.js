import React, { memo, useCallback } from 'react'
import './JPListens.styl'
import { useNavigate } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import listen from '@/consts/jp/listen'

const JPListens = () => {
  const navigate = useNavigate()
  const gotoDetail = useCallback(
    id => {
      navigate(`/jp-listen?id=${id}`)
    },
    [navigate]
  )
  return (
    <Page>
      <Header to='/' />
      <Content>
        {listen.map((v, i) => (
          <p
            key={i}
            className='pg-jp-listens_text on-click'
            onClick={() => {
              gotoDetail(v.id)
            }}
          >
            {v.id}
          </p>
        ))}
      </Content>
    </Page>
  )
}

export default memo(JPListens)
