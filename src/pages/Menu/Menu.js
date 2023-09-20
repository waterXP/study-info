import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Menu.styl'
import { useNavigate } from 'react-router-dom'
import nouns from '@/consts/points'

const menus = [
  'pdm',
  'adm',
  'cpm',
  'zip',
  'optimize',
  'pert',
  'process-compute',
  'process-control',
  'cost-manage',
  'cost-compute',
  'cost-budget',
  'earn',
  'loc',
  'bid',
  'payback',
  'channel',
  'edition',
  'nouns',
  'tech',
  'math',
  'searn'
]

const Menu = () => {
  const navigate = useNavigate()

  const openMainPage = useCallback(
    () => {
      navigate('/overview')
    },
    [navigate]
  )

  const openWashPage = useCallback(
    () => {
      navigate('/wash')
    },
    [navigate]
  )

  const openCasePage = useCallback(
    () => {
      navigate('/cases')
    },
    [navigate]
  )

  const openPaperPage = useCallback(
    () => {
      navigate('/papers')
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
    <div className='pg-menu_content'>
      <p
        className='pg-menu_item is-clickable'
        onClick={() => { openWashPage() }}
      >
        洗脑
      </p>
      <p
        className='pg-menu_item is-clickable'
        onClick={() => { openMainPage() }}
      >
        五组十域表
      </p>
      <p
        className='pg-menu_item is-clickable'
        onClick={() => { openCasePage() }}
      >
        案例分析
      </p>
      <p
        className='pg-menu_item is-clickable'
        onClick={() => { openPaperPage() }}
      >
        论文相关
      </p>
      {
        menus.map(v =>
          <p
            key={v}
            className='pg-menu_item is-clickable'
            onClick={() => { openPage(v) }}
          >
            { nouns[v].title }
          </p>
        )
      }
    </div>
  </div>
}
Menu.propTypes = {
}

export default memo(Menu)
