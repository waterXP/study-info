import React, { memo, useEffect, useCallback, useRef } from 'react'
import './JPPpts.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import ppt from '@/consts/jp/ppt'

let scrollTop = 0

const JPPpts = () => {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollTop
    }
  }, [])
  const navigate = useNavigate()
  const gotoPPT = useCallback(
    id => {
      scrollTop = ref.current.scrollTop
      navigate(`/jp-ppt?&id=${id}`)
    },
    [navigator]
  )
  return (
    <div ref={ref} className='pg-jp-ppts hide-scroll'>
      <div className='pg-jp-ppts_header'>
        <Breadcrumb to='/' noTop type='jp'>
          返回
        </Breadcrumb>
      </div>
      <div className='pg-jp-ppts_lessons'>
        {ppt.map((arr, i) => (
          <div key={i} className='pg-jp-ppts_lesson'>
            <p className='pg-jp-ppts_topic'>{`第${i + 1}课`}</p>
            {arr.map(({ id, title }) => (
              <div
                key={id}
                className='pg-jp-ppts_titles'
                onClick={() => {
                  gotoPPT(id)
                }}
              >
                {title.map((v, i) => (
                  <p key={i} className='pg-jp-ppts_title'>
                    {v}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(JPPpts)
