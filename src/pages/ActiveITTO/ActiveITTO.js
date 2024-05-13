import React, { memo, useState, useCallback, useMemo } from 'react'
import './ActiveITTO.styl'
import { Table } from 'antd'
import { datas } from '@/consts/itto'
import nouns from '@/consts/nouns'
import Breadcrumb from '@com/Breadcrumb'

const names = [
  '整合管理',
  '范围管理',
  '进度管理',
  '成本管理',
  '质量管理',
  '项目资源管理',
  '沟通管理',
  '风险管理',
  '采购管理',
  '干系人管理'
]

const dataSource = datas.reduce(
  (t, realm, index) => [
    ...t,
    ...Object.entries(realm)
      .sort(([a], [b]) => a - b)
      .map(([a, b], i, arr) => {
        return {
          ...b,
          id: a,
          nameSpan: i === 0 ? arr.length : 0,
          name: i === 0 ? names[index] : ''
        }
      })
  ],
  []
)

const columns = [
  {
    dataIndex: 'name',
    title: '知识领域',
    fixed: 'left',
    width: 110,
    onCell: ({ nameSpan }) => ({ rowSpan: nameSpan })
  },
  {
    key: 'title',
    title: '过程',
    fixed: 'left',
    width: 110,
    render: ({ title, phase }) => `${title}（${phase}）`
  },
  {
    dataIndex: 'i',
    title: '输入',
    width: 200,
    render: v =>
      v.map(({ id, title }) =>
        nouns[id] && nouns[id].important ? (
          <p className='pg-active-itto_important' key={id}>
            {title}
          </p>
        ) : (
          <p key={id}>{title}</p>
        )
      )
  },
  {
    dataIndex: 'tt',
    title: '工具与技术',
    width: 200,
    render: v =>
      v.map(({ id, title }) =>
        nouns[id] && nouns[id].important ? (
          <p className='pg-active-itto_important' key={id}>
            {title}
          </p>
        ) : (
          <p key={id}>{title}</p>
        )
      )
  },
  {
    dataIndex: 'o',
    title: '输出',
    width: 200,
    render: v =>
      v.map(({ id, title }) =>
        nouns[id] && nouns[id].important ? (
          <p className='pg-active-itto_important' key={id}>
            {title}
          </p>
        ) : (
          <p key={id}>{title}</p>
        )
      )
  }
]

const scroll = { x: 772, y: 'calc(100vh - 215px)' }

const { total, input, tool, output } = (() => {
  const singleTotal = []
  const singleInput = []
  const singleTool = []
  const singleOutput = []
  const multipleTotal = []
  const totalCount = {}
  const multipleInput = []
  const inputCount = {}
  const multipleTool = []
  const toolCount = {}
  const multipleOutput = []
  const outputCount = {}
  datas.forEach(v => {
    Object.values(v).forEach(({ i, tt, o }) => {
      i.forEach(({ title }) => {
        totalCount[title] = totalCount[title] ? totalCount[title] + 1 : 1
        if (totalCount[title] === 1) {
          singleTotal.push(title)
        } else if (totalCount[title] === 2) {
          multipleTotal.push(title)
        }
        inputCount[title] = inputCount[title] ? inputCount[title] + 1 : 1
        if (inputCount[title] === 1) {
          singleInput.push(title)
        } else if (inputCount[title] === 2) {
          multipleInput.push(title)
        }
      })
      tt.forEach(({ title }) => {
        totalCount[title] = totalCount[title] ? totalCount[title] + 1 : 1
        if (totalCount[title] === 1) {
          singleTotal.push(title)
        } else if (totalCount[title] === 2) {
          multipleTotal.push(title)
        }
        toolCount[title] = toolCount[title] ? toolCount[title] + 1 : 1
        if (toolCount[title] === 1) {
          singleTool.push(title)
        } else if (toolCount[title] === 2) {
          multipleTool.push(title)
        }
      })
      o.forEach(({ title }) => {
        totalCount[title] = totalCount[title] ? totalCount[title] + 1 : 1
        if (totalCount[title] === 1) {
          singleTotal.push(title)
        } else if (totalCount[title] === 2) {
          multipleTotal.push(title)
        }
        outputCount[title] = outputCount[title] ? outputCount[title] + 1 : 1
        if (outputCount[title] === 1) {
          singleOutput.push(title)
        } else if (outputCount[title] === 2) {
          multipleOutput.push(title)
        }
      })
    })
  })
  return {
    total: {
      single: singleTotal.filter(v => totalCount[v] === 1),
      multiple: multipleTotal,
      count: totalCount
    },
    input: {
      single: singleInput.filter(v => inputCount[v] === 1),
      multiple: multipleInput,
      count: inputCount
    },
    tool: {
      sinlge: singleTool.filter(v => toolCount[v] === 1),
      multiple: multipleTool,
      count: toolCount
    },
    output: {
      single: singleOutput.filter(v => outputCount[v] === 1),
      multiple: multipleOutput,
      count: outputCount
    }
  }
})()

const ActiveITTO = () => {
  const [totalFilter, setTotalFilter] = useState('')
  const [inputFilter, setInputFilter] = useState('')
  const [toolFilter, setToolFilter] = useState('')
  const [outputFilter, setOutputFilter] = useState('')
  const toggleTotal = useCallback(v => {
    setTotalFilter(totalFilter => (totalFilter === v ? '' : v))
    setInputFilter('')
    setToolFilter('')
    setOutputFilter('')
  }, [])
  const toggleInput = useCallback(v => {
    setInputFilter(inputFilter => (inputFilter === v ? '' : v))
    setTotalFilter('')
  }, [])
  const toggleTool = useCallback(v => {
    setToolFilter(toolFilter => (toolFilter === v ? '' : v))
    setTotalFilter('')
  }, [])
  const toggleOutput = useCallback(v => {
    setOutputFilter(outputFilter => (outputFilter === v ? '' : v))
    setTotalFilter('')
  }, [])
  const headers = useMemo(
    () => [
      {
        id: 'total',
        name: '全部',
        list: total.multiple,
        target: totalFilter,
        onClick: toggleTotal,
        count: total.count
      },
      {
        id: 'input',
        name: '输入',
        list: input.multiple,
        target: inputFilter,
        onClick: toggleInput,
        count: input.count
      },
      {
        id: 'tool',
        name: '工具和技术',
        list: tool.multiple,
        target: toolFilter,
        onClick: toggleTool,
        count: tool.count
      },
      {
        id: 'output',
        name: '输出',
        list: output.multiple,
        target: outputFilter,
        onClick: toggleOutput,
        count: output.count
      }
    ],
    [
      totalFilter,
      toggleTotal,
      inputFilter,
      toggleInput,
      toolFilter,
      toggleTool,
      outputFilter,
      toggleOutput
    ]
  )
  const computeSource = useMemo(
    () =>
      totalFilter
        ? dataSource.map(({ i, tt, o, ...rest }) => ({
            ...rest,
            i:
              totalFilter === 'single'
                ? i.filter(({ title }) => total.count[title] === 1)
                : i.filter(({ title }) => title === totalFilter),
            tt:
              totalFilter === 'single'
                ? tt.filter(({ title }) => total.count[title] === 1)
                : tt.filter(({ title }) => title === totalFilter),
            o:
              totalFilter === 'single'
                ? o.filter(({ title }) => total.count[title] === 1)
                : o.filter(({ title }) => title === totalFilter)
          }))
        : inputFilter || toolFilter || outputFilter
        ? dataSource.map(({ i, tt, o, ...rest }) => ({
            ...rest,
            i:
              inputFilter === 'single'
                ? i.filter(({ title }) => input.count[title] === 1)
                : inputFilter
                ? i.filter(({ title }) => title === inputFilter)
                : i,
            tt:
              toolFilter === 'single'
                ? tt.filter(({ title }) => tool.count[title] === 1)
                : toolFilter
                ? tt.filter(({ title }) => title === toolFilter)
                : tt,
            o:
              outputFilter === 'single'
                ? o.filter(({ title }) => output.count[title] === 1)
                : outputFilter
                ? o.filter(({ title }) => title === outputFilter)
                : o
          }))
        : dataSource,
    [dataSource, totalFilter, inputFilter, toolFilter, outputFilter]
  )
  return (
    <div className='pg-active-itto'>
      <Breadcrumb to={-1}>返回</Breadcrumb>
      {headers.map(({ id, name, list, target, onClick, count }) => (
        <div key={id} className='pg-active-itto_names'>
          <span className='pg-active-itto_label'>{name}</span>
          {list.map((v, i) =>
            target === v ? (
              <span
                key={i}
                className='pg-active-itto_name is-clickable is-current'
                onClick={() => {
                  onClick(v)
                }}
              >{`${v}(${count[v]})`}</span>
            ) : (
              <span
                key={i}
                className='pg-active-itto_name is-clickable'
                onClick={() => {
                  onClick(v)
                }}
              >{`${v}(${count[v]})`}</span>
            )
          )}
          {target === 'single' ? (
            <span
              className='pg-active-itto_name is-clickable is-current'
              onClick={() => {
                onClick('single')
              }}
            >
              单个
            </span>
          ) : (
            <span
              className='pg-active-itto_name is-clickable'
              onClick={() => {
                onClick('single')
              }}
            >
              单个
            </span>
          )}
        </div>
      ))}
      <Table
        rowKey='id'
        tableLayout='fixed'
        columns={columns}
        dataSource={computeSource}
        pagination={false}
        bordered
        size='small'
        scroll={scroll}
      />
    </div>
  )
}

export default memo(ActiveITTO)
