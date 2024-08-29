import React, { memo, useCallback } from 'react'
import './JPNotes.styl'
import { useNavigate } from 'react-router-dom'
import note from '@/consts/jp/note'
import Breadcrumb from '@com/Breadcrumb'
import Box from '@com/Box'

const JPNotes = () => {
  const navigate = useNavigate()
  const gotoNote = useCallback((pId, id) => {
    console.log(pId, id)
    navigate(`/jp-note?id=${id}&pId=${pId}`)
  }, [navigator])
  return <Box>
    <Breadcrumb to='/' noTop>返回</Breadcrumb>
    {
      note.map(
        ({ id: pId, title, desc, list }) => <div key={pId}>
          <p className='pg-jp-notes_title'>{title}</p>
          <p className='pg-jp-notes_desc'>{desc}</p>
          <div className='pg-jp-notes_list'>
            {
              list.map(
                ({ id, name }) =>
                  <p
                    key={id}
                    className='pg-jp-notes_name on-click'
                    onClick={() => { gotoNote(pId, id) }}
                  >
                    { name }
                  </p>
              )
            }
          </div>
        </div>
      )
    }
  </Box>
}

export default memo(JPNotes)
