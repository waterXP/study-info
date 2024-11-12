import React, { memo, useEffect, useCallback, useRef } from 'react'
import './JPN2s.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import Box from '@com/Box'
import ppt from '@/consts/jp/n2'

let scrollTop = 0

const JPN2s = () => {
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
      navigate(`/jp-n2?&id=${id}`)
    },
    [navigator]
  )
  return (
    <Box ref={ref}>
      <Breadcrumb to='/' noTop>
        返回
      </Breadcrumb>
      {ppt.map((arr, i) => (
        <div key={i} className='pg-jp-n2s_lesson'>
          <p className='pg-jp-n2s_topic'>{`第${i + 1}课`}</p>
          {arr.map(({ id, title }) => (
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
            </div>
          ))}
        </div>
      ))}
    </Box>
  )
}

export default memo(JPN2s)
