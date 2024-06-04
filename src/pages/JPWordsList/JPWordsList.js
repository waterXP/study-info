import React, { memo, Fragment, useEffect, useState, useCallback } from 'react'
import './JPWordsList.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import junior from '@/consts/jp/junior'

const JPWordsList = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState({ ch: 1, no: 1 })
  const [searchParams] = useSearchParams()

  const [list, setList] = useState([])
  const [diIndex, setDiIndex] = useState(-1)

  useEffect(() => {
    const ch = +searchParams.get('ch')
    const no = +searchParams.get('no')
    if (ch && no) {
      const tarCh = junior.find(v => v.chapter === ch)
      if (tarCh) {
        const tarNo = tarCh.lesson.find(v => v.no === no)
        if (tarNo) {
          setParams({ ch, no })
          const list = [...tarNo.word, ...tarNo.phrase]
          setList(
            list.map(
              ({ kana, mana, type, cn }) =>
                `${kana || ''}${mana ? `（${mana}）` : ''}${
                  type ? `「${type}」` : ''
                }${cn || ''}`
            )
          )
          setDiIndex(tarNo.word.length)
          return
        }
      }
    }
    setParams({ ch: 1, no: 1 })
    const tar = junior[0].lesson[0]
    const list = [...tar.word, ...tar.phrase]
    setList(list)
    setDiIndex(tar.word.length)
  }, [searchParams])
  const onPrevClick = useCallback(() => {
    navigate(`/jp-words-list?ch=${params.ch}&no=${params.no > 1 ? params.no - 1 : 4}`)
  }, [params, navigate])
  const onNextClick = useCallback(() => {
    navigate(`/jp-words-list?ch=${params.ch}&no=${params.no < 4 ? params.no + 1 : 1}`)
  }, [params, navigate])
  const gotoWord = useCallback(
    index => {
      navigate(`/jp-words?ch=${params.ch}&no=${params.no}&index=${index}`)
    },
    [params, navigate]
  )

  return (
    <div className='pg-jp-words-list hide-scroll'>
      <div className='pg-jp-words-list_content'>
        <div className='pg-jp-words-list_body'>
          {list.map((v, i) => (
            <Fragment key={i}>
              <p
                className='pg-jp-words-list_line is-clickable'
                onClick={() => {
                  gotoWord(i)
                }}
              >
                {v}
              </p>
              {i === diIndex && <div className='pg-jp-words-list_division' />}
            </Fragment>
          ))}
        </div>
      </div>
      <div className='pg-jp-words-list_footer'>
        <div className='pg-jp-words-list_buttons'>
          <div
            className='pg-jp-words-list_corner-button is-clickable'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-jp-words-list_corner-button is-right is-clickable'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(JPWordsList)
