import React, { memo, useCallback } from 'react'
import './JP.styl'
import { useNavigate } from 'react-router-dom'
import jpWords from '@/consts/jp'
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
      {jpWords.map(({ id, chapter, title, lesson }) => (
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
