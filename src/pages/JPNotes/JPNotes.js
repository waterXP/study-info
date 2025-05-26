import React, { memo, useCallback } from 'react'
import './JPNotes.styl'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import Box from '@com/Box'
import note from '@/consts/jp/note'

const JPNotes = () => {
  const navigate = useNavigate()
  const gotoNote = useCallback(
    id => {
      navigate(`/jp-note?&id=${id}`)
    },
    [navigator]
  )
  return (
    <Box>
      <Breadcrumb to='/' noTop type='jp'>
        返回
      </Breadcrumb>
      {note.map(({ id: pId, title, desc, list }) => (
        <div key={pId} className='pg-jp-notes_box'>
          <p
            className='pg-jp-notes_title on-click'
            onClick={() => {
              gotoNote(pId)
            }}
          >
            {title}
          </p>
          <p className='pg-jp-notes_desc'>{desc}</p>
          <div className='pg-jp-notes_list'>
            {list.map(({ id, name }) => (
              <p
                key={id}
                className='pg-jp-notes_name on-click'
                onClick={() => {
                  gotoNote(pId)
                }}
              >
                {name}
              </p>
            ))}
          </div>
        </div>
      ))}
    </Box>
  )
}

export default memo(JPNotes)
