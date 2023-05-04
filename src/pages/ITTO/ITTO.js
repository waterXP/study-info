import React, { memo, useEffect, useState, useMemo, useCallback, Fragment } from 'react'
// import PropTypes from 'prop-types'
import './ITTO.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { message } from 'antd'
import itto from '@/consts/itto'
import nouns from '@/consts/nouns'
import Breadcrumb from '@com/Breadcrumb'
import Title from '@com/Title'

const ITTO = () => {
  const { viewMode } = useSelector(
    ({ viewMode }) => ({ viewMode })
  )
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(0)
  const dispatch = useDispatch()

  const onModeClick = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeViewMode' })
      setFlag(0)
    }, []
  )
  useEffect(
    () => {
      const queryId = searchParams.get('id')
      const content = itto[queryId]
      if (content) {
        const { title, i, tt, o } = content
        setData({
          title,
          contents: [
            ...i.map(
              ({ id, title }, i) => i === 0
                ? ({ id, text: title, pre: '输入' })
                : ({ id, text: title })
            ),
            ...tt.map(
              ({ id, title }, i) => i === 0
                ? ({ id, text: title, pre: '工具和技术' })
                : ({ id, text: title })
            ),
            ...o.map(
              ({ id, title }, i) => i === 0
                ? ({ id, text: title, pre: '输出' })
                : ({ id, text: title })
            )
          ]
        })
      }
    },
    [searchParams]
  )
  const onClickContent = useCallback(
    () => {
      if (data && viewMode === 'recite') {
        const len = (data.contents || []).length
        if (flag >= len) {
          message.error('已经到底了')
        } else {
          setFlag(flag => flag + 1)
        }
      }
    }, [flag, data, viewMode]
  )
  const disp = useMemo(
    () => data
      ? viewMode === 'reading'
        ? data.contents
        : (data.contents || []).filter((_v, i) => i < flag)
      : null,
    [data, flag, viewMode]
  )
  const onRefresh = useCallback(
    e => {
      e.stopPropagation()
      setFlag(0)
    },
    []
  )

  if (data) {
    return <div className='pg-itto hide-scroll' onClick={onClickContent}>
      <div className='pg-itto--content'>
        <Breadcrumb>返回</Breadcrumb>
        <Title>{ data.title }</Title>
        <div className='pg-itto--items'>
          {
            disp.length > 0
              ? disp.map(
                ({ text, id, pre }) =>
                  pre
                    ? <Fragment key={id}>
                      <p className='pg-itto--item-pre'>{ pre }</p>
                      <p
                        className={
                          nouns[id].important
                            ? 'pg-itto--item is-important'
                            : 'pg-itto--item'
                        }
                      >
                        { text }
                      </p>
                    </Fragment>
                    :  <p
                      key={id}
                      className={
                        nouns[id].important
                          ? 'pg-itto--item is-important'
                          : 'pg-itto--item'
                      }
                    >
                      { text }
                    </p>
              )
              : <p className='pg-itto--placeholder'>点击空白处显示下一条</p>
          }
        </div>
      </div>
      <div className='pg-itto--footer'>
        {/* <div className='pg-itto--buttons'>
          <div
            className='pg-itto--corner-button is-clickable'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-itto--corner-center is-clickable'
            onClick={toggleShort}
          >
            { showTip ? '隐藏提示' : '显示提示' }
          </div>
          <div
            className='pg-itto--corner-button is-right is-clickable'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div> */}
        {
          viewMode === 'reading'
            ? <div
              className='pg-itto--button in-reading'
              onClick={onModeClick}
            >
              阅读模式
            </div>
            : <>
              <div className='pg-itto--button in-second' onClick={onRefresh}>
                刷新
              </div>
              <div className='pg-itto--button' onClick={onModeClick}>
                背诵模式
              </div>
            </>
        }
      </div>
    </div>
  }
  return null
}
ITTO.propTypes = {
}

export default memo(ITTO)
