import React, { memo, useRef, useEffect, useState, useCallback } from 'react'
import './JPPpt.styl'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '@com/Breadcrumb'
import ppt from '@/consts/jp/ppt'

const JPPpt = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [unit, setUnit] = useState(null)
  const refId = useRef(null)
  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      let unit = null
      ppt.some(v => {
        unit = v.find(v => v.id === id)
        return unit
      })
      if (unit) {
        refId.current = id
        setUnit(unit)
      }
    }
  }, [searchParams])
  const onPrevClick = useCallback(() => {
    if (refId.current) {
      let mainIndex = 0
      let subIndex = 0
      ppt.some((v, i) => {
        mainIndex = i
        const index = v.findIndex(v => v.id === refId.current)
        if (~index) {
          subIndex = index
        }
        return ~index
      })
      if (subIndex > 0) {
        const tar = ppt[mainIndex][subIndex - 1]
        navigate(`/jp-ppt?&id=${tar.id}`, { replace: true })
      } else {
        mainIndex = mainIndex > 0 ? mainIndex - 1 : ppt.length - 1
        subIndex = ppt[mainIndex].length - 1
        const tar = ppt[mainIndex][subIndex]
        navigate(`/jp-ppt?&id=${tar.id}`, { replace: true })
      }
    }
  }, [])
  const onNextClick = useCallback(() => {
    if (refId.current) {
      let mainIndex = 0
      let subIndex = 0
      ppt.some((v, i) => {
        mainIndex = i
        const index = v.findIndex(v => v.id === refId.current)
        if (~index) {
          subIndex = index
        }
        return ~index
      })
      if (subIndex < ppt[mainIndex].length - 1) {
        const tar = ppt[mainIndex][subIndex + 1]
        navigate(`/jp-ppt?&id=${tar.id}`, { replace: true })
      } else {
        mainIndex = mainIndex < ppt.length - 1 ? mainIndex + 1 : 0
        subIndex = 0
        const tar = ppt[mainIndex][subIndex]
        navigate(`/jp-ppt?&id=${tar.id}`, { replace: true })
      }
    }
  }, [])
  return (
    <div className='pg-jp-ppt'>
      <Breadcrumb to='/jp-ppts' noTop type='jp' wrap>
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
      <div className='pg-jp-ppt_footer'>
        <div className='pg-jp-ppt_footer-buttons'>
          <div
            className='pg-jp-ppt_footer-button on-click'
            onClick={onPrevClick}
          >
            上一个
          </div>
          <div
            className='pg-jp-ppt_footer-button is-right on-click'
            onClick={onNextClick}
          >
            下一个
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(JPPpt)
