import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
import './JPGrammarChapter.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import Footer from '@com/Page/Footer'
import { getPrev, getNext } from '@/utils/tool'
import grammar from '@/consts/jp/tutor/grammar'

const JPGrammarChapter = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [info, setInfo] = useState(null)
  useEffect(() => {
    const id = +searchParams.get('id')
    const tar = grammar.find(v => v.id === id)
    if (tar) {
      setInfo(tar)
    } else {
      setInfo(grammar[0])
    }
  }, [searchParams])
  const { title, content } = useMemo(
    () => info || { title: '', content: [] },
    [info]
  )
  const onPrevClick = useCallback(() => {
    const prev = getPrev(info, grammar)
    setInfo(prev || grammar[grammar.length - 1])
  }, [info])
  const onNextClick = useCallback(() => {
    const next = getNext(info, grammar)
    setInfo(next || grammar[1] || grammar[0])
  }, [info])
  const gotoDetail = useCallback(
    id => {
      const ch = info && info.id || 1
      navigate(`/jp-grammar?ch=${ch}&id=${id}`)
    },
    [info, navigate]
  )
  return (
    <Page>
      <Header to='/jp-grammars' title={title} type='jp' />
      <Content hasFooter>
        {content.map(({ id, topic }) => (
          <p
            key={id}
            className='pg-jp-grammars-chapter_item on-click'
            onClick={() => {
              gotoDetail(id)
            }}
          >
            {topic}
          </p>
        ))}
      </Content>
      <Footer onPrevClick={onPrevClick} onNextClick={onNextClick} />
    </Page>
  )
}

export default memo(JPGrammarChapter)
