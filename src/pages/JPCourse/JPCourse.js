import React, { memo, useEffect, useMemo, useState } from 'react'
import './JPCourse.styl'
import { useSearchParams } from 'react-router-dom'
import jpWords from '@/consts/jp'
import Breadcrumb from '@com/Breadcrumb'
import JPText from '@com/JPText'

const JPCourse = () => {
  const [searchParams] = useSearchParams()
  const [detail, setDetail] = useState(null)
  const [id, setId] = useState(1)
  useEffect(() => {
    const id = +searchParams.get('id')
    const no = +searchParams.get('no')
    if (id && no) {
      const tarCh = jpWords.find(v => v.id === id)
      if (tarCh) {
        const tarNo = tarCh.lesson.find(v => v.no === no)
        if (tarNo) {
          setId(id)
          setDetail(tarNo)
          return
        }
      }
    }
    const tar = jpWords[0].lesson[0]
    setId(1)
    setDetail(tar)
  }, [searchParams])

  const { base, use, topic, content, title } = useMemo(() => {
    if (detail) {
      const { no, topic, basic, utilization } = detail
      const { base, use } = basic || {}
      const { title, content } = utilization || {}
      return {
        title: `第${no}課 ${topic}`,
        base: base || [],
        use: use || [],
        topic: title || '',
        content: content || []
      }
    }
    return { title: '', base: [], use: [], topic: '', content: [] }
  }, [detail])

  return (
    <div className='pg-jp-course'>
      <div className='pg-jp-course_content'>
        <Breadcrumb to='/jp' noTop title={<JPText content={title} />}>
          返回
        </Breadcrumb>
        <div className='pg-jp-course_body'>
          {base.length > 0 && (
            <div className='pg-jp-course_block'>
              {base.map((v, i) => (
                <div key={i} className='pg-jp-course_line'>
                  <JPText content={v} />
                </div>
              ))}
            </div>
          )}
          {use.length > 0 && (
            <div className='pg-jp-course_block'>
              {use.map((v, i) => (
                <div key={i} className='pg-jp-course_set'>
                  {v.map((v, i) => (
                    <div key={i} className='pg-jp-course_line'>
                      <JPText content={v} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {topic && (
            <p className='pg-jp-course_topic'>
              <JPText content={topic} />
            </p>
          )}
          {content.length > 0 &&
            content.map((v, i) => (
              <div key={i} className='pg-jp-course_set'>
                {v.map((v, i) => (
                  <div key={i} className='pg-jp-course_line'>
                    <JPText content={v} />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default memo(JPCourse)
