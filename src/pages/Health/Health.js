import React, { memo, useState, useMemo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Health.styl'
import { useSearchParams } from 'react-router-dom'
import { healthMap } from '@/consts/health'

const Health = () => {
  const [searchParams] = useSearchParams()
  const [dispLines, setDispLines] = useState(0)
  const data = useMemo(
    () => {
      const id = searchParams.get('id')
      if (id && healthMap[id]) {
        return healthMap[id]
      }
      return null
    },
    [searchParams]
  )
  const onClickContent = useCallback(
    () => {
      if (data && data.answer.length > dispLines) {
        setDispLines(
          dispLines => dispLines + 1
        )
      }
    }, [data, dispLines]
  )
  const dispData = useMemo(
    () => data ? data.answer.slice(0, dispLines) : [], [data, dispLines]
  )
  if (data) {
    return <div className='pg-health hide-scroll' onClick={onClickContent}>
      <p>{ data.ask }</p>
      {
        dispData.map(
          (v, i) => <p key={i}>
            { v }
          </p>
        )
      }
    </div>
  }
  return null
}
Health.propTypes = {
}

export default memo(Health)
