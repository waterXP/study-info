export const columns = [
  {
    dataIndex: 'realm',
    title: '知识领域',
    fixed: 'left',
    width: 110
  }, {
    title: '项目管理过程组',
    children: [
      {
        dataIndex: 'inStart',
        title: '启动过程组',
        width: 110,
        render: v => v && v.map((v, i) => <p key={`start-${i}`}>{ v }</p>)
      }, {
        dataIndex: 'inPlan',
        title: '规划过程组',
        width: 138,
        render: v => v && v.map((v, i) => <p key={`plan-${i}`}>{ v }</p>)
      }, {
        dataIndex: 'inExec',
        title: '执行过程组',
        width: 152,
        render: v => v && v.map((v, i) => <p key={`exec-${i}`}>{ v }</p>)
      }, {
        dataIndex: 'inMonitor',
        title: '监控过程组',
        width: 138,
        render: v => v && v.map((v, i) => <p key={`monitor-${i}`}>{ v }</p>)
      }, {
        dataIndex: 'inEnd',
        title: '收尾过程组',
        width: 124,
        render: v => v && v.map((v, i) => <p key={`end-${i}`}>{ v }</p>)
      }
    ]
  }
]

export const intergration = {
  id: 'intergration',
  realm: '整合管理',
  inStart: ['制定项目章程'],
  inPlan: ['制订项目管理计划'],
  inExec: ['指导与管理项目工作', '管理项目知识'],
  inMonitor: ['监控项目工作', '实施整体变更控制'],
  inEnd: ['结束项目或阶段']
}

export const range = {
  id: 'range',
  realm: '范围管理',
  inPlan: ['规划范围管理', '收集需求', '定义范围', '创建WBS'],
  inMonitor: ['确认范围', '控制范围']
}

export const process = {
  id: 'process',
  realm: '进度管理',
  inPlan: ['规划进度管理', '定义活动', '排列活动顺序', '估算活动持续时间', '制订进度计划'],
  inMonitor: ['控制进度']
}

export const cost = {
  id: 'cost',
  realm: '成本管理',
  inPlan: ['规划成本管理', '估计成本', '制定预算'],
  inMonitor: ['控制成本']
}

export const quality = {
  id: 'quality',
  realm: '质量管理',
  inPlan: ['规划质量管理'],
  inExec: ['管理质量'],
  inMonitor: ['控制质量']
}

export const resource = {
  id: 'resource',
  realm: '项目资源管理',
  inPlan: ['规划资源管理', '估算活动资源'],
  inExec: ['获取资源', '建设团队', '管理团队'],
  inMonitor: ['控制资源']
}

export const communicate = {
  id: 'communicate',
  realm: '沟通管理',
  inPlan: ['规划沟通管理'],
  inExec: ['管理沟通'],
  inMonitor: ['监督沟通']
}

export const risk = {
  id: 'risk',
  realm: '风险管理',
  inPlan: ['规划风险管理', '识别风险', '实施定性风险分析', '实施定量风险分析', '规划风险应对'],
  inExec: ['实施风险应对'],
  inMonitor: ['监督风险']
}

export const purchase = {
  id: 'purchase',
  realm: '采购管理',
  inPlan: ['规划采购管理'],
  inExec: ['实施采购'],
  inMonitor: ['控制采购']
}

export const people = {
  id: 'people',
  realm: '干系人管理',
  inStart: ['识别干系人'],
  inPlan: ['规划干系人参与'],
  inExec: ['管理干系人参与'],
  inMonitor: ['监督干系人参与']
}

export const dataMap = {
  intergration,
  range,
  process,
  cost,
  quality,
  resource,
  communicate,
  risk,
  purchase,
  people
}

export const dataSource = [
  intergration,
  range,
  process,
  cost,
  quality,
  resource,
  communicate,
  risk,
  purchase,
  people
]

export default { columns, dataSource }
