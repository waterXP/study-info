import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Menu.styl'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
  const navigate = useNavigate()

  const openMainPage = useCallback(
    () => {
      navigate('/main')
    },
    [navigate]
  )

  const openPage = useCallback(
    key => {
      navigate(`/point?id=${key}`)
    },
    [navigate]
  )

  return <div className='pg-menu'>
    <div className='pg-menu--content'>
      <p
        className='pg-menu--item is-clickable'
        onClick={() => { openMainPage() }}
      >
        五组十域表
      </p>
      <p
        className='pg-menu--item is-clickable'
        onClick={() => { openPage('pdm') }}
      >
        单代号网络图
      </p>
      <p
        className='pg-menu--item is-clickable'
        onClick={() => { openPage('earn') }}
      >
        挣值管理
      </p>
    </div>
  </div>
}
Menu.propTypes = {
}

export default memo(Menu)
