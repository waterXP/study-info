import React, { Fragment, memo } from 'react'
import './Block.styl'
import Trans from '@com/Trans'

const classNameMap = {
  o: 'pg-jp-structure--block_line is-title',
  m: 'pg-jp-structure--block_line is-explain',
  n: 'pg-jp-structure--block_line is-notice',
  s: 'pg-jp-structure--block_line is-title'
}

const parseTableCell = value => {
  if (typeof value !== 'string') {
    return { text: value, colSpan: 1, rowSpan: 1 }
  }
  let text = value
  let colSpan = 1
  let rowSpan = 1

  const colMatch = text.match(/^col-(\d+):(.*)$/)
  if (colMatch) {
    colSpan = +colMatch[1] || 1
    text = colMatch[2]
  }

  const rowMatch = text.match(/^row-(\d+):(.*)$/)
  if (rowMatch) {
    rowSpan = +rowMatch[1] || 1
    text = rowMatch[2]
  }

  return { text, colSpan, rowSpan }
}

const renderTable = (table, key) => {
  const { headers = [], columns = [], rows = [] } = table
  const headCells = headers.length > 0 ? headers : columns
  const hasHeadCells = headCells.length > 0
  const list = hasHeadCells ? [headCells, ...rows] : rows
  const skipMap = {}
  return (
    <Fragment key={key}>
      {list.map((row, rowIndex) => (
        <div key={rowIndex} className='pg-jp-structure--block_row'>
          {row.map((cell, cellIndex) => {
            if (skipMap[`${rowIndex}-${cellIndex}`]) {
              return null
            }
            const { text, colSpan, rowSpan } = parseTableCell(cell)
            if (rowSpan > 1) {
              for (let offset = 1; offset < rowSpan; offset += 1) {
                skipMap[`${rowIndex + offset}-${cellIndex}`] = true
              }
            }
            return (
              <div
                key={cellIndex}
                className={`pg-jp-structure--block_cell${
                  hasHeadCells && rowIndex === 0 ? ' is-header' : ''
                }`}
                style={{
                  flexGrow: colSpan,
                  flexShrink: 0,
                  flexBasis: 0,
                  alignSelf: rowSpan > 1 ? 'stretch' : 'auto'
                }}
              >
                <p className='pg-jp-structure--block_cell-text'>
                  <Trans text={text} />
                </p>
              </div>
            )
          })}
        </div>
      ))}
    </Fragment>
  )
}

const parseLine = value => {
  if (value && typeof value === 'object') {
    return null
  }
  if (typeof value !== 'string') {
    return { flag: '', text: `${value ?? ''}` }
  }
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
  if (value && typeof value === 'object') {
    return null
  }
  if (typeof value !== 'string') {
    return { text: `${value ?? ''}` }
  }
  if (value.startsWith('e::')) return { text: `▶︎　${value.slice(3)}` }
  if (value.startsWith('r::')) return { text: `　　ーー${value.slice(3)}` }
  if (value.startsWith('c::')) return { text: `　　${value.slice(3)}` }
  if (value.startsWith('w::')) return { text: `✖︎　${value.slice(3)}` }
  return { text: value }
}

const renderExsmple = (value, key, no, isFirstLine) => {
  const parsed = parseExample(value)
  if (!parsed || !parsed.text) {
    return null
  }
  const { text } = parsed
  const dispText = isFirstLine ? `${no + 1}. ${text}` : text
  const className = 'pg-jp-structure--block_line is-example'
  return (
    <p key={key} className={className}>
      <Trans text={dispText} />
    </p>
  )
}

const isTableBlock = value => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }
  return (
    Array.isArray(value.rows) ||
    Array.isArray(value.headers) ||
    Array.isArray(value.columns)
  )
}

const isEmptyObject = value =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  !isTableBlock(value) &&
  Object.keys(value).length === 0

const renderValue = (value, key, no, isFirstLine) => {
  if (isTableBlock(value)) {
    return renderTable(value, key)
  }
  if (Array.isArray(value)) {
    return value.map((item, itemIndex) =>
      renderExsmple(item, `${key}-${itemIndex}`, no, false)
    )
  }
  if (isEmptyObject(value)) {
    return null
  }
  if (value && typeof value === 'object') {
    return null
  }
  const parsed = parseLine(value)
  if (!parsed || !parsed.text) {
    return null
  }
  return renderLine(value, key, no, isFirstLine)
}

const Block = ({ title, content }) => (
  <div className='pg-jp-structure--block'>
    <p className='pg-jp-structure--block_title'>{title}</p>
    {content.map((lines, no) => (
      <div key={no} className='pg-jp-structure--block_lines'>
        {lines.map((v, i) => renderValue(v, i, no, i === 0))}
      </div>
    ))}
  </div>
)

export default memo(Block)
