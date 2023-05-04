export const getColumns = onCell => [
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
        render: v => v && v.map((v, i) =>
          <p
            key={`start-${i}`}
            className='is-clickable'
            onClick={e => { onCell(e, v) }}
          >
            { v.text }
          </p>
        )
      }, {
        dataIndex: 'inPlan',
        title: '规划过程组',
        width: 138,
        render: v => v && v.map((v, i) =>
          <p
            key={`plan-${i}`}
            className='is-clickable'
            onClick={e => { onCell(e, v) }}
          >
            { v.text }
          </p>
        )
      }, {
        dataIndex: 'inExec',
        title: '执行过程组',
        width: 152,
        render: v => v && v.map((v, i) =>
          <p
            key={`exec-${i}`}
            className='is-clickable'
            onClick={e => { onCell(e, v) }}
          >
            { v.text }
          </p>
        )
      }, {
        dataIndex: 'inMonitor',
        title: '监控过程组',
        width: 138,
        render: v => v && v.map((v, i) =>
          <p
            key={`monitor-${i}`}
            className='is-clickable'
            onClick={e => { onCell(e, v) }}
          >
            { v.text }
          </p>
        )
      }, {
        dataIndex: 'inEnd',
        title: '收尾过程组',
        width: 124,
        render: v => v && v.map((v, i) =>
          <p
            key={`end-${i}`}
            className='is-clickable'
            onClick={e => { onCell(e, v) }}
          >
            { v.text }
          </p>
        )
      }
    ]
  }
]

export const integration = {
  id: 'integration',
  realm: '整合管理',
  short: '整制制指，管监实结',
  inStart: [{ id: '1-1', text: '制定项目章程' }],
  inPlan: [{ id: '1-2', text: '制订项目管理计划' }],
  inExec: [
    { id: '1-3', text: '指导与管理项目工作' },
    { id: '1-4', text: '管理项目知识' }
  ],
  inMonitor: [
    { id: '1-5', text: '监控项目工作' },
    { id: '1-6', text: '实施整体变更控制' }
  ],
  inEnd: [{ id: '1-7', text: '结束项目或阶段' }]
}

export const range = {
  id: 'range',
  realm: '范围管理',
  short: '范规收定，创确控',
  inPlan: [
    { id: '2-1', text: '规划范围管理' },
    { id: '2-2', text: '收集需求' },
    { id: '2-3', text: '定义范围' },
    { id: '2-4', text: '创建WBS' }
  ],
  inMonitor: [
    { id: '2-5', text: '确认范围' },
    { id: '2-6', text: '控制范围' }
  ]
}

export const process = {
  id: 'process',
  realm: '进度管理',
  short: '进规定排，估制控',
  inPlan: [
    { id: '3-1', text: '规划进度管理' },
    { id: '3-2', text: '定义活动' },
    { id: '3-3', text: '排列活动顺序' },
    { id: '3-4', text: '估算活动持续时间' },
    { id: '3-5', text: '制订进度计划' }
  ],
  inMonitor: [{ id: '3-6', text: '控制进度' }]
}

export const cost = {
  id: 'cost',
  realm: '成本管理',
  short: '成规估制控',
  inPlan: [
    { id: '4-1', text: '规划成本管理' },
    { id: '4-2', text: '估算成本' },
    { id: '4-3', text: '制定预算' }
  ],
  inMonitor: [{ id: '4-4', text: '控制成本' }]
}

export const quality = {
  id: 'quality',
  realm: '质量管理',
  short: '质规管控',
  inPlan: [{ id: '5-1', text: '规划质量管理' }],
  inExec: [{ id: '5-2', text: '管理质量' }],
  inMonitor: [{ id: '5-3', text: '控制质量' }]
}

export const resource = {
  id: 'resource',
  realm: '项目资源管理',
  short: '项规估获，建管控',
  inPlan: [
    { id: '6-1', text: '规划资源管理' },
    { id: '6-2', text: '估算活动资源' }],
  inExec: [
    { id: '6-3', text: '获取资源' },
    { id: '6-4', text: '建设团队' },
    { id: '6-5', text: '管理团队' }
  ],
  inMonitor: [{ id: '6-6', text: '控制资源' }]
}

export const communicate = {
  id: 'communicate',
  realm: '沟通管理',
  short: '沟规管监',
  inPlan: [{ id: '7-1', text: '规划沟通管理' }],
  inExec: [{ id: '7-2', text: '管理沟通' }],
  inMonitor: [{ id: '7-3', text: '监督沟通' }]
}

export const risk = {
  id: 'risk',
  realm: '风险管理',
  short: '风规识实实，规实监',
  inPlan: [
    { id: '8-1', text: '规划风险管理' },
    { id: '8-2', text: '识别风险' },
    { id: '8-3', text: '实施定性风险分析' },
    { id: '8-4', text: '实施定量风险分析' },
    { id: '8-5', text: '规划风险应对' }
  ],
  inExec: [{ id: '8-6', text: '实施风险应对' }],
  inMonitor: [{ id: '8-7', text: '监督风险' }]
}

export const purchase = {
  id: 'purchase',
  realm: '采购管理',
  short: '采规实控',
  inPlan: [{ id: '9-1', text: '规划采购管理' }],
  inExec: [{ id: '9-2', text: '实施采购' }],
  inMonitor: [{ id: '9-3', text: '控制采购' }]
}

export const people = {
  id: 'people',
  realm: '干系人管理',
  short: '干识规管监',
  inStart: [{ id: '10-1', text: '识别干系人' }],
  inPlan: [{ id: '10-2', text: '规划干系人参与' }],
  inExec: [{ id: '10-3', text: '管理干系人参与' }],
  inMonitor: [{ id: '10-4', text: '监督干系人参与' }]
}

export const dataMap = {
  integration,
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
  integration,
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

export default { getColumns, dataSource }
