import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { useNavigate } from 'react-router-dom'

const entries = [
  {
    key: 'menu',
    title: '软考',
    desc: '项目管理与软考资料入口'
  },
  {
    key: 'jlpt',
    title: 'JLPT',
    desc: '日语学习与题库整理入口'
  }
]

const Main = () => {
  const navigate = useNavigate()
  const gotoGaoxiang = useCallback(() => {
    navigate('/gaoxiang')
  }, [navigate])
  const gotoJLPT = useCallback(() => {
    navigate('/jlpt')
  }, [navigate])
  return (
    <div className='pg-main'>
      {entries.map(({ key, title, desc }) => {
        const onClick = key === 'menu' ? gotoGaoxiang : gotoJLPT
        return (
          <div key={key} className='pg-main_link on-click' onClick={onClick}>
            <p className='pg-main_title'>{title}</p>
            <p className='pg-main_desc'>{desc}</p>
          </div>
        )
      })}
    </div>
  )
}
Main.propTypes = {}

export default memo(Main)
