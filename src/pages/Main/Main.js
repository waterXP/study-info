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
  }, {
    realm: '范围管理',
    inPlan: ['规划范围管理', '收集需求', '定义范围', '创建WBS'],
    inMonitor: ['确认范围', '控制范围']
  }, {
    realm: '进度管理',
    inPlan: ['规划进度管理', '定义活动', '排列活动顺序', '估算活动持续时间', '制订进度计划'],
    inMonitor: ['控制进度']
  }, {
    realm: '成本管理',
    inPlan: ['规划成本管理', '估计成本', '制定预算'],
    inMonitor: ['控制成本']
  }, {
    realm: '质量管理',
    inPlan: ['规划质量管理'],
    inExec: ['管理质量'],
    inMonitor: ['控制质量']
  }, {
    realm: '项目资源管理',
    inPlan: ['规划资源管理', '估算活动资源'],
    inExec: ['获取资源', '建设团队', '管理团队'],
    inMonitor: ['控制资源']
  }, {
    realm: '沟通管理',
    inPlan: ['规划沟通管理'],
    inExec: ['管理沟通'],
    inMonitor: ['监督沟通']
  }, {
    realm: '风险管理',
    inPlan: ['规划风险管理', '识别风险', '实施定性风险分析', '实施定量风险分析', '规划风险应对'],
    inExec: ['实施风险应对'],
    inMonitor: ['监督风险']
  }, {
    realm: '采购管理',
    inPlan: ['规划采购管理'],
    inExec: ['实施采购'],
    inMonitor: ['控制采购']
  }, {
    realm: '干系人管理',
    inStart: ['识别干系人'],
    inPlan: ['规划干系人参与'],
    inExec: ['管理干系人参与'],
    inMonitor: ['监督干系人参与']
  }
]

const Main = () =>
  <div className='pg-main'>
    <Table
      rowKey='realm'
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  </div>
Main.propTypes = {
}

export default memo(Main)
