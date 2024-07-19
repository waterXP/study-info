import React, { memo, useEffect, useState, useMemo, useCallback, Fragment } from 'react'
// import PropTypes from 'prop-types'
import './ITTO.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { dataSource } from '@/consts/overall'
import itto from '@/consts/itto'
import nouns from '@/consts/nouns'
import Breadcrumb from '@com/Breadcrumb'
import Detail from '@com/Detail'
import Title from '@com/Title'
import Voice from '@com/Voice'

const ITTO = () => {
  const navigate = useNavigate()
  const { viewMode, showDetail } = useSelector(
    ({ viewMode, showDetail }) => ({ viewMode, showDetail })
  )
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(0)
  const dispatch = useDispatch()

  const onModeClick = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeViewMode' })
      setFlag(0)
    }, []
  )
  useEffect(
    () => {
      const queryId = searchParams.get('id')
      const content = itto[queryId]
      setFlag(0)
      if (content) {
        const { title, i, tt, o } = content
        const top = dataSource.find(
          v => {
            const { inStart, inPlan, inExec, inMonitor, inEnd } = v
            return [
              ...(inStart || []),
              ...(inPlan || []),
              ...(inExec || []),
              ...(inMonitor || []),
              ...(inEnd || [])
            ].find(
              ({ id }) => id === queryId
            )
          }
        )
        setData({
          queryId,
          top,
          title,
          contents: [
            ...i.map(
              ({ id, title }, i) => i === 0
                ? ({ id, text: title, pre: '输入' })
                : ({ id, text: title })
            ),
            ...tt.map(
              ({ id, title }, i) => i === 0
                ? ({ id, text: title, pre: '工具和技术' })
                : ({ id, text: title })
            ),
            ...o.map(
              ({ id, title }, i) => i === 0
                ? ({ id, text: title, pre: '输出' })
                : ({ id, text: title })
            )
          ]
        })
      }
    },
    [searchParams]
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
  const disp = useMemo(
    () => data
      ? viewMode === 'reading'
        ? data.contents
        : (data.contents || []).filter((_v, i) => i < flag)
      : null,
    [data, flag, viewMode]
  )
  const onRefresh = useCallback(
    e => {
      e.stopPropagation()
      setFlag(0)
    },
    []
  )
  const gotoTop = useCallback(
    () => {
      navigate(`/chapter?id=${data.top.id}`)
    },
    [navigate, data]
  )
  const onPrevClick = useCallback(
    e => {
      e.stopPropagation()
      const queryId = searchParams.get('id')
      if (data && data.top) {
        const {
          inStart,
          inPlan,
          inExec,
          inMonitor,
          inEnd
        } = data.top
        const ids = [
          ...(inStart || []),
          ...(inPlan || []),
          ...(inExec || []),
          ...(inMonitor || []),
          ...(inEnd || [])
        ]
        const index = ids.findIndex(v => v.id === queryId)
        if (~index) {
          if (index > 0) {
            setData(null)
            navigate(`/itto?id=${ids[index - 1].id}`)
          } else {
            message.error('已经是第一个了')
          }
        }
      }
    },
    [data, searchParams]
  )
  const toggleDetail = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeShowDetail' })
    },
    []
  )
  const onNextClick = useCallback(
    e => {
      e.stopPropagation()
      const queryId = searchParams.get('id')
      if (data && data.top) {
        const {
          inStart,
          inPlan,
          inExec,
          inMonitor,
          inEnd
        } = data.top
        const ids = [
          ...(inStart || []),
          ...(inPlan || []),
          ...(inExec || []),
          ...(inMonitor || []),
          ...(inEnd || [])
        ]
        const index = ids.findIndex(v => v.id === queryId)
        const len = ids.length
        if (~index) {
          if (index < len - 1) {
            setData(null)
            navigate(`/itto?id=${ids[index + 1].id}`)
          } else {
            message.error('已经是最后一个了')
          }
        }
      }
    },
    [data, searchParams]
  )

  const gotoNoun = useCallback(
    e => {
      e.stopPropagation()
      const queryId = searchParams.get('id')
      navigate(`/noun?id=${queryId}`)
    },
    [searchParams]
  )

  const gotoDetail = useCallback(
    (e, id) => {
      e.stopPropagation()
      navigate(`/noun?id=${id}`)
    }
  )

  const voices = useMemo(
    () => {
      const r = []
      if (data) {
        if (data.top) {
          r.push(data.top.realm + '。')
        }
        r.push(data.title + '。')
        if (showDetail && data && data.queryId && nouns[data.queryId]) {
          r.push(nouns[data.queryId].content)
        }

        if (data.contents) {
          data.contents.forEach(
            ({ text, id, pre }) => {
              pre && r.push(pre + '。')
              text && r.push(text + '。')
              if (showDetail && nouns[id]) {
                r.push(nouns[id].content)
              }
            }
          )
        }

      }
      return r
    },
    [data, showDetail]
  )

  if (data) {
    return <div className='pg-itto hide-scroll' onClick={onClickContent}>
      <div className='pg-itto_content'>
        <Breadcrumb to={-1}>返回</Breadcrumb>
        <Voice messages={voices} />
        <Title>
          {
            data.top &&
            <span
              className='on-click'
              onClick={gotoTop}
            >
              { `${data.top.realm}/` }
            </span>
          }
          <span onClick={gotoNoun}>{ data.title }</span>
          {
            (showDetail && data && data.queryId) &&
            <Detail id={data.queryId} />
          }
        </Title>
        <div className='pg-itto_items'>
          {
            disp.length > 0
              ? disp.map(
                ({ text, id, pre }) =>
                  <Fragment key={id}>
                    {
                      pre
                        ? <>
                            <p className='pg-itto_item-pre'>{ pre }</p>
                            <p
                              className={
                                nouns[id] && nouns[id].important
                                  ? 'pg-itto_item is-important'
                                  : 'pg-itto_item'
                              }
                            >
                              <span onClick={e => { gotoDetail(e, id) }}>
                                { text }
                              </span>
                            </p>
                            {
                              showDetail &&
                              <Detail
                                id={id}
                                important={nouns[id] && nouns[id].important}
                              />
                            }
                          </>
                          : <>
                            <p
                              className={
                                nouns[id] && nouns[id].important
                                  ? 'pg-itto_item is-important'
                                  : 'pg-itto_item'
                              }
                            >
                              <span onClick={e => { gotoDetail(e, id) }}>
                                { text }
                              </span>
                            </p>
                            {
                              showDetail &&
                              <Detail
                                id={id}
                                important={nouns[id] && nouns[id].important}
                              />
                            }
                          </>
                    }
                  </Fragment>
              )
              : <p className='pg-itto_placeholder'>点击空白处显示下一条</p>
          }
        </div>
      </div>
      <div className='pg-itto_footer'>
        <div className='pg-itto_buttons'>
          <div
            className='pg-itto_corner-button on-click'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-itto_corner-center on-click'
            onClick={toggleDetail}
          >
            { showDetail ? '隐藏详细' : '显示详细' }
          </div>
          <div
            className='pg-itto_corner-button is-right on-click'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
        {
          viewMode === 'reading'
            ? <div
              className='pg-itto_button in-reading'
              onClick={onModeClick}
            >
              阅读模式
            </div>
            : <>
              <div className='pg-itto_button in-second' onClick={onRefresh}>
                刷新
              </div>
              <div className='pg-itto_button' onClick={onModeClick}>
                背诵模式
              </div>
            </>
        }
      </div>
    </div>
  }
  return null
}
ITTO.propTypes = {
}

export default memo(ITTO)
