import React, { memo, useEffect, useCallback, useMemo, useState } from 'react'
import './JPCourse.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import JPText from '@com/JPText'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import Footer from '@com/Page/Footer'
import jpWords from '@/consts/jp'

const JPCourse = () => {
  const navigate = useNavigate()
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
  const onPrevClick = useCallback(() => {
    if (detail) {
      const { no } = detail
      const nextNo = no - 1
      if (nextNo < 1) {
        const last = jpWords[jpWords.length - 1]
        const lastDetail = last.lesson[last.lesson.length - 1]
        navigate(`/jp-course?id=${last.id}&no=${lastDetail.no}`)
        return
      }
      const tar = jpWords.find(({ lesson }) =>
        lesson.some(v => v.no === nextNo)
      )
      if (tar) {
        navigate(`/jp-course?id=${tar.id}&no=${nextNo}`)
      }
    }
  }, [id, detail, navigate])
  const onNextClick = useCallback(() => {
    if (detail) {
      const { no } = detail
      const nextNo = no + 1
      const tar = jpWords.find(({ lesson }) =>
        lesson.some(v => v.no === nextNo)
      )
      if (tar) {
        navigate(`/jp-course?id=${tar.id}&no=${nextNo}`)
      } else {
        navigate('/jp-course?id=1&no=1')
      }
    }
  }, [id, detail, navigate])

  return (
    <Page>
      <Header to='/jp' title={<JPText content={title} />} />
      <Content hasFooter>
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
                  {v.length > 0 &&
                    v.map((v, i) => (
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
                {v.length > 0 &&
                  v.map((v, i) => (
                    <div key={i} className='pg-jp-course_line'>
                      <JPText content={v} />
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </Content>
      <Footer onPrevClick={onPrevClick} onNextClick={onNextClick} />
    </Page>
  )
}

export default memo(JPCourse)
