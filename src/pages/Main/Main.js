import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { Table } from 'antd'

const renderProgress = v => v ? <>{ v.map(v => <p key={v}>{ v }</p>) }</> : null

const columns = [
  {
    title: '知识领域',
    dataIndex: 'realm'
  }, {
    title: '项目管理过程组',
    children: [
      {
        title: '启动过程组',
        dataIndex: 'inStart',
        render: renderProgress
      }, {
        title: '规划过程组',
        dataIndex: 'inPlan',
        render: renderProgress
      }, {
        title: '执行过程组',
        dataIndex: 'inExec',
        render: renderProgress
      }, {
        title: '监控过程组',
        dataIndex: 'inMonitor',
        render: renderProgress
      }, {
        title: '收尾过程组',
        dataIndex: 'inEnd',
        render: renderProgress
      }
    ]
  }
]

const dataSource = [
  {
    realm: '整合管理',
    inStart: ['制定项目章程'],
    inPlan: ['制订项目管理计划'],
    inExec: ['指导与管理项目工作', '管理项目知识'],
    inMonitor: ['监控项目工作', '实施整体变更控制'],
    inEnd: ['结束项目或阶段']
  }
]

const Main = () =>
  <div className='main'>
    <Table rowKey='title' columns={columns} dataSource={dataSource} />
  </div>
Main.propTypes = {
}

export default memo(Main)
