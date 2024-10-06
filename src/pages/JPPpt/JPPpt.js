import React, { memo, useEffect, useState } from 'react'
import './JPPpt.styl'
import { useSearchParams } from 'react-router-dom'
import ppt from '@/consts/jp/ppt'
import Breadcrumb from '@com/Breadcrumb'

const JPPpt = () => {
  const [searchParams] = useSearchParams()
  const [unit, setUnit] = useState(null)
  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      let unit = null
      ppt.some(v => {
        unit = v.find(v => v.id === id)
        return unit
      })
      if (unit) {
        setUnit(unit)
      }
    }
  }, [searchParams])
  return (
    <div className='pg-jp-ppt'>
      <Breadcrumb to='/jp-ppts' noTop>
        返回
      </Breadcrumb>
      {unit && (
        <div className='pg-jp-ppt_content hide-scroll'>
          <div className='pg-jp-ppt_titles'>
            {unit.title.map((v, i) => (
              <p key={i} className='pg-jp-ppt_title'>
                {v}
              </p>
            ))}
          </div>
          <div className='pg-jp-ppt_explains'>
            {unit.explain.map((v, i) => (
              <div key={i} className='pg-jp-ppt_explain'>
                {v.map((v, i) => (
                  <p key={i} className='pg-jp-ppt_explain-item'>
                    {v}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className='pg-jp-ppt_examples'>
            {unit.example.map((v, i) => (
              <p key={i} className='pg-jp-ppt_example'>
                {v}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(JPPpt)
