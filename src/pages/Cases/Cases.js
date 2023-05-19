import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Cases.styl'
import { useNavigate } from 'react-router-dom'
import caseMap from '@/consts/case'
import Breadcrumb from '@com/Breadcrumb'

const cases = [
  '1-1',
  '1-2',
  '1-3',
  '2-1',
  '2-2',
  '2-3',
]

const Cases = () => {
  const navigate = useNavigate()

  const openPage = useCallback(
    key => {
      navigate(`/case?id=${key}`)
    },
    [navigate]
  )
  return <div className='pg-cases'>
    <div className='pg-cases--content'>
      <Breadcrumb to={-1}>返回</Breadcrumb>
      {
        cases.map(v =>
          <p
            key={v}
            className='pg-cases--item is-clickable'
            onClick={() => { openPage(v) }}
          >
            { caseMap[v].title }
          </p>
        )
      }
    </div>
  </div>
}
Cases.propTypes = {
}

export default memo(Cases)
