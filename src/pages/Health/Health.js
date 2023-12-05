import React, { memo, useState, useMemo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Health.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { healthMap } from '@/consts/health'
import Breadcrumb from '@com/Breadcrumb'
import Voice from '@com/Voice'
import { healtList } from '@/consts/health'

const Health = () => {
  const navigate = useNavigate()
  const { viewMode } = useSelector(
    ({ viewMode }) => ({ viewMode })
  )
  const [searchParams] = useSearchParams()
  const [dispLines, setDispLines] = useState(0)
  const dispatch = useDispatch()
  const onModeClick = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeViewMode' })
      setDispLines(0)
    }, []
  )
  const data = useMemo(
    () => {
      const id = searchParams.get('id')
      if (id && healthMap[id]) {
        return healthMap[id]
      }
      return null
    },
    [searchParams]
  )
  const onClickContent = useCallback(
    () => {
      if (data && viewMode === 'recite') {
        const len = (data.answer || []).length
        if (dispLines >= len) {
          message.error('已经到底了')
        } else {
          setDispLines(dispLines => dispLines + 1)
        }
      }
    }, [data, dispLines, viewMode]
  )
  const onRefresh = useCallback(
    e => {
      e.stopPropagation()
      setDispLines(0)
    },
    []
  )
  const dispData = useMemo(
    () => data
      ? viewMode === 'reading'
        ? data.answer
        : data.answer.slice(0, dispLines)
      : [],
    [data, dispLines, viewMode]
  )
  const voices = useMemo(
    () => {
      if (data) {
        return data.answers
      }
      return []
    },
    [data]
  )
  const onPrevClick = useCallback(
    e => {
      e.stopPropagation()
      const index = healtList.findIndex(({ id }) => id === data.id)
      if (~index) {
        setDispLines(0)
        if (healtList[index - 1]) {
          navigate(`/health?id=${healtList[index - 1].id}`)
        } else {
          navigate(`/health?id=${healtList[healtList.length - 1].id}`)
        }
      }
    },
    [data]
  )
  const onNextClick = useCallback(
    e => {
      e.stopPropagation()
      const index = healtList.findIndex(({ id }) => id === data.id)
      if (~index) {
        setDispLines(0)
        if (healtList[index + 1]) {
          navigate(`/health?id=${healtList[index + 1].id}`)
        } else {
          navigate(`/health?id=${healtList[0].id}`)
        }
      }
    },
    [data]
  )
  if (data) {
    return <div className='pg-health hide-scroll' onClick={onClickContent}>
      <div className='pg-health_content'>
        <Breadcrumb to='/health-list'>返回</Breadcrumb>
        <Voice messages={voices} />
        {
          data.ask.length > 1
            ? <div className='pg-health_topics'>
              {
                data.ask.map(
                  (v, i) => <p key={i} className='pg-health_topic'>
                    { v }
                  </p>
                )
              }
            </div>
            : <p className='pg-health_title'>
              { data.ask[0] }
            </p>
        }
        <div className='pg-health_details'>
          {
            dispData.map(
              (v, i) => <p key={i} className='pg-health_detail'>
                { v }
              </p>
            )
          }
        </div>
      </div>
      <div className='pg-health_footer'>
        <div className='pg-health_buttons'>
          <div
            className='pg-health_corner-button is-clickable'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-health_corner-button is-right is-clickable'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
        {
          viewMode === 'reading'
            ? <div
              className='pg-health_button in-reading'
              onClick={onModeClick}
            >
              阅读模式
            </div>
            : <>
              <div className='pg-health_button in-second' onClick={onRefresh}>
                刷新
              </div>
              <div className='pg-health_button' onClick={onModeClick}>
                背诵模式
              </div>
            </>
        }
      </div>
    </div>
  }
  return null
}
Health.propTypes = {
}

export default memo(Health)
