import React, { Fragment, memo } from 'react'
import './Block.styl'
import Trans from '@com/Trans'

const classNameMap = {
  o: 'pg-jp-structure--block_line is-title',
  m: 'pg-jp-structure--block_line is-explain',
  n: 'pg-jp-structure--block_line is-notice',
  s: 'pg-jp-structure--block_line is-title'
}

const renderTable = (table, key) => {
  const { columns = [], rows = [] } = table
  const hasColumns = columns.length > 0
  const list = hasColumns ? [columns, ...rows] : rows
  return (
    <Fragment key={key}>
      {list.map((row, rowIndex) => (
        <div key={rowIndex} className='pg-jp-structure--block_row'>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className='pg-jp-structure--block_cell'>
              <p className='pg-jp-structure--block_cell-text'>
                <Trans text={cell} />
              </p>
            </div>
          ))}
        </div>
      ))}
    </Fragment>
  )
}

const parseLine = value => {
  if (value.startsWith('o::')) return { flag: 'o', text: value.slice(3) }
  if (value.startsWith('m::')) return { flag: 'm', text: value.slice(3) }
  if (value.startsWith('n::')) return { flag: 'n', text: value.slice(3) }
  if (value.startsWith('s::')) return { flag: 's', text: value.slice(3) }
  return { flag: '', text: value }
}

const renderLine = (value, key, no, isFirstLine) => {
  const { flag, text } = parseLine(value)
  const dispText = isFirstLine ? `${no + 1}. ${text}` : text
  const className = classNameMap[flag] || 'pg-jp-structure--block_line'
  return (
    <p key={key} className={className}>
      <Trans text={dispText} />
    </p>
  )
}

const parseExample = value => {
  if (value.startsWith('e::')) return { text: `▶︎　${value.slice(3)}` }
  if (value.startsWith('r::')) return { text: `　　ーー${value.slice(3)}` }
  if (value.startsWith('w::')) return { text: `✖︎　${value.slice(3)}` }
  return { text: value }
}

const renderExsmple = (value, key, no, isFirstLine) => {
  const { text } = parseExample(value)
  const dispText = isFirstLine ? `${no + 1}. ${text}` : text
  const className = 'pg-jp-structure--block_line is-example'
  return (
    <p key={key} className={className}>
      <Trans text={dispText} />
    </p>
  )
}

const Block = ({ title, content }) => (
  <div className='pg-jp-structure--block'>
    <p className='pg-jp-structure--block_title'>{title}</p>
    {content.map((lines, no) => (
      <div key={no} className='pg-jp-structure--block_lines'>
        {lines.map((v, i) => {
          if (typeof v === 'object' && v && Array.isArray(v.rows)) {
            return renderTable(v, i)
          }
          if (Array.isArray(v)) {
            return v.map((item, itemIndex) => renderExsmple(item, `${i}-${itemIndex}`, no, false))
          }
          return renderLine(v, i, no, i === 0)
        })}
      </div>
    ))}
  </div>
)

export default memo(Block)
