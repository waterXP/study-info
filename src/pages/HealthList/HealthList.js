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
  return <div className='health-list'>
    {
      texts.map(
        ({ id, title, content }) => <div key={id}>
          <p>{ title }</p>
          {
            content.map(
              ({ id, ask }) => <div
                key={id}
                className='is-clickable'
                onClick={e => { gotoHealth(e, id) }}
              >
                <p>{ ask }</p>
              </div>
            )
          }
        </div>
      )
    }
  </div>
}
HealthList.propTypes = {
}

export default memo(HealthList)
