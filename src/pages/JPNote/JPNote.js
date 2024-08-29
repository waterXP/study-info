import React, { memo, useState, useEffect } from 'react'
import './JPNote.styl'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import note from '@/consts/jp/note'

const JPNote = () => {
  const [searchParams] = useSearchParams()
  const [list, setList] = useState([])
  useEffect(() => {
    const pId = searchParams.get('pId')
    if (pId) {
      const unit = note.find(({ id }) => id === pId)
      if (unit) {
        setList(unit.list)
      }
    }
  }, [searchParams])
  console.log('list', list)
  return (
    <div className='pg-jp-note'>
      <Breadcrumb to='/jp-notes' noTop>返回</Breadcrumb>
      <div className='pg-jp-note_content hide-scroll'>
        {
          list.map(
            ({ id, name, type, columns, dataSource, texts }) => {
              const style = type === 'table' && columns && columns.length
                ? { width: `${100 / columns.length}%` }
                : {}
              return <div key={id} class='pg-jp-note_block'>
                { name && <p className='pg-jp-note_title'>{name}</p> }
                {
                  type === 'table'
                    ? <div>
                      <div className='pg-jp-note_column is-header'>
                        {columns.map(v => (
                          <div key={v} className='pg-jp-note_cell is-header' style={style}>{v}</div>
                        ))}
                      </div>
                      {dataSource.map((v, i) => (
                        <div key={i} className='pg-jp-note_column'>
                          {v.map(v => (
                            <div key={v} className='pg-jp-note_cell' style={style}>
                              {
                                Array.isArray(v)
                                  ? v.map((v, i) => <p key={i}>{v}</p>)
                                  : v
                              }
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    : <div>
                      {
                        texts.map(
                          (v, i) => {
                            const type = typeof v === 'string'
                              ? 'text'
                              : v.type
                            const text = typeof v === 'string'
                              ? v
                              : v.text
                            return <p key={i} className={`pg-jp-note_text is-${type}`}>{text}</p>
                          }
                        )
                      }
                    </div>
                }
              </div>
            }
          )
        }
        <div className='pg-jp-note_bottom' />
      </div>
    </div>
  )
}

export default memo(JPNote)
