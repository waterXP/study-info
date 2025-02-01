import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment
} from 'react'
import './JPStructure.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import JPText from '@com/JPText'
import Trans from '@com/Trans'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import Footer from '@com/Page/Footer'
import jpWords from '@/consts/jp'

const buttons = [
  { text: '基', value: 'course' },
  { text: '語', value: 'words' }
]

const classNameMap = {
  o: 'pg-jp-structure_line is-title',
  m: 'pg-jp-structure_line is-explain',
  e: 'pg-jp-structure_line is-example',
  n: 'pg-jp-structure_line is-notice',
  s: 'pg-jp-structure_line is-title'
}

const JPStructure = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [detail, setDetail] = useState(null)
  const [id, setId] = useState(1)
  useEffect(() => {
    const id = +searchParams.get('id')
    const no = +searchParams.get('no')
    if (id && no) {
      const tarCh = jpWords.find(v => v.id === id)
      if (tarCh) {
        const tarNo = tarCh.lesson.find(v => v.no === no)
        if (tarNo) {
          setId(id)
          setDetail(tarNo)
          return
        }
      }
    }
    const tar = jpWords[0].lesson[0]
    setId(1)
    setDetail(tar)
  }, [searchParams])

  const { base, explain, title } = useMemo(() => {
    if (detail) {
      const { no, topic, grammar } = detail
      const { base, explain } = grammar || {}
      return {
        title: <JPText content={`第${no}課 ${topic}`} />,
        base: base || [],
        explain: explain || []
      }
    }
    return { title: '', base: [], explain: [] }
  }, [detail])
  const onPrevClick = useCallback(() => {
    if (detail) {
      const { no } = detail
      const nextNo = no - 1
      if (nextNo < 1) {
        const last = jpWords[jpWords.length - 1]
        const lastDetail = last.lesson[last.lesson.length - 1]
        navigate(`/jp-structure?id=${last.id}&no=${lastDetail.no}`)
        return
      }
      const tar = jpWords.find(({ lesson }) =>
        lesson.some(v => v.no === nextNo)
      )
      if (tar) {
        navigate(`/jp-structure?id=${tar.id}&no=${nextNo}`)
      }
    }
  }, [id, detail, navigate])
  const onNextClick = useCallback(() => {
    if (detail) {
      const { no } = detail
      const nextNo = no + 1
      const tar = jpWords.find(({ lesson }) =>
        lesson.some(v => v.no === nextNo)
      )
      if (tar) {
        navigate(`/jp-structure?id=${tar.id}&no=${nextNo}`)
      } else {
        navigate('/jp-structure?id=1&no=1')
      }
    }
  }, [id, detail, navigate])
  const onButtons = useCallback(
    value => {
      const id = +searchParams.get('id')
      const no = +searchParams.get('no')
      if (value === 'course') {
        navigate(`/jp-course?id=${id}&no=${no}`)
      } else if (value === 'words') {
        navigate(`/jp-words-list?id=${id}&no=${no}`)
      }
    },
    [navigate, searchParams]
  )
  return (
    <Page>
      <Header to='/jp' title={title} />
      <Content hasFooter>
        {base && (
          <div className='pg-jp-structure_block'>
            <p className='pg-jp-structure_title'>语法解释</p>
            {base.map((lines, no) => (
              <div key={no} className='pg-jp-structure_lines'>
                {lines.map((v, i) => {
                  const [flag, text] = v.split('::')
                  const dispText = i === 0 ? `${no + 1}.${text}` : text
                  const className = classNameMap[flag] || 'pg-jp-structure_line'
                  if (flag === 't') {
                    const rows = text.split('@').map(v => v.split(':'))
                    return (
                      <>
                        {rows.map((row, i) => (
                          <div key={i} className='pg-jp-structure_row'>
                            {row.map((v, i) =>
                              i === 0 ? (
                                <span key={i} className='pg-jp-structure_cell'>
                                  <Trans text={v} />
                                </span>
                              ) : (
                                <Fragment key={i}>
                                  <div className='pg-jp-structure_divider' />
                                  <span className='pg-jp-structure_cell'>
                                    <Trans text={v} />
                                  </span>
                                </Fragment>
                              )
                            )}
                          </div>
                        ))}
                      </>
                    )
                  }
                  return (
                    <p key={i} className={className}>
                      <Trans text={dispText} />
                    </p>
                  )
                })}
              </div>
            ))}
          </div>
        )}
        {explain && (
          <div className='pg-jp-structure_block'>
            <p className='pg-jp-structure_title'>表达及词语讲解</p>
            {explain.map((lines, no) => (
              <div key={no} className='pg-jp-structure_lines'>
                {lines.map((v, i) => {
                  const [flag, text] = v.split('::')
                  const dispText = i === 0 ? `${no + 1}.${text}` : text
                  const className = classNameMap[flag] || 'pg-jp-structure_line'
                  return (
                    <p key={i} className={className}>
                      <Trans text={dispText} />
                    </p>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </Content>
      <Footer
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        buttons={buttons}
        onButtons={onButtons}
      />
    </Page>
  )
}

export default memo(JPStructure)
