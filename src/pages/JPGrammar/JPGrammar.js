import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
import './JPGrammar.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import Footer from '@com/Page/Footer'
import Trans from '@com/Trans'
import { getPrev, getNext } from '@/utils/tool'
import grammar from '@/consts/jp/tutor/grammar'

const noArray = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']

const JPGrammar = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(null)
  useEffect(() => {
    const ch = +searchParams.get('ch')
    const id = +searchParams.get('id')
    setSearch({ ch, id })
  }, [searchParams])
  const { re, title, list } = useMemo(() => {
    if (search) {
      const { ch, id } = search
      const chapter = grammar.find(v => v.id === ch)
      if (chapter) {
        const info = chapter.content.find(v => v.id === id)
        if (info) {
          const { topic, list } = info
          return {
            re: `/jp-grammar-chapter?id=${ch}`,
            title: topic,
            list
          }
        }
      }
    }
    return {
      re: '/jp-grammar-chapter?id=1',
      title: '',
      list: []
    }
  }, [search])
  const onPrevClick = useCallback(() => {
    if (search) {
      const { ch, id } = search
      const chapter = grammar.find(({ id }) => id === ch)
      if (chapter) {
        const info = chapter.content.find(v => v.id === id)
        if (info) {
          const prev = getPrev(info, chapter.content)
          navigate(
            `/jp-grammar?ch=${ch}&id=${
              (prev || chapter.content[chapter.content.length - 1]).id
            }`
          )
        }
      }
    }
  }, [search])
  const onNextClick = useCallback(() => {
    if (search) {
      const { ch, id } = search
      const chapter = grammar.find(({ id }) => id === ch)
      if (chapter) {
        const info = chapter.content.find(v => v.id === id)
        if (info) {
          const next = getNext(info, chapter.content)
          navigate(
            `/jp-grammar?ch=${ch}&id=${
              (next || chapter.content[1] || chapter.content[0]).id
            }`
          )
        }
      }
    }
  }, [search])

  const hasMulti = useMemo(() => Boolean(list && list.length > 1), [list])
  return (
    <Page>
      <Header to={re} title={title} type='jp' />
      <Content hasFooter>
        {list.map(({ t, l, i, e, u }, index) => (
          <div key={index} className='pg-jp-grammar_item'>
            {hasMulti && (
              <p className='pg-jp-grammar_title-wrap'>
                <span className='pg-jp-grammar_title'>{noArray[index % 10]}</span>
                {t && (
                  <span className='pg-jp-grammar_title'>
                    <Trans text={t} />
                  </span>
                )}
              </p>
            )}
            <div className='pg-jp-grammar_group'>
              <p className='pg-jp-grammar_topic'>
                <Trans text='「((接続,せつぞく))」' />
              </p>
              <Trans text={l} className='pg-jp-grammar_line' />
            </div>
            <div className='pg-jp-grammar_group'>
              <p className='pg-jp-grammar_topic'>
                <Trans text='「((意味,いみ))」' />
              </p>
              <Trans text={i} className='pg-jp-grammar_line' />
            </div>
            <div className='pg-jp-grammar_group'>
              <p className='pg-jp-grammar_topic'>
                <Trans text='「((例文,れいぶん))」' />
              </p>
              {e.map((v, i) => (
                <div key={i} className='pg-jp-grammar_lines'>
                  <Trans text={v} className='pg-jp-grammar_line' />
                </div>
              ))}
            </div>
            {u && (
              <div className='pg-jp-grammar_group'>
                <p className='pg-jp-grammar_topic'>
                  <Trans text='「((共起,きょうき))」' />
                </p>
                <Trans text={u} className='pg-jp-grammar_line' />
              </div>
            )}
          </div>
        ))}
      </Content>
      <Footer onPrevClick={onPrevClick} onNextClick={onNextClick} />
    </Page>
  )
}

export default memo(JPGrammar)
