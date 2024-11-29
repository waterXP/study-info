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
import Breadcrumb from '@com/Breadcrumb'
import listen from '@/consts/jp/exec/listen'

const JPListen = () => {
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
    if (info) {
      const { id } = info
      const index = listen.findIndex(v => v.id === id)
      if (~index) {
        setInfo(listen[index > 0 ? index - 1 : listen.length - 1])
        return
      }
    }
    setInfo(listen[listen.length - 1])
  }, [info])
  const onNextClick = useCallback(() => {
    setAn([])
    if (info) {
      const { id } = info
      const index = listen.findIndex(v => v.id === id)
      if (~index) {
        setInfo(listen[index < listen.length - 1 ? index + 1 : 0])
        return
      }
    }
    setInfo(listen[1])
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
  return (
    <div className='pg-jp-listen hide-scroll'>
      <div className='pg-jp-listen_header'>
        <Breadcrumb to='/jp-listens' noTop ls>
          返回
        </Breadcrumb>
      </div>
      {info && (
        <div className='pg-jp-listen_content'>
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
      <div className='pg-jp-listen_footer'>
        {info && (
          <>
            {info.a && (
              <div className='pg-jp-listen_bottom-texts-wrap'>
                {info.a.map((v, sort) => (
                  <div key={sort} className='pg-jp-listen_bottom-texts'>
                    {v.map((v, i) => {
                      if (typeof an[sort] === 'number') {
                        if (an[sort] === i) {
                          return (
                            <div
                              key={i}
                              className={`pg-jp-listen_bottom-text${answerName[sort]}`}
                            >
                              {v}
                            </div>
                          )
                        }
                        return (
                          <div key={i} className='pg-jp-listen_bottom-text'>
                            {v}
                          </div>
                        )
                      }
                      return (
                        <p
                          key={i}
                          className='pg-jp-listen_bottom-text on-click'
                          onClick={() => {
                            updateAn(sort, i)
                          }}
                        >
                          {v}
                        </p>
                      )
                    })}
                  </div>
                ))}
              </div>
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
                        return (
                          <div key={i} className='pg-jp-listen_answer'>
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
        <div className='pg-jp-listen_buttons'>
          <div
            className='pg-jp-listen_corner-button on-click'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-jp-listen_corner-button is-right on-click'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(JPListen)
