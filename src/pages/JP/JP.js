import React, { memo, useCallback } from 'react'
import './JP.styl'
import { useNavigate } from 'react-router-dom'
import junior from '@/consts/jp/junior'
import intermediate from '@/consts/jp/intermediate'
import Box from '@/components/Box'
import Chapter from '@/components/Chapter'
import List from '@/components/List'
import Item from '@/components/Item'

const JP = () => {
  const navigate = useNavigate()
  const gotoJunior = useCallback(
    (id, no) => {
      navigate(`/jp-words-list?id=${id}&no=${no}`)
    },
    [navigate]
  )
  return (
    <Box>
      <p className='pg-jp_topic'>初级</p>
      {junior.map(({ id, chapter, title, lesson }) => (
        <List key={id}>
          <Chapter>{`第${chapter}单元 ${title}`}</Chapter>
          {lesson.map(({ topic, no }) => (
            <Item
              key={no}
              onClick={() => {
                gotoJunior(id, no)
              }}
            >{`第${no}課 ${topic}`}</Item>
          ))}
        </List>
      ))}
      <p className='pg-jp_topic'>中级</p>
      {intermediate.map(({ id, chapter, title, lesson }) => (
        <List key={id}>
          <Chapter>{`第${chapter}单元 ${title}`}</Chapter>
          {lesson.map(({ topic, no }) => (
            <Item
              key={no}
              onClick={() => {
                gotoJunior(id, no)
              }}
            >{`第${no}課 ${topic}`}</Item>
          ))}
        </List>
      ))}
    </Box>
  )
}

export default memo(JP)
