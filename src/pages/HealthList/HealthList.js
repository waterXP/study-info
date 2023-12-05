import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './HealthList.styl'
import { useNavigate } from 'react-router-dom'
import texts from '@/consts/health'

const HealthList = () => {
  const navigate = useNavigate()
  const gotoHealth = useCallback(
    (e, id) => {
      e.stopPropagation()
      navigate(`/health?id=${id}`)
    },
    []
  )
  return <div className='pg-health-list'>
    <div className='pg-health-list_content'>
      {
        texts.map(
          ({ id, title, content }) => <div key={id}>
            <p className='pg-health-list_title'>{ title }</p>
            <div className='pg-health-list_answers'>
              {
                content.map(
                  ({ id, ask }) => <div
                    key={id}
                    className='pg-health-list_item is-clickable'
                    onClick={e => { gotoHealth(e, id) }}
                  >
                    <p>{ ask[0] }</p>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  </div>
}
HealthList.propTypes = {
}

export default memo(HealthList)
