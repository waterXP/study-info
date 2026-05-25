import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Gaoxiang.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
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

const Gaoxiang = () => {
  const navigate = useNavigate()

  const openMainPage = useCallback(() => {
    navigate('/overview')
  }, [navigate])

  const openITTOPage = useCallback(() => {
    navigate('/active-itto')
  }, [navigate])

  const openWashPage = useCallback(() => {
    navigate('/wash')
  }, [navigate])

  const openCasePage = useCallback(() => {
    navigate('/cases')
  }, [navigate])

  const openPaperPage = useCallback(() => {
    navigate('/papers')
  }, [navigate])

  const openPage = useCallback(
    key => {
      navigate(`/point?id=${key}`)
    },
    [navigate]
  )
  const openOthersPage = useCallback(
    () => {
      navigate('/others?id=community2025')
    }, [navigate]
  )
  const openPerformancePage = useCallback(
    () => {
      navigate('/performance?id=people')
    }, [navigate]
  )

  return (
    <div className='pg-gaoxiang'>
      <Breadcrumb to='/' noTop wrap>
        返回首页
      </Breadcrumb>
      <div className='pg-gaoxiang_content hide-scroll'>
        <p
          className='pg-gaoxiang_item on-click'
          onClick={() => {
            openOthersPage()
          }}
        >
          论文
        </p>
        <p
          className='pg-gaoxiang_item on-click'
          onClick={() => {
            openPerformancePage()
          }}
        >
          八大绩效域
        </p>
        <p
          className='pg-gaoxiang_item on-click'
          onClick={() => {
            openWashPage()
          }}
        >
          洗脑
        </p>
        <p
          className='pg-gaoxiang_item on-click'
          onClick={() => {
            openMainPage()
          }}
        >
          五组十域表
        </p>
        <p
          className='pg-gaoxiang_item on-click'
          onClick={() => {
            openITTOPage()
          }}
        >
          ITTO
        </p>
        <p
          className='pg-gaoxiang_item on-click'
          onClick={() => {
            openCasePage()
          }}
        >
          案例分析
        </p>
        <p
          className='pg-gaoxiang_item on-click'
          onClick={() => {
            openPaperPage()
          }}
        >
          论文相关
        </p>
        {menus.map(v => (
          <p
            key={v}
            className='pg-gaoxiang_item on-click'
            onClick={() => {
              openPage(v)
            }}
          >
            {nouns[v].title}
          </p>
        ))}
      </div>
    </div>
  )
}

export default memo(Gaoxiang)
