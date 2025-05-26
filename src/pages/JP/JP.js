import React, { memo, useMemo, useCallback } from 'react'
import './JP.styl'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Chapter from '@com/Chapter'
import List from '@com/List'
import Item from '@com/Item'
import JPText from '@com/JPText'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import intermediate from '@/consts/jp/intermediate'
import junior from '@/consts/jp/junior'
import { words } from '@/consts/jp'

const JP = () => {
  const { favorites } = useSelector(({ favorites }) => ({ favorites }))
  const navigate = useNavigate()
  const gotoCourse = useCallback(
    (id, no) => {
      navigate(`/jp-course?id=${id}&no=${no}`)
    },
    [navigate]
  )
  const gotoStructure = useCallback(
    (id, no) => {
      navigate(`/jp-structure?id=${id}&no=${no}`)
    },
    [navigate]
  )
  const gotoWords = useCallback(
    (id, no) => {
      navigate(`/jp-words-list?id=${id}&no=${no}`)
    },
    [navigate]
  )
  const favoriteCount = useMemo(
    () => words.filter(({ id }) => favorites[id]).length,
    [favorites]
  )
  const gotoFavorites = useCallback(() => {
    navigate('/jp-favorites')
  }, [navigate])
  return (
    <Page>
      <Header to='/' type='jp' />
      <Content>
        {favoriteCount > 0 && (
          <p
            className='pg-jp_topic on-click'
            onClick={gotoFavorites}
          >{`收藏单词（${favoriteCount}）`}</p>
        )}
        <p className='pg-jp_topic'>初级</p>
        <div className='pg-jp_list'>
          {junior.map(({ id, chapter, title, lesson }) => (
            <List key={id}>
              <Chapter>{`第${chapter}单元 ${title}`}</Chapter>
              {lesson.map(({ topic, no }) => (
                <div key={no}>
                  <Item
                    onClick={() => {
                      gotoCourse(id, no)
                    }}
                  >
                    <JPText content={`第${no}課 ${topic}`} />
                  </Item>
                  <div className='pg-jp_options'>
                    <div
                      className='pg-jp_option on-click'
                      onClick={() => {
                        gotoCourse(id, no)
                      }}
                    >
                      基
                    </div>
                    <div
                      className='pg-jp_option on-click'
                      onClick={() => {
                        gotoStructure(id, no)
                      }}
                    >
                      構
                    </div>
                    <div
                      className='pg-jp_option on-click'
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
        </div>
        <p className='pg-jp_topic'>中级</p>
        <div className='pg-jp_list'>
          {intermediate.map(({ id, chapter, title, lesson }) => (
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
                      className='pg-jp_option on-click'
                      onClick={() => {
                        gotoCourse(id, no)
                      }}
                    >
                      基
                    </div>
                    <div
                      className='pg-jp_option on-click'
                      onClick={() => {
                        gotoWords(id, no)
                      }}
                    >
                      構
                    </div>
                    <div
                      className='pg-jp_option on-click'
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
        </div>
      </Content>
    </Page>
  )
}

export default memo(JP)
