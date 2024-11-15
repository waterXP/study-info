import React, {
  memo,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react'
import './JPWords.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Modal, Input, message } from 'antd'
import Breadcrumb from '@com/Breadcrumb'
import Icon from '@com/Icon'
import JPText from '@com/JPText'
import jpWords from '@/consts/jp'
import Switch from '@/components/Word/Switch'
import Word from '@/components/Word/Word'

const JPWords = () => {
  const { favorites } = useSelector(({ favorites }) => ({ favorites }))
  const dispatch = useDispatch()
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
      (jpWords || []).reduce((t, { id, lesson }) => {
        t.push(...(lesson || []).map(v => ({ ...v, id })))
        return t
      }, []),
    []
  )
  const [searchParams] = useSearchParams()
  const [index, setIndex] = useState(0)
  const [detail, setDetail] = useState(null)
  const [id, setId] = useState(1)
  useEffect(() => {
    const id = +searchParams.get('id')
    const no = +searchParams.get('no')
    const index = +searchParams.get('index')
    if (id && no) {
      const tarCh = jpWords.find(v => v.id === id)
      if (tarCh) {
        const tarNo = tarCh.lesson.find(v => v.no === no)
        if (tarNo) {
          const list = [...tarNo.word, ...tarNo.phrase]
          setId(id)
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
    const tar = jpWords[0].lesson[0]
    setId(1)
    setDetail(tar)
    setIndex(0)
  }, [searchParams])
  const { list, title, link } = useMemo(() => {
    if (detail) {
      const { no, topic, word, phrase } = detail
      return {
        title: `第${no}課 ${topic}`,
        list: [...(word || []), ...(phrase || [])],
        link: `/jp-words-list?id=${id}&no=${no}`
      }
    }
    return { title: '', list: [], link: -1 }
  }, [detail, id])
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
      r.transition = 'left .4s ease'
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
        const { id, no } = allList[prev]
        setShowResult(false)
        navigate(`/jp-words?id=${id}&no=${no}`)
      }
    }
  }, [navigate, allList, detail])
  const gotoNextChapter = useCallback(() => {
    const len = allList.length
    if (len > 0) {
      const index = allList.findIndex(v => v.no === detail.no)
      if (~index) {
        const next = index < len - 1 ? index + 1 : 0
        const { id, no } = allList[next]
        setShowResult(false)
        navigate(`/jp-words?id=${id}&no=${no}`)
      }
    }
  }, [navigate, allList, detail])
  const toggleShwoResult = useCallback(() => {
    const { kana, mana, cn, type } = switches
    let len = 0
    let a = 0
    if (course.kana) {
      len++
      a += +kana
    }
    if (course.mana) {
      len++
      a += +mana
    }
    if (course.type) {
      len++
      a += +type
    }
    if (course.cn) {
      len++
      a += +cn
    }
    const inRecite = len !== a && a !== 0
    if (inRecite && !showResult) {
      setShowResult(true)
    } else {
      setShowResult(false)
      const nextIndex = index + 1
      if (list[nextIndex]) {
        setIndex(nextIndex)
      } else {
        gotoNextChapter()
      }
    }
  }, [showResult, index, list, gotoNextChapter, switches, course])
  const onSwtichsChange = useCallback(type => {
    setShowResult(false)
    setSwitches(switches => ({
      ...switches,
      [type]: !switches[type]
    }))
  }, [])
  const refInput = useRef(null)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [showAnswer, setShowAnswer] = useState(true)
  const onInputChange = useCallback(({ target: { value } }) => {
    setInput(value)
  }, [])
  const onCheck = useCallback(() => {
    if (refInput && refInput.current) {
      const tar = refInput.current
      if (tar && tar.input) {
        const { value } = tar.input
        const txt = value ? value.trim() : ''
        if (txt) {
          const cTxt = (txt || '').replace(/〜/g, '')
          const ccMana = (course.mana || '').replace(/〜/g, '')
          const ccKana = (course.kana || '').replace(/〜/g, '')
          if (ccMana === cTxt || ccKana === cTxt) {
            setShowAnswer(false)
            setTimeout(() => {
              setInput('')
            }, 0)
            toggleShwoResult()
          } else {
            setTimeout(() => {
              tar.select()
            }, 0)
            setShowAnswer(true)
            message.error('错误')
          }
        } else {
          setShowAnswer(true)
        }
      }
    }
  }, [course, toggleShwoResult])
  const showModal = useCallback(() => {
    setShowAnswer(false)
    setInput('')
    setTimeout(() => {
      refInput.current && refInput.current.focus()
    }, 0)
    setOpen(true)
  }, [])
  const hideModal = useCallback(() => {
    setOpen(false)
  }, [])
  const onModalPrev = useCallback(() => {
    setShowResult(false)
    const prevIndex = index - 1
    if (list[prevIndex]) {
      setIndex(prevIndex)
    } else {
      gotoPrevChapter()
    }
  }, [list, index, gotoPrevChapter])
  const onModalNext = useCallback(() => {
    setShowResult(false)
    const nextIndex = index + 1
    if (list[nextIndex]) {
      setIndex(nextIndex)
    } else {
      gotoNextChapter()
    }
  }, [list, index, gotoNextChapter])
  const modalTitle = useMemo(
    () => (
      <p className='pg-jp-words_modal-title'>
        {(course && (course.cn || course.mana || course.kana)) || '默写'}
        {course && course.type && `「${course.type}」`}
      </p>
    ),
    [course]
  )
  const footer = useMemo(
    () => (
      <div className='pg-jp-words_modal-footer'>
        <div
          className='pg-jp-words_modal-button on-click'
          onClick={onModalPrev}
        >
          上一个
        </div>
        <div
          className='pg-jp-words_modal-button on-click'
          onClick={onModalNext}
        >
          下一个
        </div>
        <div className='pg-jp-words_modal-button on-click' onClick={onCheck}>
          检查
        </div>
      </div>
    ),
    [onModalPrev, onModalNext, onCheck]
  )
  const onFavorite = useCallback(() => {
    if (list[index] && list[index].id) {
      dispatch({ type: 'updateStorage', id: list[index].id })
    }
  }, [list, index])
  return (
    <div className='pg-jp-words hide-scroll'>
      <div className='pg-jp-words_content'>
        <Breadcrumb to={link} noTop title={<JPText content={title} />}>
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
            {course && (
              <Switch checked={favorites[course.id]} onClick={onFavorite}>
                藏
              </Switch>
            )}
          </div>
          <div className='pg-jp-words_options-block'>
            <div
              className='pg-jp-words_option on-click'
              onClick={gotoPrevChapter}
            >
              上
            </div>
            <div
              className='pg-jp-words_option on-click'
              onClick={gotoNextChapter}
            >
              下
            </div>
          </div>
        </div>
        <div className='pg-jp-words_center' onClick={toggleShwoResult}>
          <div
            className={open ? 'pg-jp-words_body is-hide' : 'pg-jp-words_body'}
          >
            {course ? (
              <Word word={course} showResult={showResult} switches={switches} />
            ) : (
              <p className='pg-jp-words_line'>未找到单词</p>
            )}
          </div>
        </div>
      </div>
      <div className='pg-jp-words_footer'>
        <div className='pg-jp-words_buttons'>
          <div
            className='pg-jp-words_corner-button on-click'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-jp-words_corner-center on-click'
            onClick={showModal}
          >
            默写
          </div>
          <div
            className='pg-jp-words_corner-button is-right on-click'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
      </div>
      <Modal
        open={open}
        closable={false}
        footer={footer}
        onCancel={hideModal}
        title={modalTitle}
      >
        <div className='pg-jp-words_modal-body'>
          <Input
            ref={refInput}
            className='pg-jp-words_input'
            onPressEnter={onCheck}
            value={input}
            onChange={onInputChange}
            placeholder='入力してください'
          />
          {showAnswer && course && (
            <p className='pg-jp-words_input-tip'>
              <JPText kana={course.kana} mana={course.mana} />
              <span>{`${course.type ? `「${course.type}」` : ''}${
                course.cn || ''
              }`}</span>
            </p>
          )}
        </div>
        {course && (
          <div className='pg-jp-words_favorite on-click' onClick={onFavorite}>
            {favorites[course.id] ? (
              <Icon
                className='pg-jp-words_favorite-icon is-favorite'
                type='icon-favorites-fill'
              />
            ) : (
              <Icon
                className='pg-jp-words_favorite-icon'
                type='icon-favorites'
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default memo(JPWords)
