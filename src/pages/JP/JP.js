import React, { memo, useMemo, useCallback, useEffect, useRef } from 'react'
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

const JP_SCROLL_TOP_KEY = 'JP_SCROLL_TOP'

const JP = () => {
  const favorites = useSelector(({ favorites }) => favorites)
  const navigate = useNavigate()
  const refContent = useRef(null)
  const getScrollContainer = useCallback(() => {
    if (!refContent.current) {
      return null
    }
    return refContent.current.closest('.com-content')
  }, [])
  useEffect(() => {
    const savedScrollTop =
      typeof window !== 'undefined'
        ? window.sessionStorage.getItem(JP_SCROLL_TOP_KEY)
        : ''
    const container = getScrollContainer()
    if (savedScrollTop && container) {
      const top = +savedScrollTop
      window.sessionStorage.removeItem(JP_SCROLL_TOP_KEY)
      window.requestAnimationFrame(() => {
        container.scrollTop = top
      })
    }
  }, [getScrollContainer])
  const saveScrollTop = useCallback(() => {
    const container = getScrollContainer()
    if (typeof window !== 'undefined' && container) {
      window.sessionStorage.setItem(
        JP_SCROLL_TOP_KEY,
        `${container.scrollTop || 0}`
      )
    }
  }, [getScrollContainer])
  const navigateWithScrollTop = useCallback(
    to => {
      saveScrollTop()
      navigate(to)
    },
    [navigate, saveScrollTop]
  )
  const gotoCourse = useCallback(
    (id, no) => {
      navigateWithScrollTop(`/jp-course?id=${id}&no=${no}`)
    },
    [navigateWithScrollTop]
  )
  const gotoStructure = useCallback(
    (id, no) => {
      navigateWithScrollTop(`/jp-structure?id=${id}&no=${no}`)
    },
    [navigateWithScrollTop]
  )
  const gotoWords = useCallback(
    (id, no) => {
      navigateWithScrollTop(`/jp-words-list?id=${id}&no=${no}`)
    },
    [navigateWithScrollTop]
  )
  const gotoLessonFavorites = useCallback(
    (id, no) => {
      navigateWithScrollTop(`/jp-favorites?id=${id}&no=${no}`)
    },
    [navigateWithScrollTop]
  )
  const lessonFavoriteCountMap = useMemo(() => {
    const countMap = {}
    ;[...junior, ...intermediate].forEach(({ id, lesson = [] }) => {
      lesson.forEach(({ no, word = [], phrase = [] }) => {
        const count = [...word, ...phrase].filter(({ id }) => favorites[id]).length
        countMap[`${id}-${no}`] = count
      })
    })
    return countMap
  }, [favorites])
  const favoriteCount = useMemo(
    () => words.filter(({ id }) => favorites[id]).length,
    [favorites]
  )
  const gotoFavorites = useCallback(() => {
    navigateWithScrollTop('/jp-favorites')
  }, [navigateWithScrollTop])
  return (
    <Page>
      <Header to='/' type='jp' />
      <Content>
        <div ref={refContent}>
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
                    <JPText
                      content={`第${no}課 ${topic}${
                        lessonFavoriteCountMap[`${id}-${no}`]
                          ? `（${lessonFavoriteCountMap[`${id}-${no}`]}）`
                          : ''
                      }`}
                    />
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
                    <div
                      className='pg-jp_option on-click'
                      onClick={() => {
                        gotoLessonFavorites(id, no)
                      }}
                    >
                      習
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
                    <JPText
                      content={`第${no}課 ${topic}${
                        lessonFavoriteCountMap[`${id}-${no}`]
                          ? `（${lessonFavoriteCountMap[`${id}-${no}`]}）`
                          : ''
                      }`}
                    />
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
                    <div
                      className='pg-jp_option on-click'
                      onClick={() => {
                        gotoLessonFavorites(id, no)
                      }}
                    >
                      習
                    </div>
                  </div>
                </div>
              ))}
            </List>
          ))}
        </div>
        </div>
      </Content>
    </Page>
  )
}

export default memo(JP)
