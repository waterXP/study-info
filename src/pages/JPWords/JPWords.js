import React, { memo, useMemo, useState, useEffect, useCallback } from 'react'
import './JPWords.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import junior from '@/consts/jp/junior'
import Switch from './components/Switch'
import Word from './components/Word'

const JPWords = () => {
  const [showResult, setShowResult] = useState(false)
  const [switches, setSwitches] = useState({
    kana: false,
    mana: false,
    type: false,
    cn: false
  })
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
  const [searchParams] = useSearchParams()
  const [index, setIndex] = useState(0)
  const [detail, setDetail] = useState(null)
  const [chapter, setChapter] = useState(1)
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
          setChapter(ch)
          setDetail(tarNo)
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
    setChapter(1)
    setDetail(tar)
    setIndex(0)
  }, [searchParams])
  const { list, title, link } = useMemo(() => {
    if (detail) {
      const { no, topic, word, phrase } = detail
      return {
        title: `第${no}課 ${topic}`,
        list: [...(word || []), ...(phrase || [])],
        link: `/jp-words-list?ch=${chapter}&no=${no}`
      }
    }
    return { title: '', list: [], link: -1 }
  }, [detail, chapter])
  const course = useMemo(() => (list && list[index]) || null, [list, index])
  const onPrevClick = useCallback(() => {
    setShowResult(false)
    setIndex(index => {
      const nextIndex = index - 1
      return list[nextIndex] ? nextIndex : list.length - 1
    })
  }, [list])
  const onNextClick = useCallback(() => {
    setShowResult(false)
    setIndex(index => {
      const nextIndex = index + 1
      return list[nextIndex] ? nextIndex : 0
    })
  }, [list])
  const pointStyle = useMemo(() => {
    const len = list.length
    const r = { width: '100%', left: '100%' }
    if ((index > 0 || index === 0) && index < len) {
      const unitWidth = 100 / len
      const left = index * unitWidth
      r.width = `${unitWidth}%`
      r.left = `${left}%`
      r.transition = `left .4s ease`
    }
    return r
  }, [index, list])
  const onProcess = useCallback(
    e => {
      const { target, clientX } = e
      const { offsetLeft, offsetWidth } = target || {}
      const len = list.length
      if (len > 0 && clientX && offsetLeft && offsetWidth) {
        const unit = offsetWidth / len
        const left = clientX - offsetLeft
        const index = Math.floor(left / unit)
        setIndex(index)
      }
    },
    [list]
  )
  const gotoPrevChapter = useCallback(() => {
    const len = allList.length
    if (len > 0) {
      const index = allList.findIndex(v => v.no === detail.no)
      if (~index) {
        const prev = index > 0 ? index - 1 : len - 1
        const { ch, no } = allList[prev]
        setShowResult(false)
        navigate(`/jp-words?ch=${ch}&no=${no}`)
      }
    }
  }, [navigate, allList, detail])
  const gotoNextChapter = useCallback(() => {
    const len = allList.length
    if (len > 0) {
      const index = allList.findIndex(v => v.no === detail.no)
      if (~index) {
        const next = index < len - 1 ? index + 1 : 0
        const { ch, no } = allList[next]
        setShowResult(false)
        navigate(`/jp-words?ch=${ch}&no=${no}`)
      }
    }
  }, [navigate, allList, detail])
  const toggleShwoResult = useCallback(() => {
    setShowResult(showResult => !showResult)
  }, [])
  const onSwtichsChange = useCallback(type => {
    setShowResult(false)
    setSwitches(switches => ({
      ...switches,
      [type]: !switches[type]
    }))
  }, [])
  return (
    <div className='pg-jp-words  hide-scroll'>
      <div className='pg-jp-words_content'>
        <Breadcrumb to={link} noTop title={title}>
          返回
        </Breadcrumb>
        <div className='pg-jp-words_process' onClick={onProcess}>
          <div className='pg-jp-words_point' style={pointStyle} />
        </div>
        <div className='pg-jp-words_options'>
          <div className='pg-jp-words_options-block'>
            <Switch
              checked={switches.kana}
              onClick={() => {
                onSwtichsChange('kana')
              }}
            >
              假
            </Switch>
            <Switch
              checked={switches.mana}
              onClick={() => {
                onSwtichsChange('mana')
              }}
            >
              汉
            </Switch>
            <Switch
              checked={switches.type}
              onClick={() => {
                onSwtichsChange('type')
              }}
            >
              类
            </Switch>
            <Switch
              checked={switches.cn}
              onClick={() => {
                onSwtichsChange('cn')
              }}
            >
              意
            </Switch>
          </div>
          <div className='pg-jp-words_options-block'>
            <div
              className='pg-jp-words_option is-clickable'
              onClick={gotoPrevChapter}
            >
              上
            </div>
            <div
              className='pg-jp-words_option is-clickable'
              onClick={gotoNextChapter}
            >
              下
            </div>
          </div>
        </div>
        <div className='pg-jp-words_center' onClick={toggleShwoResult}>
          <div className='pg-jp-words_body'>
            {course ? (
              <Word
                word={course}
                showResult={showResult}
                switches={switches}
              />
            ) : (
              <p className='pg-jp-words_line'>未找到单词</p>
            )}
          </div>
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
