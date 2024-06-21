import React, { memo, useCallback } from 'react'
import './JP.styl'
import { useNavigate } from 'react-router-dom'
import junior from '@/consts/jp/junior'
import intermediate from '@/consts/jp/intermediate'
import Box from '@com/Box'
import Chapter from '@com/Chapter'
import List from '@com/List'
import Item from '@com/Item'
import JPText from '@com/JPText'

const JP = () => {
  const navigate = useNavigate()
  const gotoCourse = useCallback(
    (id, no) => {
      navigate(`/jp-course?id=${id}&no=${no}`)
    },
    [navigate]
  )
  const gotoWords = useCallback(
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
            <div key={no}>
              <Item
                onClick={() => {
                  gotoWords(id, no)
                }}
              >
                <JPText content={`第${no}課 ${topic}`} />
              </Item>
              <div className='pg-jp_options'>
                <div
                  className='pg-jp_option is-clickable'
                  onClick={() => {
                    gotoCourse(id, no)
                  }}
                >
                  基
                </div>
                <div
                  className='pg-jp_option is-clickable'
                  onClick={() => {
                    gotoWords(id, no)
                  }}
                >
                  構
                </div>
                <div
                  className='pg-jp_option is-clickable'
                  onClick={() => {
                    gotoWords(id, no)
                  }}
                >
                  語
                </div>
              </div>
            </div>
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
                gotoWords(id, no)
              }}
            >
              <JPText content={`第${no}課 ${topic}`} />
            </Item>
          ))}
        </List>
      ))}
    </Box>
  )
}

export default memo(JP)
