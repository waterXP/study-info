import React, { memo, useCallback } from 'react'
import './JPPpts.styl'
import { useNavigate } from 'react-router-dom'
import ppt from '@/consts/jp/ppt'
import Breadcrumb from '@com/Breadcrumb'
import Box from '@com/Box'

const JPPpts = () => {
  const navigate = useNavigate()
  const gotoPPT = useCallback(
    id => {
      navigate(`/jp-ppt?&id=${id}`)
    },
    [navigator]
  )
  return (
    <Box>
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
