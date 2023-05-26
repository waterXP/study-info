import React, { memo,useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Point.styl'
import { useSearchParams } from 'react-router-dom'
import points from '@/consts/points'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'
import Voice from '@com/Voice'

const Point = () => {
  const [searchParams] = useSearchParams()

  const data = useMemo(
    () => {
      const id = searchParams.get('id')
      if (id && points[id]) {
        return points[id]
      }
      return null
    },
    [searchParams]
  )

  const voices = useMemo(
    () => {
      const r = []
      if (data) {
        r.push(data.title + '。')
        data.texts.forEach(
          v => {
            if (typeof v === 'string') {
              r.push(v + '。')
            }
          }
        )
      }
      return r
    },
    [data]
  )

  if (data) {
    return <div className='pg-point hide-scroll'>
      <div className='pg-point--content'>
        <Breadcrumb to={-1}>返回</Breadcrumb>
        <Voice messages={voices} />
        <Title>
          { data.title }
        </Title>
        <div className='pg-point--texts'>
          {
            data.texts.map(
              (v, i) => <p key={i} className='pg-point--text'>{ v }</p>
            )
          }
        </div>
      </div>
    </div>
  }
  return null
}
Point.propTypes = {
}

export default memo(Point)
