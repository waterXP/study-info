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
      {ppt.map(({ id, title }) => (
        <div
          key={id}
          onClick={() => {
            gotoPPT(id)
          }}
        >
          <p className='pg-jp-ppts_title'>
            {title}
          </p>
        </div>
      ))}
    </Box>
  )
}

export default memo(JPPpts)
