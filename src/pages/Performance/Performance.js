import React, { memo, useState, useEffect, useCallback, Fragment } from 'react'
import './Performance.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import performance, { performanceList } from '@/consts/performance'
import Title from '@com/Title'
import Breadcrumb from '@com/Breadcrumb'

const Performance = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    const queryId = searchParams.get('id')
    const content = performance[queryId]
    if (content) {
      setData(content)
    }
  }, [searchParams])
  const onPrevClick = useCallback(
    e => {
      e.stopPropagation()
      if (data && data.id) {
        const index = performanceList.findIndex(v => v.id === data.id)
        if (~index) {
          if (index > 0) {
            setData(null)
            navigate(`/performance?id=${performanceList[index - 1].id}`)
          } else {
            navigate(
              `/performance?id=${
                performanceList[performanceList.length - 1].id
              }`
            )
          }
        }
      }
    },
    [data]
  )
  const onNextClick = useCallback(
    e => {
      e.stopPropagation()
      if (data && data.id) {
        const index = performanceList.findIndex(v => v.id === data.id)
        if (~index) {
          if (index < performanceList.length - 1) {
            setData(null)
            navigate(`/performance?id=${performanceList[index + 1].id}`)
          } else {
            navigate(`/performance?id=${performanceList[0].id}`)
          }
        }
      }
    },
    [data, searchParams]
  )
  if (data) {
    return (
      <div className='pg-performance hide-scroll'>
        <div className='pg-performance_content'>
          <Breadcrumb top={-1}>返回</Breadcrumb>
          <Title>{data.title}</Title>
          <Title>{data.intro}</Title>
          <div className='pg-performance_items'>
          <p className='pg-performance_item'>frame</p>
            {data.frame.map((v, i) => (
              <p key={i} className='pg-performance_item'>
                {v}
              </p>
            ))}
            <p className='pg-performance_item'>point</p>
            {data.point.map((v, i) => (
              <p key={i} className='pg-performance_item'>
                {v}
              </p>
            ))}
            <p className='pg-performance_item'>aim</p>
            {data.aim.map((v, i) => (
              <Fragment key={i}>
                <p className='pg-performance_item'>{v.text}</p>
                <p className='pg-performance_item'>{`check${v.check}`}</p>
              </Fragment>
            ))}
            <p className='pg-performance_item'>refer</p>
            <p className='pg-performance_item'>{data.refer}</p>
          </div>
        </div>
        <div className='pg-performance_footer'>
          <div className='pg-performance_buttons'>
            <div
              className='pg-performance_corner-button is-clickable'
              onClick={onPrevClick}
            >
              上一个
            </div>
            <div
              className='pg-performance_corner-button is-right is-clickable'
              onClick={onNextClick}
            >
              下一个
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default memo(Performance)
