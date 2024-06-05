import React, {
  memo,
  Fragment,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react'
import './JPWordsList.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import junior from '@/consts/jp/junior'

const JPWordsList = () => {
  const navigate = useNavigate()
  const allList = useMemo(
    () =>
      (junior || []).reduce((t, { chapter, title, lesson }) => {
        t.push(
          ...(lesson || []).map(v => ({ ...v, ch: chapter, chTitle: title }))
        )
        return t
      }, []),
    []
  )
  const refBody = useRef(null)
  const [title, setTitle] = useState('')
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
          setTitle(tarNo.topic || '')
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
          if (refBody.current) {
            refBody.current.scrollTop = 0
          }
          return
        }
      }
    }
    setParams({ ch: 1, no: 1 })
    setTitle(junior[0].topic || '')
    const tar = junior[0].lesson[0]
    const list = [...tar.word, ...tar.phrase]
    setList(list)
    setDiIndex(tar.word.length)
    if (refBody.current) {
      refBody.current.scrollTop = 0
    }
  }, [searchParams])
  const onPrevClick = useCallback(() => {
    const len = allList.length
    if (len > 0) {
      const index = allList.findIndex(v => v.no === params.no)
      if (~index) {
        const prev = index > 0 ? index - 1 : len - 1
        const { ch, no } = allList[prev]
        navigate(`/jp-words-list?ch=${ch}&no=${no}`)
      }
    }
  }, [params, navigate, allList])
  const onNextClick = useCallback(() => {
    const len = allList.length
    if (len > 0) {
      const index = allList.findIndex(v => v.no === params.no)
      if (~index) {
        const next = index < len - 1 ? index + 1 : 0
        const { ch, no } = allList[next]
        navigate(`/jp-words-list?ch=${ch}&no=${no}`)
      }
    }
  }, [params, navigate, allList])
  const gotoWord = useCallback(
    index => {
      navigate(`/jp-words?ch=${params.ch}&no=${params.no}&index=${index}`)
    },
    [params, navigate]
  )

  return (
    <div className='pg-jp-words-list hide-scroll'>
      <div className='pg-jp-words-list_content'>
        <Breadcrumb to='/jp' noTop>
          返回
        </Breadcrumb>
        {title && (
          <p className='pg-jp-words-list_title'>{`第${params.no}課 ${title}`}</p>
        )}
        <div className='pg-jp-words-list_body' ref={refBody}>
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
