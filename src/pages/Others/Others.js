import React, { memo, useState, useEffect, useCallback } from 'react'
import './Others.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Title from '@com/Title'
import Breadcrumb from '@com/Breadcrumb'
import Topic from '@com/Topic'
import Paragraph from '@com/Paragraph'
import others, { otherList } from '@/consts/others'

const Others = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shortTip } = useSelector(({ shortTip }) => ({ shortTip }))
  const toggleShort = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeShortTip' })
    }, []
  )
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    const queryId = searchParams.get('id')
    const content = others[queryId]
    if (content) {
      setData(content)
    }
  }, [searchParams])
  const onPrevClick = useCallback(
    e => {
      e.stopPropagation()
      if (data && data.id) {
        const index = otherList.findIndex(v => v.id === data.id)
        if (~index) {
          if (index > 0) {
            setData(null)
            navigate(`/others?id=${otherList[index - 1].id}`)
          } else {
            navigate(`/others?id=${otherList[otherList.length - 1].id}`)
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
        const index = otherList.findIndex(v => v.id === data.id)
        if (~index) {
          if (index < otherList.length - 1) {
            setData(null)
            navigate(`/others?id=${otherList[index + 1].id}`)
          } else {
            navigate(`/others?id=${otherList[0].id}`)
          }
        }
      }
    },
    [data, searchParams]
  )
  if (data) {
    return (
      <div className='pg-others hide-scroll'>
        <div className='pg-others_content'>
          <Breadcrumb top={-1}>返回</Breadcrumb>
          <Title>{data.title}</Title>
          <div className='pg-others_items'>
            <Paragraph title='写作指南' content={data.sample} shortTip={shortTip} />
            <Topic title='写作要点' content={data.point} />
          </div>
        </div>
        <div className='pg-others_footer'>
          <div className='pg-others_buttons'>
            <div
              className='pg-others_corner-button on-click'
              onClick={onPrevClick}
            >
              上一个
            </div>
            <div
              className='pg-others_corner-center on-click'
              onClick={toggleShort}
            >
              {shortTip ? '隐藏范文' : '显示范文'}
            </div>
            <div
              className='pg-others_corner-button is-right on-click'
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

export default memo(Others)
