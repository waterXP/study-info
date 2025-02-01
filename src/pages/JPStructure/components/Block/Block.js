import React, { memo } from 'react'
import './Block.styl'
import Trans from '@com/Trans'

const classNameMap = {
  o: 'pg-jp-structure--block_line is-title',
  m: 'pg-jp-structure--block_line is-explain',
  e: 'pg-jp-structure--block_line is-example',
  n: 'pg-jp-structure--block_line is-notice',
  s: 'pg-jp-structure--block_line is-title'
}

const Block = ({ title, content }) => (
  <div className='pg-jp-structure--block'>
    <p className='pg-jp-structure--block_title'>{title}</p>
    {content.map((lines, no) => (
      <div key={no} className='pg-jp-structure--block_lines'>
        {lines.map((v, i) => {
          const [flag, text] = v.split('::')
          const dispText = i === 0 ? `${no + 1}. ${text}` : text
          const className = classNameMap[flag] || 'pg-jp-structure--block_line'
          if (flag === 't') {
            const rows = text.split('@').map(v => v.split(':'))
            return (
              <>
                {rows.map((row, i) => (
                  <div key={i} className='pg-jp-structure--block_row'>
                    {row.map((v, i) => (
                      <div key={i} className='pg-jp-structure--block_cell'>
                        <p className='pg-jp-structure--block_cell-text'>
                          <Trans text={v} />
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )
          }
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
