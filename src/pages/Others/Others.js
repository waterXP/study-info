import React, { memo, useState, useEffect, useCallback } from 'react'
import './Others.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import others, { otherList } from '@/consts/others'
import Title from '@com/Title'
import Breadcrumb from '@com/Breadcrumb'

const Others = () => {
  const navigate = useNavigate()
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
            navigate(`/itto?id=${otherList[index + 1].id}`)
          } else {
            navigate(`/itto?id=${otherList[0].id}`)
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
            {data.point.map((v, i) => (
              <p key={i} className='pg-others_item'>
                {v}
              </p>
            ))}
          </div>
        </div>
        <div className='pg-others_footer'>
          <div className='pg-others_buttons'>
            <div
              className='pg-others_corner-button is-clickable'
              onClick={onPrevClick}
            >
              上一个
            </div>
            <div
              className='pg-others_corner-button is-right is-clickable'
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
