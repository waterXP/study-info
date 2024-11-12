import React, { memo, useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Paper.styl'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'
import Voice from '@com/Voice'
import paperMap from '@/consts/paper'

const Paper = () => {
  const [searchParams] = useSearchParams()

  const data = useMemo(
    () => {
      const id = searchParams.get('id')
      if (id && paperMap[id]) {
        return paperMap[id]
      }
      return null
    },
    [searchParams]
  )

  const voices = useMemo(
    () => {
      const r = []
      if (data) {
        data.forEach(
          v => {
            r.push(`${v.title}。`)
            v.contents.forEach(
              v => r.push(`${v}。`)
            )
          }
        )
      }
      return r
    },
    [data]
  )

  if (data) {
    return <div className='pg-paper hide-scroll'>
      <div className='pg-paper_content'>
        <Breadcrumb to={-1}>返回</Breadcrumb>
        <Voice messages={voices} />
        <div className='pg-paper_body'>
          {
            data.map(
              ({ id, title, contents }) => <div key={id}>
                <Title>
                  { title }
                </Title>
                <div className='pg-paper_list'>
                  {
                    contents.map(
                      (v, i) => <p key={i} className='pg-paper_item'>{ v }</p>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  }
  return null
}
Paper.propTypes = {
}

export default memo(Paper)
