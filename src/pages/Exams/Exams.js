import React, { memo, useCallback } from 'react'
import './Exams.styl'
import { useNavigate } from 'react-router-dom'
import exams from '@/consts/exams'

const Exams = () => {
  const navigate = useNavigate()
  const goHome = useCallback(() => {
    navigate('/')
  }, [navigate])
  const gotoExam = useCallback(
    id => {
      navigate(`/exam?id=${id}`)
    },
    [navigate]
  )
  return (
    <div className='pg-exams'>
      <p className='pg-exams_link is-clickable' onClick={goHome}>
        首页
      </p>
      {exams.map(({ id, title }) => (
        <p
          key={id}
          className='pg-exams_link is-clickable'
          onClick={() => {
            gotoExam(id)
          }}
        >
          {title}
        </p>
      ))}
    </div>
  )
}

export default memo(Exams)
