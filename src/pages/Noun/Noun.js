import React, { memo, useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Noun.styl'
import nouns from '@/consts/nouns'
import itto from '@/consts/itto'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'

const Noun = ({ id }) => {
  const [searchParams] = useSearchParams()

  const data = useMemo(
    () => {
      const id = searchParams.get('id')
      if (id && nouns[id]) {
        const arr = id.split('-')
        const r = {
          content: nouns[id].content || [],
          important: nouns[id].important
        }
        if (arr.length > 2) {
          const mainId = arr.slice(0, 2).join('-')
          if (itto[mainId]) {
            const subId = arr.slice(0, 3).join('-')
            const { i, tt, o, title } = itto[mainId]
            const temp = [...(i || []), ...(tt || []), ...(o || [])]
            const sub = temp.find(v => v.id === subId)
            if (sub) {
              r.title = `${title}/${sub.title}`
              return r
            }
            r.title = itto[mainId].title
            return r
          }
        } else if (arr.length > 1) {
          const mainId = arr.slice(0, 2).join('-')
          if (itto[mainId]) {
            r.title = itto[mainId].title
            return r
          }
        }
        return r
      }
      return null
    },
    [searchParams]
  )

  if (data) {
    return <div className='pg-noun hide-scroll'>
      <div className='pg-itto--content'>
        <Breadcrumb to={-1}>返回</Breadcrumb>
        <Title>
          <span
            className={
              data.important
                ? 'pg-itto--important-title'
                : ''
            }
          >
            { data.title }
          </span>
        </Title>
        <div className='pg-itto--detail'>
          {
            data.content.map(
              (v, i) => <p key={`${id}--${i}`} className='pg-noun--item'>
                { v }
              </p>
            )
          }
        </div>
      </div>
    </div>
  }

  return null
}
Noun.propTypes = {
}

export default memo(Noun)
