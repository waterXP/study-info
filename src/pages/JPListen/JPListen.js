import React, { memo, useEffect, useState, useCallback } from 'react'
import './JPListen.styl'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import listen from '@/consts/jp/exec/listen'

const JPListen = () => {
  const [info, setInfo] = useState(null)
  const [searchParams] = useSearchParams()
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
  return (
    <div className='pg-jp-listen hide-scroll'>
      <div className='pg-jp-listen_header'>
        <Breadcrumb to='/' noTop>
          返回
        </Breadcrumb>
      </div>
      {info && (
        <div className='pg-jp-listen_content'>
          {info.q.map((v, i) => (
            <p key={i} className='pg-jp-listen_text'>{v}</p>
          ))}
        </div>
      )}
      <div className='pg-jp-listen_footer'>
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
