import React, { memo, useEffect, useCallback, useRef } from 'react'
import './JPPpts.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import Box from '@com/Box'
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
    <Box ref={ref}>
      <Breadcrumb to='/' noTop>
        返回
      </Breadcrumb>
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
    </Box>
  )
}

export default memo(JPPpts)
