import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import './JPN2s.styl'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Breadcrumb from '@com/Breadcrumb'
import ppt from '@/consts/jp/n2'

const JPN2s = () => {
  const [searchParams] = useSearchParams()
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const gotoPPT = useCallback(
    id => {
      navigate(`/jp-n2?&id=${id}`)
    },
    [navigator]
  )
  useEffect(() => {
    const index = +searchParams.get('index')
    if (index && ppt[index]) {
      setIndex(index)
    } else {
      setIndex(0)
    }
  }, [searchParams])
  const showEx = useSelector(({ showEx }) => showEx)
  const tar = useMemo(() => ppt[index] || ppt[0], [index])
  const onPrevClick = useCallback(() => {
    const nextIndex = index > 0 ? index - 1 : ppt.length - 1
    navigate(`/jp-n2s?&index=${nextIndex}`, { replace: true })
  }, [index])
  const onNextClick = useCallback(() => {
    const nextIndex = index < ppt.length - 1 ? index + 1 : 0
    navigate(`/jp-n2s?&index=${nextIndex}`, { replace: true })
  }, [index])
  return (
    <div className='pg-jp-n2s hide-scroll'>
      <div className='pg-jp-n2s_content'>
        <div className='pg-jp-n2s_header'>
          <Breadcrumb to='/' noTop ex type='jp'>
            返回
          </Breadcrumb>
        </div>
        <div className='pg-jp-n2s_lesson'>
          <p className='pg-jp-n2s_topic'>{`第${index + 1}课`}</p>
          {tar.map(({ id, title, cn, example }) => (
            <div
              key={id}
              className='pg-jp-n2s_titles'
              onClick={() => {
                gotoPPT(id)
              }}
            >
              {title.map((v, i) => (
                <p key={i} className='pg-jp-n2s_title'>
                  {v}
                </p>
              ))}
              {cn && <p className='pg-jp-n2s_cn'>{cn}</p>}
              {showEx ? (
                <div className='pg-jp-n2s_examples'>
                  {example.map((v, i) => (
                    <p key={i} className='pg-jp-n2s_example'>
                      {v}
                    </p>
                  ))}
                </div>
              ) : (
                <div className='pg-jp-n2s_examples'>
                  {example && example[0] && (
                    <p className='pg-jp-n2s_example'>{example[0]}</p>
                  )}
                  {example && example[1] && (
                    <p className='pg-jp-n2s_example'>{example[1]}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='pg-jp-n2s_footer'>
        <div className='pg-jp-n2s_buttons'>
          <div
            className='pg-jp-n2s_corner-button on-click'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-jp-n2s_corner-button is-right on-click'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(JPN2s)
