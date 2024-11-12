import React, { memo, useCallback, useMemo } from 'react'
// import PropTypes from 'prop-types'
import './Overview.styl'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import Breadcrumb from '@com/Breadcrumb'
import Voice from '@com/Voice'
import { getColumns, dataSource } from '@/consts/overall'

const scroll = { x: 772, y: 'calc(100vh - 215px)' }

const Overview = () => {
  const { shortTip } = useSelector(
    ({ shortTip }) => ({ shortTip })
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onRow = useCallback(
    ({ id }) => ({
      onClick: () => {
        navigate(`/chapter?id=${id}`)
      }
    }),
    [navigate]
  )
  const toggleShort = useCallback(
    e => {
      e.stopPropagation()
      dispatch({ type: 'changeShortTip' })
    }, []
  )
  const gotoMenu = useCallback(
    e => {
      e.stopPropagation()
      navigate('/menu')
    }, []
  )
  const columns = useMemo(
    () => getColumns(
      (e, { id }) => {
        e.stopPropagation()
        navigate(`/itto?id=${id}`)
      }
    ),
    [navigate]
  )
  const voices = useMemo(
    () => {
      const r = ['五组十域表。']
      dataSource.forEach(
        v => {
          r.push(`${v.realm}。`)
          if (v.inStart) {
            r.push('启动过程组。')
            v.inStart.forEach(v => r.push(`${v.text}。`))
          }
          if (v.inPlan) {
            r.push('规划过程组。')
            v.inPlan.forEach(v => r.push(`${v.text}。`))
          }
          if (v.inExec) {
            r.push('执行过程组。')
            v.inExec.forEach(v => r.push(`${v.text}。`))
          }
          if (v.inMonitor) {
            r.push('监控过程组。')
            v.inMonitor.forEach(v => r.push(`${v.text}。`))
          }
          if (v.inEnd) {
            r.push('收尾过程组。')
            v.inEnd.forEach(v => r.push(`${v.text}。`))
          }
        }
      )
      return r
    },
    []
  )
  return <div className='pg-overview'>
    <Breadcrumb to={-1}>返回</Breadcrumb>
    <Voice messages={voices} />
    <div className='pg-overview_header'>
      <p className='pg-overview_title'>五组十域表</p>
      {
        shortTip &&
        <p
          className='pg-overview_short'
          onClick={toggleShort}
        >
          整范进成质，项沟风采干
        </p>
      }
      <div
        className='pg-overview_mode on-click'
        onClick={gotoMenu}
      >
        菜单
      </div>
    </div>
    <Table
      rowKey='realm'
      tableLayout='fixed'
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size='small'
      onRow={onRow}
      scroll={scroll}
    />
  </div>
}
Overview.propTypes = {
}

export default memo(Overview)
