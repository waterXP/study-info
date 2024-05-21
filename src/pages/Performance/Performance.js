import React, { memo, useState, useEffect, useCallback, Fragment } from 'react'
import './Performance.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import performance, { performanceList } from '@/consts/performance'
import Title from '@com/Title'
import Breadcrumb from '@com/Breadcrumb'
import Topic from '@com/Topic'
import Paragraph from '@com/Paragraph'

const columns = [
  { title: '预期目标', dataIndex: 'text' },
  { title: '检查指标', dataIndex: 'check' }
]

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
          <Title intro={data.intro}>{data.title}</Title>
          <div className='pg-performance_items'>
            <Topic title='写作框架' content={data.frame} />
            <Topic title='绩效要点' content={data.point} />
            <Topic title='对应五组十域表' content={data.refer} />
            <Topic
              title='预期目标/检查指标要'
              content={data.aim}
              columns={columns}
            />
            <Paragraph title='写作指南' content={data.sample} />
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
