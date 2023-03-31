import React, { memo, useMemo, useState, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Main.styl'
import { Table, Switch, Select, Button } from 'antd'

const renderProgress = (v, { show, showAll }, txt) => {
  const r = showAll
    ? v
    : (v && show ? v.filter((v, i) => show[`${txt}-${i}`]) : null)
  return r
    ? <>{ r.map(v => <p key={v}>{ v }</p>) }</>
    : null
}

const getColumns = (headerMask, subColumn) => [
  {
    title: <div className='pg-main--cell'>
      { headerMask.column ? '知识领域' : '' }
    </div>,
    dataIndex: 'realm',
    render: (v, { show }) => show && show.name ? v : null
  }, {
    title: <div className='pg-main--cell'>
      { headerMask.row ? '项目管理过程组' : '' }
    </div>,
    children: [
      {
        title: <div className='pg-main--cell'>
          {
            subColumn === 'all' || subColumn === 'start'
              ? '启动过程组'
              : ''
          }
        </div>,
        dataIndex: 'inStart',
        render: (v, t) =>
          <div className='pg-main--cell'>
            { renderProgress(v, t, 'start') }
          </div>
      }, {
        title: <div className='pg-main--cell'>
          {
            subColumn === 'all' || subColumn === 'plan'
              ? '规划过程组'
              : ''
          }
        </div>,
        dataIndex: 'inPlan',
        render: (v, t) =>
          <div className='pg-main--cell'>
            { renderProgress(v, t, 'plan') }
          </div>
      }, {
        title: <div className='pg-main--cell'>
          {
            subColumn === 'all' || subColumn === 'exec'
              ? '执行过程组'
              : ''
          }
        </div>,
        dataIndex: 'inExec',
        render: (v, t) =>
          <div className='pg-main--cell'>
            { renderProgress(v, t, 'exec') }
          </div>
      }, {
        title: <div className='pg-main--cell'>
          {
            subColumn === 'all' || subColumn === 'monitor'
              ? '监控过程组'
              : ''
          }
        </div>,
        dataIndex: 'inMonitor',
        render: (v, t) =>
          <div className='pg-main--cell'>
            { renderProgress(v, t, 'monitor') }
          </div>
      }, {
        title: <div className='pg-main--cell'>
          {
            subColumn === 'all' || subColumn === 'end'
              ? '收尾过程组'
              : ''
          }
        </div>,
        dataIndex: 'inEnd',
        render: (v, t) =>
          <div className='pg-main--cell'>
            { renderProgress(v, t, 'end') }
          </div>
      }
    ]
  }
]

const getDataSource = (masks, selectContent, showContent) => {
  const r = [
    {
      id: 'intergration',
      realm: '整合管理',
      inStart: ['制定项目章程'],
      inPlan: ['制订项目管理计划'],
      inExec: ['指导与管理项目工作', '管理项目知识'],
      inMonitor: ['监控项目工作', '实施整体变更控制'],
      inEnd: ['结束项目或阶段'],
      show: masks.intergration,
      showAll: showContent
    }, {
      id: 'range',
      realm: '范围管理',
      inPlan: ['规划范围管理', '收集需求', '定义范围', '创建WBS'],
      inMonitor: ['确认范围', '控制范围'],
      show: masks.range,
      showAll: showContent
    }, {
      id: 'process',
      realm: '进度管理',
      inPlan: ['规划进度管理', '定义活动', '排列活动顺序', '估算活动持续时间', '制订进度计划'],
      inMonitor: ['控制进度'],
      show: masks.process,
      showAll: showContent
    }, {
      id: 'cost',
      realm: '成本管理',
      inPlan: ['规划成本管理', '估计成本', '制定预算'],
      inMonitor: ['控制成本'],
      show: masks.cost,
      showAll: showContent
    }, {
      id: 'quality',
      realm: '质量管理',
      inPlan: ['规划质量管理'],
      inExec: ['管理质量'],
      inMonitor: ['控制质量'],
      show: masks.quality,
      showAll: showContent
    }, {
      id: 'resource',
      realm: '项目资源管理',
      inPlan: ['规划资源管理', '估算活动资源'],
      inExec: ['获取资源', '建设团队', '管理团队'],
      inMonitor: ['控制资源'],
      show: masks.resource,
      showAll: showContent
    }, {
      id: 'communicate',
      realm: '沟通管理',
      inPlan: ['规划沟通管理'],
      inExec: ['管理沟通'],
      inMonitor: ['监督沟通'],
      show: masks.communicate,
      showAll: showContent
    }, {
      id: 'risk',
      realm: '风险管理',
      inPlan: ['规划风险管理', '识别风险', '实施定性风险分析', '实施定量风险分析', '规划风险应对'],
      inExec: ['实施风险应对'],
      inMonitor: ['监督风险'],
      show: masks.risk,
      showAll: showContent
    }, {
      id: 'purchase',
      realm: '采购管理',
      inPlan: ['规划采购管理'],
      inExec: ['实施采购'],
      inMonitor: ['控制采购'],
      show: masks.purchase,
      showAll: showContent
    }, {
      id: 'people',
      realm: '干系人管理',
      inStart: ['识别干系人'],
      inPlan: ['规划干系人参与'],
      inExec: ['管理干系人参与'],
      inMonitor: ['监督干系人参与'],
      show: masks.people,
      showAll: showContent
    }
  ]
  if (selectContent === 'all') {
    return r
  }
  return r.filter(({ id }) => id === r)
}

const getMasks = () => ({
  intergration: { name: true },
  range: { name: true },
  process: { name: true },
  cost: { name: true },
  quality: { name: true },
  resource: { name: true },
  communicate: { name: true },
  risk: { name: true },
  purchase: { name: true },
  people: { name: true }
})

const subColumnOptions = [
  { label: '隐藏', value: 'hidden' },
  { label: '全部', value: 'all' },
  { label: '启动过程组', value: 'start' },
  { label: '规划过程组', value: 'plan' },
  { label: '执行过程组', value: 'exec' },
  { label: '监控过程组', value: 'monitor' },
  { label: '收尾过程组', value: 'end' },
]

const selectOptions = [
  { label: '隐藏', value: 'hidden' },
  { label: '全部', value: 'all' },
  ...getDataSource({}, 'all').map(
    ({ id, realm }) => ({ label: realm, value: id })
  )
]

const getDefaultHeaderMask = () => {
  const x = Object.create(null)
  x.row = true
  x.column = true
  return x
}

const Main = () => {
  const [masks, setMasks] = useState(getMasks())
  const [selectContent, setSelectContent] = useState('all')
  const [subColumn, setSubColumn] = useState('all')
  const [showContent, setShowContent] = useState(false)
  const [headerMask, setHeaderMask] = useState(getDefaultHeaderMask())
  const dataSource = useMemo(
    () => getDataSource(masks, selectContent, showContent),
    [selectContent, masks, showContent]
  )
  const updateHeaderMask = useCallback(
    payload => { setHeaderMask(headerMask => ({ ...headerMask, ...payload})) },
    []
  )
  const setHeaderMaskRow = useCallback(
    value => updateHeaderMask({ row: value }), []
  )
  const setHeaderMaskColumn = useCallback(
    value => updateHeaderMask({ column: value }), []
  )
  const columns = useMemo(
    () => getColumns(headerMask, subColumn),
    [headerMask, subColumn]
  )
  return <div className='pg-main'>
    <div>
      <p>显示主标题</p>
      <div>
        <span>行标题</span>
        <Switch
          checked={headerMask.row}
          onChange={setHeaderMaskRow}
        />
      </div>
      <div>
        <span>列标题</span>
        <Switch
          checked={headerMask.column}
          onChange={setHeaderMaskColumn}
        />
      </div>
      <div>
        <span>内容</span>
        <Switch
          checked={showContent}
          onChange={setShowContent}
        />
      </div>
    </div>
    <div>
      <p>显示次级标题</p>
      <Select
        options={subColumnOptions}
        value={subColumn}
        onChange={setSubColumn}
      />
    </div>
    <div>
      <p>显示内容</p>
      <Select
        options={selectOptions}
        value={selectContent}
        onChange={setSelectContent}
      />
    </div>
    <div>
      <Button danger>重置</Button>
      <Button type='primary'>下一个</Button>
      <Button type='primary'>上一个</Button>
    </div>
    <Table
      rowKey='realm'
      tableLayout='fixed'
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size='small'
    />
  </div>
}
Main.propTypes = {
}

export default memo(Main)
