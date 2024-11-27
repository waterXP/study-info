import React, { memo, useCallback } from 'react'
import './JPListens.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import listen from '@/consts/jp/exec/listen'

const JPListens = () => {
  const navigate = useNavigate()
  const gotoDetail = useCallback(
    id => {
      navigate(`/jp-listen?id=${id}`)
    },
    [navigate]
  )
  return (
    <div className='pg-jp-listens hide-scroll'>
      <div className='pg-jp-listens_header'>
        <Breadcrumb to='/' noTop>
          返回
        </Breadcrumb>
      </div>
      <div className='pg-jp-listens_content'>
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
      </div>
    </div>
  )
}

export default memo(JPListens)
