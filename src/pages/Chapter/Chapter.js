import React, { memo, useEffect, useState, useMemo, useCallback, Fragment } from 'react'
// import PropTypes from 'prop-types'
import './Chapter.styl'
import { useSearchParams } from 'react-router-dom'
import { message } from 'antd'
import { dataMap } from '@/consts/overall'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'

const Chapter = () => {
  const [showAll, setShowAll] = useState(false)
  const [flag, setFlag] = useState(0)
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const onModeClick = useCallback(
    e => {
      e.stopPropagation()
      setShowAll(showAll => !showAll)
      setFlag(0)
    }, []
  )
  useEffect(
    () => {
      const queryId = searchParams.get('id')
      const data = dataMap[queryId] || dataMap.intergration
      const {
        id, realm, inStart, inPlan, inExec, inMonitor, inEnd
      } = data || {}
      setFlag(0)
      setData({
        id,
        realm,
        contents: [
          ...(inStart || []).map(
            (v, i) => i === 0
              ? ({ id: `${realm}-start-${i}`, text: v, pre: '启动过程组' })
              : ({ id: `${realm}-start-${i}`, text: v })
          ),
          ...(inPlan || []).map(
            (v, i) => i === 0
              ? ({ id: `${realm}-plan-${i}`, text: v, pre: '规划过程组' })
              : ({ id: `${realm}-plan-${i}`, text: v })
          ),
          ...(inExec || []).map(
            (v, i) => i === 0
              ? ({ id: `${realm}-exec-${i}`, text: v, pre: '执行过程组' })
              : ({ id: `${realm}-exec-${i}`, text: v })
          ),
          ...(inMonitor || []).map(
            (v, i) => i === 0
              ? ({ id: `${realm}-monitor-${i}`, text: v, pre: '监控过程组' })
              : ({ id: `${realm}-monitor-${i}`, text: v })
          ),
          ...(inEnd || []).map(
            (v, i) => i === 0
              ? ({ id: `${realm}-end-${i}`, text: v, pre: '收尾过程组' })
              : ({ id: `${realm}-end-${i}`, text: v })
          ),
        ]
      })
    },
    [searchParams]
  )
  const onClickContent = useCallback(
    () => {
      if (data && !showAll) {
        const len = (data.contents || []).length
        if (flag >= len) {
          message.error('已经到底了')
        } else {
          setFlag(flag => flag + 1)
        }
      }
    }, [flag, data, showAll]
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
      ? showAll
        ? data.contents
        : (data.contents || []).filter((_v, i) => i < flag)
      : null,
    [data, flag, showAll]
  )
  if (data) {
    return <div className='pg-chapter' onClick={onClickContent}>
      <div className='pg-chapter--content'>
        <Breadcrumb>返回</Breadcrumb>
        <Title>{ data.realm }</Title>
        <div className='pg-chapter--section'>
          {
            disp.length > 0
              ? disp.map(
                ({ text, id, pre }) =>
                  pre
                    ? <Fragment key={id}>
                      <p className='pg-chapter--item-pre'>{ pre }</p>
                      <p className='pg-chapter--item'>
                        { text }
                      </p>
                    </Fragment>
                    :  <p key={id} className='pg-chapter--item'>
                      { text }
                    </p>
              )
              : <p className='pg-chapter--placeholder'>点击空白处显示下一条</p>
          }
        </div>
      </div>
      <div className='pg-chapter--footer'>
        {
          showAll
            ? <div
              className='pg-chapter--button in-reading'
              onClick={onModeClick}
            >
              阅读模式
            </div>
            : <>
              <div className='pg-chapter--button in-second' onClick={onRefresh}>
                刷新
              </div>
              <div className='pg-chapter--button' onClick={onModeClick}>
                背诵模式
              </div>
            </>
        }
      </div>
    </div>
  }
  return <div className='pg-chapter'>
    <Breadcrumb>返回</Breadcrumb>
    <p>加载中</p>
  </div>
}
Chapter.propTypes = {
}

export default memo(Chapter)
