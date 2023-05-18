import React, { memo,useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Point.styl'
import { useSearchParams } from 'react-router-dom'
import points from '@/consts/points'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'

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

  if (data) {
    return <div className='pg-point hide-scroll'>
      <div className='pg-point--content'>
        <Breadcrumb to={-1}>返回</Breadcrumb>
        <Title>
          { data.title }
        </Title>
        <p class='pg-point--texts'>{ data.texts }</p>
      </div>
    </div>
  }
  return null
}
Point.propTypes = {
}

export default memo(Point)
