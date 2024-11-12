import React, { memo, useCallback } from 'react'
import './JPN2Words.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import list from '@/consts/jp/words'

const JPN2Words = () => {
  const navigate = useNavigate()
  const gotoDetail = useCallback(
    id => {
      navigate(`/jp-n2-word?id=${id}`)
    },
    [navigate]
  )

  return (
    <div className='pg-jp-n2-words hide-scroll'>
      <div className='pg-jp-n2-words_content'>
        <div className='pg-jp-n2-words_top'>
          <Breadcrumb to='/' noTop>
            返回
          </Breadcrumb>
        </div>
        <div className='pg-jp-n2-words_list'>
          {list.map(({ id, topic }) => (
            <p
              key={id}
              className='pg-jp-n2-words_title'
              onClick={() => {
                gotoDetail(id)
              }}
            >
              {topic}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(JPN2Words)
