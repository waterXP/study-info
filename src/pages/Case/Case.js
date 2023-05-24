import React, { memo, useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Case.styl'
import { useSearchParams } from 'react-router-dom'
import caseMap from '@/consts/case'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'
import Voice from '@com/Voice'

const Case = () => {
  const [searchParams] = useSearchParams()

  const data = useMemo(
    () => {
      const id = searchParams.get('id')
      if (id && caseMap[id]) {
        return caseMap[id]
      }
      return null
    },
    [searchParams]
  )

  const voices = useMemo(
    () => {
      const r = []
      if (data) {
        r.push(data.title + '。')
        data.explains.forEach(
          v => {
            if (typeof v === 'string') {
              r.push(v + '。')
            }
          }
        )
        data.contents.forEach(
          ({ q, a }) => {
            q.map(
              v => {
                if (typeof v === 'string') {
                  r.push(v + '。')
                }
              }
            )
            a.map(
              v => {
                if (typeof v === 'string') {
                  r.push(v + '。')
                }
              }
            )
          }
        )
      }
      return r
    },
    [data]
  )

  if (data) {
    return <div className='pg-case hide-scroll'>
      <div className='pg-case--content'>
        <Breadcrumb to={-1}>返回</Breadcrumb>
        <Voice messages={voices} />
        <div className='pg-case--body'>
          <Title>
            { data.title }
          </Title>
          <div className='pg-case--explains'>
            {
              data.explains.map(
                (v, i) => {
                  if (v && v.type === 'image') {
                    return <img
                      key={i}
                      className='pg-case--image'
                      style={v.style}
                      src={`assets/${v.name}`}
                    />
                  }
                  return <p key={i} className='pg-case--explain'>{ v }</p>
                }
              )
            }
          </div>
          {
            data.contents.map(
              ({ q, a }, i) => <div className='pg-case-item' key={i}>
                {
                  q.map((v, i) => {
                    if (v && v.type === 'image') {
                      return <img
                        key={i}
                        className='pg-case--image'
                        style={v.style}
                        src={`assets/${v.name}`}
                      />
                    }
                    return <p key={i} className='pg-case--q'>{ v }</p>
                  })
                }
                {
                  a.map((v, i) => {
                    if (v && v.type === 'image') {
                      return <img
                        key={i}
                        className='pg-case--image'
                        style={v.style}
                        src={`assets/${v.name}`}
                      />
                    }
                    return <p key={i} className='pg-case--a'>{ v }</p>
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  }
  return null
}
Case.propTypes = {
}

export default memo(Case)
