import React, { memo, useState, useEffect, useMemo, useCallback } from 'react'
import './Exam.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import list, { exams } from '@/consts/exams'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'
import Voice from '@com/Voice'

const Exam = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    const id = searchParams.get('id')
    const content = exams[id]
    if (content) {
      const { q, a } = content
      setData({
        id: +id,
        q,
        a
      })
    }
  }, [searchParams])
  const onPrevClick = useCallback(() => {
    const index = list.findIndex(({ id }) => id === data.id)
    if (~index) {
      setData(null)
      const nextIndex = index === 0 ? list.length - 1 : index - 1
      const target = exams[list[nextIndex].id]
      const { id, q, a } = target
      setData({ id, q, a })
    }
  }, [navigate, data])
  const onNextClick = useCallback(() => {
    const index = list.findIndex(({ id }) => id === data.id)
    if (~index) {
      setData(null)
      const nextIndex = index === list.length - 1 ? 0 : index + 1
      const target = exams[list[nextIndex].id]
      const { id, q, a } = target
      setData({ id, q, a })
    }
  }, [navigate, data])
  const voices = useMemo(() => (data ? [...data.q, data.a] : []), [data])
  if (data) {
    return (
      <div className='pg-exam'>
        <div className='pg-exam_content'>
          <Breadcrumb to={-1}>返回</Breadcrumb>
          <Voice messages={voices} />
          <Title>
            {data.q.map((v, i) => (
              <p key={i} class='pg-exam_title'>{v}</p>
            ))}
          </Title>
          <div className='pg-exam_detail'>
            {data.a.map((v, i) => (
              <p key={i} className='pg-exam_item'>
                {v}
              </p>
            ))}
          </div>
        </div>
        <div className='pg-exam_footer'>
          <div className='pg-exam_buttons'>
            <div
              className='pg-exam_corner-button is-clickable'
              onClick={onPrevClick}
            >
              上一个
            </div>
            <div
              className='pg-exam_corner-button is-right is-clickable'
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

export default memo(Exam)
