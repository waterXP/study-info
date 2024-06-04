import React, { memo, useMemo, useState, useEffect, useCallback } from 'react'
import './JPWords.styl'
import { useSearchParams } from 'react-router-dom'
import junior from '@/consts/jp/junior'

const JPWords = () => {
  const [searchParams] = useSearchParams()
  const [readMode, setReadMode] = useState(false)
  const [index, setIndex] = useState(0)
  const [list, setList] = useState([])
  useEffect(() => {
    const ch = +searchParams.get('ch')
    const no = +searchParams.get('no')
    const index = +searchParams.get('index')
    if (ch && no) {
      const tarCh = junior.find(v => v.chapter === ch)
      if (tarCh) {
        const tarNo = tarCh.lesson.find(v => v.no === no)
        if (tarNo) {
          const list = [...tarNo.word, ...tarNo.phrase]
          setList(list)
          if (index && list[index]) {
            setIndex(index)
          } else {
            setIndex(0)
          }
          return
        }
      }
    }
    const tar = junior[0].lesson[0]
    const list = [...tar.word, ...tar.phrase]
    setList(list)
    setIndex(0)
  }, [searchParams])
  const course = useMemo(() => (list && list[index]) || null, [list, index])
  const onPrevClick = useCallback(() => {
    setIndex(index => {
      const nextIndex = index - 1
      return list[nextIndex] ? nextIndex : list.length - 1
    })
  }, [list])
  const toggleMode = useCallback(() => {
    setReadMode(readMode => !readMode)
  }, [])
  const onNextClick = useCallback(() => {
    setIndex(index => {
      const nextIndex = index + 1
      return list[nextIndex] ? nextIndex : 0
    })
  }, [list])
  return (
    <div className='pg-jp-words  hide-scroll'>
      <div className='pg-jp-words_content'>
        <div className='pg-jp-words_body'>
          {course ? (
            <div className='pg-jp-words_list'>
              {course.kana && <p className='pg-jp-words_line'>{course.kana}</p>}
              {course.mana && (
                <p className='pg-jp-words_line'>{`（${course.mana}）`}</p>
              )}
              {course.type && (
                <p className='pg-jp-words_line'>{`「${course.type}」`}</p>
              )}
              {course.cn && <p className='pg-jp-words_line'>{course.cn}</p>}
            </div>
          ) : (
            <p className='pg-jp-words_line'>未找到单词</p>
          )}
        </div>
      </div>
      <div className='pg-jp-words_footer'>
        <div className='pg-jp-words_buttons'>
          <div
            className='pg-jp-words_corner-button is-clickable'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-jp-words_corner-center is-clickable'
            onClick={toggleMode}
          >
            {readMode ? '阅读模式' : '背诵模式'}
          </div>
          <div
            className='pg-jp-words_corner-button is-right is-clickable'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(JPWords)
