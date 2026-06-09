import React, { Fragment, memo } from 'react'
import './Block.styl'
import Trans from '@com/Trans'

const classNameMap = {
  o: 'pg-jp-structure--block_line is-title',
  m: 'pg-jp-structure--block_line is-explain',
  e: 'pg-jp-structure--block_line is-example',
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

const Block = ({ title, content }) => (
  <div className='pg-jp-structure--block'>
    <p className='pg-jp-structure--block_title'>{title}</p>
    {content.map((lines, no) => (
      <div key={no} className='pg-jp-structure--block_lines'>
        {lines.map((v, i) => {
          if (typeof v === 'object' && v && Array.isArray(v.rows)) {
            return renderTable(v, i)
          }
          const [flag, text] = v.split('::')
          const dispText = i === 0 ? `${no + 1}. ${text}` : text
          const className = classNameMap[flag] || 'pg-jp-structure--block_line'
          return (
            <p key={i} className={className}>
              <Trans text={dispText} />
            </p>
          )
        })}
      </div>
    ))}
  </div>
)

export default memo(Block)
