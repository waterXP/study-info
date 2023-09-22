import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Book.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { bookMap } from '@/consts/books'
import Icon from '@/components/Icon'

const Book = () => {
  const navigate = useNavigate()
  const [inSpeaking, setInSpeaking] = useState(null)
  const showVoice = useMemo(
    () => {
      if (SpeechSynthesisUtterance && speechSynthesis) {
        return true
      }
      return false
    },
    []
  )
  useEffect(
    () => () => {
      speechSynthesis.cancel()
    },
    []
  )
  const onVoice = useCallback(
    (e, text) => {
      e.stopPropagation()
      navigator.clipboard.writeText(text)
      if (inSpeaking === text) {
        setInSpeaking(null)
        speechSynthesis.cancel()
      } else {
        if (inSpeaking !== null) {
          speechSynthesis.cancel()
        }
        setInSpeaking(text)
        const msg = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(msg)
        msg.addEventListener(
          'end', () => {
            setInSpeaking(null)
          }
        )
      }
    },
    [inSpeaking]
  )
  const [isFull, setIsFull] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  const [searchParams] = useSearchParams()
  const data = useMemo(
    () => {
      const id = searchParams.get('id')
      if (id && bookMap[id]) {
        return bookMap[id]
      }
      return null
    },
    [searchParams]
  )
  const gotoPrev = useCallback(
    () => { setPageNo(pageNo => pageNo - 1) }, []
  )
  const gotoNext = useCallback(
    () => { setPageNo(pageNo => pageNo + 1) }, []
  )
  const info = useMemo(
    () => {
      if (pageNo > 0) {
        return data.pages[pageNo - 1]
      }
      return null
    },
    [pageNo, data]
  )
  const contentClassName = useMemo(
    () => isFull ? 'pg-book_page-content is-full' : 'pg-book_page-content',
    [isFull]
  )
  const toggleFull = useCallback(
    () => {
      setIsFull(isFull => !isFull)
    },
    []
  )
  const gotoMenu = useCallback(
    () => {
      navigate(`/books`)
    },
    []
  )
  if (data) {
    return <div className='pg-book'>
      {
        info
          ? <>
            {
              info.src &&
              <img className={contentClassName} src={info.src} alt='page' />
            }
          </>
          : <img className={contentClassName} src={data.cover} alt='cover' />
      }
      {
        pageNo > 0 &&
        <div className='pg-book_prev' onClick={gotoPrev} />
      }
      {
        data.pages[pageNo] &&
        <div className='pg-book_next' onClick={gotoNext} />
      }
      <div className='pg-book_footer'>
        <div className='pg-book_texts-wrap'>
          {
            pageNo === 0
              ? <>
                <p className='pg-book_page-title'>{ data.title }</p>
                {
                  data.translate &&
                  <p className='pg-book_page-trans-title'>
                    { data.translate }
                  </p>
                }
                <p className='pg-book_page-authors'>
                  {
                    `-- ${
                      data.author
                    }${
                      data.illustrator ? ` / ${data.illustrator}` : ''
                    }  `
                  }
                </p>
              </>
              : info && info.content && info.content.map(
                ({ text, translate }) => <div
                  key={text}
                  className='pg-book_page-texts'
                >
                  <p className='pg-book_page-text-wrap'>
                    <span
                      className={
                        inSpeaking === text
                          ? 'pg-book_page-text is-active'
                          : 'pg-book_page-text'
                      }
                    >
                      { text }
                    </span>
                    {
                      showVoice &&
                      <Icon
                        className={
                          inSpeaking === text
                            ? 'pg-book_page-text--voice is-clickable is-active'
                            : 'pg-book_page-text--voice is-clickable'
                        }
                        type='icon-31shengbo'
                        onClick={e => [ onVoice(e, text) ]}
                      />
                    }
                  </p>
                  <p className='pg-book_page-translate'>{ translate }</p>
                </div>
              )
          }
        </div>
        <div className='pg-book_options'>
          <Icon
            className='pg-book_option is-clickable'
            type={isFull ? 'icon-quxiaoquanping' : 'icon-quanping'}
            onClick={toggleFull}
          />
          <Icon
            className='pg-book_option is-clickable'
            type='icon-category'
            onClick={gotoMenu}
          />
        </div>
        <span className='pg-book_page-no'>{ pageNo + 1 }</span>
        <div className='pg-book_pagination'>
          <span
            className={pageNo === 0 ? 'pg-book_no is-current' : 'pg-book_no'}
          >
            1
          </span>
          {
            data.pages.map(
              (_, i) => <span
                key={i}
                className={
                  pageNo === i + 1 ? 'pg-book_no is-current' : 'pg-book_no'
                }
              >
                { i + 2 }
              </span>
            )
          }
        </div>
      </div>
    </div>
  }
  return null
}
Book.propTypes = {
}

export default memo(Book)
