import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
import './JPGrammarExec.styl'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import Footer from '@com/Page/Footer'
import grammar from '@/consts/jp/exec/grammar'

const getList = info => [
  ...info.select.map(v => ({ ...v, type: 'select' })),
  ...info.combination.map(v => ({ ...v, type: 'combination' })),
  ...info.essay.map(v => ({ ...v, type: 'essay' }))
]

const JPGrammar = () => {
  const [info, setInfo] = useState(null)
  const showQa = useSelector(({ showQa }) => showQa)
  const [cur, setCur] = useState(0)
  const [ans, setAns] = useState([])
  const [index, setIndex] = useState(0)
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const id = +searchParams.get('id')
    const tar = grammar.find(v => v.id === id)
    if (tar) {
      setInfo(tar)
    } else {
      setInfo(grammar[0])
    }
  }, [searchParams])
  const list = useMemo(() => (info ? getList(info) : null), [info])
  const tar = useMemo(
    () => (list ? list[index] || list[0] : null),
    [index, list]
  )
  const onPrevClick = useCallback(() => {
    if (list) {
      setIndex(index => {
        const next = --index
        if (list[next]) {
          return next
        }
        return list.length - 1
      })
    }
  }, [list])
  const onNextClick = useCallback(() => {
    if (list) {
      setIndex(index => {
        const next = ++index
        if (list[next]) {
          return next
        }
        return 0
      })
    }
  }, [list])
  useEffect(() => {
    if (tar && !tar.a[cur]) {
      setCur(0)
    }
  }, [cur, tar])
  const answer = useMemo(() => {
    if (tar) {
      return tar.a[cur]
    }
    return null
  }, [tar, cur])
  const { answerName, an } = useMemo(() => {
    const r = { an: [], answerName: [] }
    if (list) {
      const tar = list[index]
      if (tar) {
        const an = ans[index]
        if (an && tar.d) {
          r.an = an
          an.forEach((v, i) => {
            if (typeof v === 'number') {
              r.answerName[i] = v === tar.d[i] ? ' is-correct' : ' is-error'
            }
          })
        }
      }
    }
    return r
  }, [ans, list, index])
  const onAnswer = useCallback(
    i => {
      if (list) {
        const tar = list[index]
        if (tar) {
          setAns(ans => {
            const an = [...(ans[index] || [])]
            an[cur] = i
            const r = [...ans]
            r[index] = an
            return r
          })
        }
      }
    },
    [list, index, cur]
  )
  const ques = useMemo(() => {
    if (tar) {
      const { q, type, d, a, s } = tar
      let i = 0
      if (type === 'combination') {
        const values = s.map(v => a[i][v])
        const v = d[i]
        const aa = an[i]
        if (a[i] && typeof aa === 'number' && typeof v === 'number') {
          const style = aa === v ? 'is-correct' : 'is-error'
          return q.join('\n').replace(/__.?__/g, str => {
            if (values[i]) {
              if (str === '__★__') {
                return `<span class='${style} is-star'>${values[i++]}</span>`
              }
              return `<span class='${style}'>${values[i++]}</span>`
            }
            return str
          })
        }
        return q.join('\n').replace(/__★__/g, str => {
          if (i++ === cur) {
            return `<span class='is-current'>${str}</span>`
          }
          return str
        })
      }
      return q.join('\n').replace(/__.?__/g, str => {
        const v = d[i]
        const aa = an[i]
        if (a[i] && typeof aa === 'number' && typeof v === 'number') {
          const str = aa === v ? 'is-correct' : 'is-error'
          return `<span class='${str}'>${a[i++][v]}</span>`
        }
        if (i++ === cur) {
          return `<span class='is-current'>${str}</span>`
        }
        return str
      })
    }
    return ''
  }, [tar, cur, an])
  return (
    <Page>
      <Header to='/jp-grammars-exec' qa>
        {list && (
          <div className='pg-jp-grammar-exec_process'>
            {list.map((v, i) => {
              const { d } = v
              const aa = ans[i] || []
              const cName = ['pg-jp-grammar-exec_p']
              const isCurrent = index === i
              if (isCurrent) {
                cName.push('is-current')
              } else {
                cName.push('on-click')
              }
              let hasError = false
              const ful = d.every((v, i) => {
                if (typeof aa[i] === 'number') {
                  if (aa[i] !== v) {
                    hasError = true
                  }
                  return true
                }
                return false
              })
              if (ful) {
                if (hasError) {
                  cName.push('is-error')
                } else {
                  cName.push('is-correct')
                }
              }
              if (isCurrent) {
                return <div key={i} className={cName.join(' ')} />
              }
              return (
                <div
                  key={i}
                  className={cName.join(' ')}
                  onClick={() => {
                    setIndex(i)
                  }}
                />
              )
            })}
          </div>
        )}
      </Header>
      <Content hasFooter>
        {tar && (
          <>
            {tar.pre && <p className='pg-jp-grammar-exec_pre'>{tar.pre}</p>}
            {tar.title && <p className='pg-jp-grammar-exec_title'>{tar.title}</p>}
            {tar.author && <p className='pg-jp-grammar-exec_author'>{tar.author}</p>}
            <div
              className='pg-jp-grammar-exec_block'
              dangerouslySetInnerHTML={{ __html: ques }}
            />
          </>
        )}
      </Content>
      <Footer onPrevClick={onPrevClick} onNextClick={onNextClick}>
        {showQa && (
          <>
            <div className='pg-jp-grammar-exec_line' />
            {answer && (
              <div>
                {answer.map((v, i) => {
                  const correct = tar.d ? tar.d[cur] : null
                  if (an && typeof an[cur] === 'number') {
                    if (an[cur] === i) {
                      return (
                        <div
                          key={i}
                          className={`pg-jp-grammar-exec_answer${
                            answerName[cur] || ''
                          }`}
                        >
                          <span className='pg-jp-grammar-exec_no'>{i + 1}</span>
                          {v}
                        </div>
                      )
                    }
                    if (correct === i) {
                      return (
                        <div
                          key={i}
                          className='pg-jp-grammar-exec_answer is-primary'
                        >
                          <span className='pg-jp-grammar-exec_no'>{i + 1}</span>
                          {v}
                        </div>
                      )
                    }
                    return (
                      <div key={i} className='pg-jp-grammar-exec_answer'>
                        <span className='pg-jp-grammar-exec_no'>{i + 1}</span>
                        {v}
                      </div>
                    )
                  }
                  return (
                    <div
                      key={i}
                      className='pg-jp-grammar-exec_answer on-click'
                      onClick={() => {
                        onAnswer(i)
                      }}
                    >
                      <span className='pg-jp-grammar-exec_no'>{i + 1}</span>
                      {v}
                    </div>
                  )
                })}
              </div>
            )}
            {tar && tar.a.length > 1 && (
              <div className='pg-jp-grammar-exec_qus-wrap'>
                {tar.a.map((_, i) => {
                  const isCurrent = cur === i
                  if (isCurrent) {
                    return (
                      <div
                        key={i}
                        className={`pg-jp-grammar-exec_qus is-current${
                          answerName[i] || ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    )
                  }
                  return (
                    <div
                      key={i}
                      className={`pg-jp-grammar-exec_qus on-click${
                        answerName[i] || ''
                      }`}
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
      </Footer>
    </Page>
  )
}

export default memo(JPGrammar)
