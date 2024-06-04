import React, { memo, useCallback } from 'react'
import './JP.styl'
import { useNavigate } from 'react-router-dom'
import junior from '@/consts/jp/junior'
import Box from '@/components/Box'
import Chapter from '@/components/Chapter'
import List from '@/components/List'
import Item from '@/components/Item'

const JP = () => {
  const navigate = useNavigate()
  const gotoJunior = useCallback(
    (chapter, no) => {
      navigate(`/jp-words-list?ch=${chapter}&no=${no}`)
    },
    [navigate]
  )
  return (
    <Box>
      {junior.map(({ chapter, title, lesson }, i) => (
        <List key={i}>
          <Chapter>{`第${chapter}单元 ${title}`}</Chapter>
          {lesson.map(({ topic, no }) => (
            <Item
              key={no}
              onClick={() => {
                gotoJunior(chapter, no)
              }}
            >{`第${no}課 ${topic}`}</Item>
          ))}
        </List>
      ))}
    </Box>
  )
}

export default memo(JP)
