import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Papers.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'

const papers = [
  {
    id: 'frame',
    name: '框架'
  }, {
    id: 'risk',
    name: '风险管理'
  }, {
    id: 'resource',
    name: '项目资源管理'
  }, {
    id: 'integration',
    name: '整合管理'
  }, {
    id: 's-risk',
    name: '风险管理主线'
  }, {
    id: 's-resource',
    name: '资源管理主线'
  }, {
    id: 's-integration',
    name: '整合管理主线'
  }, {
    id: 's-cost',
    name: '成本管理主线'
  }, {
    id: 's-process',
    name: '进度管理主线'
  }
]

const Papers = () => {
  const navigate = useNavigate()

  const openPage = useCallback(
    id => {
      navigate(`/paper?id=${id}`)
    },
    [navigate]
  )
  return <div className='pg-papers'>
    <div className='pg-papers--content'>
      <Breadcrumb to={-1}>返回</Breadcrumb>
      {
        papers.map(({ id, name }) =>
          <p
            key={id}
            className='pg-papers--item is-clickable'
            onClick={() => { openPage(id) }}
          >
            { name }
          </p>
        )
      }
    </div>
  </div>
}
Papers.propTypes = {
}

export default memo(Papers)
