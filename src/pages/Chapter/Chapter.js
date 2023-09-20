import React, { memo, useEffect, useState, useMemo, useCallback, Fragment } from 'react'
// import PropTypes from 'prop-types'
import './Chapter.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { dataMap, dataSource } from '@/consts/overall'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'
import Detail from '@com/Detail'
import Voice from '@com/Voice'
import nouns from '@/consts/nouns'

const Chapter = () => {
  const navigate = useNavigate()
  const { shortTip, viewMode } = useSelector(
    ({ viewMode, shortTip }) => ({ shortTip, viewMode })
  )
  const dispatch = useDispatch()
  const [flag, setFlag] = useState(0)
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const onModeClick = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeViewMode' })
      setFlag(0)
    }, []
  )
  const onPrevClick = useCallback(
    e => {
      e.stopPropagation()
      const index = dataSource.findIndex(v => v.id === data.id)
      if (index === 0) {
        navigate(`/chapter?id=${dataSource[dataSource.length - 1].id}`)
      } else if (index > 0) {
        navigate(`/chapter?id=${dataSource[index - 1].id}`)
      }
    },
    [data, navigate]
  )
  const gotoITTO = useCallback(
    (e, id) => {
      e.stopPropagation()
      navigate(`/itto?id=${id}`)
    },
    [navigate]
  )
  const onNextClick = useCallback(
    e => {
      e.stopPropagation()
      const index = dataSource.findIndex(v => v.id === data.id)
      const len = dataSource.length
      if (~index) {
        if (index === len - 1) {
          navigate(`/chapter?id=${dataSource[0].id}`)
        } else if (index < len - 1) {
          navigate(`/chapter?id=${dataSource[index + 1].id}`)
        }
      }
    },
    [data]
  )
  useEffect(
    () => {
      const queryId = searchParams.get('id')
      const data = dataMap[queryId] || dataMap.integration
      const {
        id, realm, inStart, inPlan, inExec, inMonitor, inEnd, short
      } = data || {}
      setFlag(0)
      setData({
        id,
        realm,
        short,
        contents: [
          ...(inStart || []).map(
            (v, i) => i === 0
              ? ({ id: v.id, text: v.text, pre: '启动过程组' })
              : ({ id: v.id, text: v.text })
          ),
          ...(inPlan || []).map(
            (v, i) => i === 0
              ? ({ id: v.id, text: v.text, pre: '规划过程组' })
              : ({ id: v.id, text: v.text })
          ),
          ...(inExec || []).map(
            (v, i) => i === 0
              ? ({ id: v.id, text: v.text, pre: '执行过程组' })
              : ({ id: v.id, text: v.text })
          ),
          ...(inMonitor || []).map(
            (v, i) => i === 0
              ? ({ id: v.id, text: v.text, pre: '监控过程组' })
              : ({ id: v.id, text: v.text })
          ),
          ...(inEnd || []).map(
            (v, i) => i === 0
              ? ({ id: v.id, text: v.text, pre: '收尾过程组' })
              : ({ id: v.id, text: v.text })
          ),
        ]
      })
    },
    [searchParams]
  )
  const toggleShort = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeShortTip' })
    }, []
  )
  const onClickContent = useCallback(
    () => {
      if (data && viewMode === 'recite') {
        const len = (data.contents || []).length
        if (flag >= len) {
          message.error('已经到底了')
        } else {
          setFlag(flag => flag + 1)
        }
      }
    }, [flag, data, viewMode]
  )
  const onRefresh = useCallback(
    e => {
      e.stopPropagation()
      setFlag(0)
    },
    []
  )
  const disp = useMemo(
    () => data
      ? viewMode === 'reading'
        ? data.contents
        : (data.contents || []).filter((_v, i) => i < flag)
      : null,
    [data, flag, viewMode]
  )

  const voices = useMemo(
    () => {
      const r = []
      if (data) {
        r.push(data.realm + '。')
        if (data.contents) {
          data.contents.forEach(
            ({ text, pre, id }) => {
              pre && r.push(pre + '。')
              text && r.push(text + '。')
              if (shortTip && nouns[id] && nouns[id].content) {
                r.push(nouns[id].content)
              }
            }
          )
        }
      }
      return r
    },
    [data, shortTip]
  )

  if (data) {
    return <div className='pg-chapter hide-scroll' onClick={onClickContent}>
      <div className='pg-chapter_content'>
        <Breadcrumb to={-1}>返回</Breadcrumb>
        <Voice messages={voices} />
        <Title>
          <span>{ data.realm }</span>
          {
            shortTip &&
            <span className='pg-chapter_short'>{ `（${data.short}）` }</span>
          }
        </Title>
        <div className='pg-chapter_section'>
          <div className='pg-chapter_items'>
            {
              disp.length > 0
                ? disp.map(
                  ({ text, id, pre }) =>
                    pre
                      ? <Fragment key={id}>
                        <p className='pg-chapter_item-pre'>{ pre }</p>
                        <p className='pg-chapter_item'>
                          <span onClick={e => { gotoITTO(e, id) }}>
                            { text }
                          </span>
                        </p>
                        {
                          shortTip && <Detail id={id} />
                        }
                      </Fragment>
                      :  <p
                        key={id}
                        className='pg-chapter_item'
                      >
                        <span onClick={e => { gotoITTO(e, id) }}>
                          { text }
                        </span>
                        {
                          shortTip && <Detail id={id} />
                        }
                      </p>
                )
                : <p className='pg-chapter_placeholder'>点击空白处显示下一条</p>
            }
          </div>
        </div>
      </div>
      <div className='pg-chapter_footer'>
        <div className='pg-chapter_buttons'>
          <div
            className='pg-chapter_corner-button is-clickable'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-chapter_corner-center is-clickable'
            onClick={toggleShort}
          >
            { shortTip ? '隐藏提示' : '显示提示' }
          </div>
          <div
            className='pg-chapter_corner-button is-right is-clickable'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
        {
          viewMode === 'reading'
            ? <div
              className='pg-chapter_button in-reading'
              onClick={onModeClick}
            >
              阅读模式
            </div>
            : <>
              <div className='pg-chapter_button in-second' onClick={onRefresh}>
                刷新
              </div>
              <div className='pg-chapter_button' onClick={onModeClick}>
                背诵模式
              </div>
            </>
        }
      </div>
    </div>
  }
  return <div className='pg-chapter'>
    <Breadcrumb to={-1}>返回</Breadcrumb>
    <p>加载中</p>
  </div>
}
Chapter.propTypes = {
}

export default memo(Chapter)
