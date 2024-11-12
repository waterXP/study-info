import React, { memo, useEffect, useState, useCallback } from 'react'
import './JPN2Word.styl'
import { useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import JPText from '@com/JPText'
import jpWords from '@/consts/jp/words'
import Bottom from '@/components/Bottom'

const JPN2Word = () => {
  const navigate = useNavigate()
  const showCn = useSelector(({ showCn }) => showCn)
  const [id, setId] = useState(null)
  const [searchParams] = useSearchParams()
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const id = searchParams.get('id')
    const target = jpWords.find(v => v.id === id)
    if (target) {
      setId(id)
      setInfo(target)
    }
  }, [searchParams])

  const onClick = useCallback(item => {
    navigate(`/jp-n2-word?&id=${item.id}`, { replace: true })
  }, [])

  const onItem = useCallback(
    index => {
      navigate(`/jp-n2-study?&id=${id}&index=${index}`)
    },
    [id]
  )

  return (
    <div className='pg-jp-n-2-word hide-scroll'>
      <div className='pg-jp-n2-word_content'>
        <div className='pg-jp-n2-word_top'>
          <Breadcrumb to='/jp-n2-words' noTop>
            返回
          </Breadcrumb>
          {info && (
            <JPText className='pg-jp-n2-word_topic' content={info.topic} />
          )}
        </div>
        {info && (
          <div className='pg-jp-n2-word_body'>
            {info.list.map(({ kana, mana, cn }, i) => (
              <div
                key={i}
                className='pg-jp-n2-word_item'
                onClick={() => {
                  onItem(i)
                }}
              >
                <JPText className='pg-jp-n2-word_jp' kana={kana} mana={mana} />
                {showCn && <span className='pg-jp-n2-word_cn'>{cn}</span>}
              </div>
            ))}
          </div>
        )}
        <Bottom list={jpWords} current={id} onClick={onClick} />
      </div>
    </div>
  )
}

export default memo(JPN2Word)
