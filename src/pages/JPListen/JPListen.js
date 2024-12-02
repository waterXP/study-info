import React, {
  memo,
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react'
import './JPListen.styl'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import Footer from '@com/Page/Footer'
import listen from '@/consts/jp/listen'
import { getPrev, getNext } from '@/utils/tool'

const JPListen = () => {
  const [cur, setCur] = useState(0)
  const [an, setAn] = useState([])
  const [info, setInfo] = useState(null)
  const [searchParams] = useSearchParams()
  const showLs = useSelector(({ showLs }) => showLs)
  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const tar = listen.find(v => v.id === id)
      if (tar) {
        setInfo(tar)
        return
      }
    }
    setInfo(listen[0])
  }, [searchParams])
  const onPrevClick = useCallback(() => {
    setAn([])
    setCur(0)
    const prev = getPrev(info, listen)
    setInfo(prev || listen[listen.length - 1])
  }, [info])
  const onNextClick = useCallback(() => {
    setAn([])
    setCur(0)
    const next = getNext(info, listen)
    setInfo(next || 1)
  }, [info])
  const { showQa, answerName } = useMemo(() => {
    const r = { showQa: false, answerName: [] }
    if (info && info.d) {
      r.showQa = true
      info.d.forEach((v, i) => {
        if (typeof an[i] === 'number') {
          if (an[i] === v) {
            r.answerName[i] = ' is-correct'
          } else {
            r.answerName[i] = ' is-error'
          }
        } else {
          r.answerName[i] = ''
        }
      })
    }
    return r
  }, [an, info])
  const updateAn = useCallback((i, v) => {
    setAn(an => {
      const r = [...an]
      r[i] = v
      return r
    })
  }, [])
  useEffect(() => {
    setCur(cur => {
      if (typeof an[cur] === 'number') {
        const list = info.a || info.qa
        if (list.length > 0) {
          let index = cur
          for (let i = 0; i < list.length; i++) {
            if (typeof an[index] !== 'number') {
              break
            }
            index = list[index + 1] ? index + 1 : 0
          }
          if (typeof an[index] !== 'number') {
            return index
          }
        }
      }
      return cur
    })
  }, [an, info])
  const curIndex = useMemo(() => {
    if (info && info.a && info.a.length > 1) {
      return info.a[cur] ? cur : 0
    }
    return 0
  }, [info, cur])
  return (
    <Page>
      <Header to='/jp-listens' ls />
      <Content hasFooter>
        {info && (
          <div className='pg-jp-listen_body'>
            <p className='pg-jp-listen_topic'>{info.id}</p>
            {showLs && (
              <>
                {info.q.map((v, i) => (
                  <p key={i} className='pg-jp-listen_text'>
                    {v}
                  </p>
                ))}
                {info.qa &&
                  info.qa.map((v, sort) => (
                    <Fragment key={sort}>
                      {v.map((v, i) => {
                        if (showQa && info.d[sort] === i) {
                          return (
                            <p
                              key={i}
                              className={`pg-jp-listen_text${answerName[sort]}`}
                            >
                              {v}
                            </p>
                          )
                        }
                        return (
                          <p key={i} className='pg-jp-listen_text'>
                            {v}
                          </p>
                        )
                      })}
                    </Fragment>
                  ))}
              </>
            )}
          </div>
        )}
      </Content>
      <Footer onPrevClick={onPrevClick} onNextClick={onNextClick}>
        {info && (
          <>
            {info.a && info.a.length > 0 && (
              <>
                <div className='pg-jp-listen_bottom-texts'>
                  {info.a[curIndex].map((v, i) => {
                    if (typeof an[curIndex] === 'number') {
                      if (an[curIndex] === i) {
                        return (
                          <div
                            key={i}
                            className={`pg-jp-listen_bottom-text${answerName[curIndex]}`}
                          >
                            {v}
                          </div>
                        )
                      }
                      const d = info.d || []
                      const exName =
                        i === d[curIndex]
                          ? 'pg-jp-listen_bottom-text is-correct'
                          : 'pg-jp-listen_bottom-text'
                      return (
                        <div key={i} className={exName}>
                          {v}
                        </div>
                      )
                    }
                    return (
                      <p
                        key={i}
                        className='pg-jp-listen_bottom-text on-click'
                        onClick={() => {
                          updateAn(curIndex, i)
                        }}
                      >
                        {v}
                      </p>
                    )
                  })}
                </div>
                {info.a.length > 1 && (
                  <div className='pg-jp-listen_a-list'>
                    {info.a.map((_, i) => {
                      const isCurrent = curIndex === i
                      if (isCurrent) {
                        return (
                          <div
                            key={i}
                            className={`pg-jp-listen_a-box is-current${answerName[i]}`}
                          >
                            {i + 1}
                          </div>
                        )
                      }
                      return (
                        <div
                          key={i}
                          className={`pg-jp-listen_a-box on-click${answerName[i]}`}
                          onClick={() => {
                            setCur(i)
                          }}
                        >
                          {i + 1}
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}
            {showQa && info.qa && (
              <div className='pg-jp-listen_answers'>
                {info.qa.map((v, sort) => (
                  <Fragment key={sort}>
                    {v.map((_, i) => {
                      if (typeof an[sort] === 'number') {
                        if (an[sort] === i) {
                          return (
                            <div
                              key={i}
                              className={`pg-jp-listen_answer${answerName[sort]}`}
                            >
                              {i + 1}
                            </div>
                          )
                        }
                        const d = info.d || []
                        const exName =
                          i === d[sort]
                            ? 'pg-jp-listen_answer is-correct'
                            : 'pg-jp-listen_answer'
                        return (
                          <div key={i} className={exName}>
                            {i + 1}
                          </div>
                        )
                      }
                      return (
                        <div
                          key={i}
                          className='pg-jp-listen_answer on-click'
                          onClick={() => {
                            updateAn(sort, i)
                          }}
                        >
                          {i + 1}
                        </div>
                      )
                    })}
                  </Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </Footer>
    </Page>
  )
}

export default memo(JPListen)
