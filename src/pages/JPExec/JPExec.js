import React, { Fragment, memo } from 'react'
import './JPExec.styl'
import Breadcrumb from '@com/Breadcrumb'
import sort from '@/consts/jp/exec/sort'

const JPExec = () => (
  <div className='pg-jp-exec hide-scroll'>
    <div className='pg-jp-exec_content'>
      <div className='pg-jp-exec_header'>
        <Breadcrumb to='/' noTop ex>
          返回
        </Breadcrumb>
      </div>
      <div className='pg-jp-exec_lesson'>
        {sort.map((v, i) => (
          <Fragment key={i}>
            <p className='pg-jp-exec_topic'>{`${i + 1} -----------`}</p>
            {v.map((v, i) => (
              <div key={i} className='pg-jp-exec_examples'>
                {v.map((v, i) => (
                  <p key={i} className='pg-jp-exec_example'>
                    {v}
                  </p>
                ))}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  </div>
)

export default memo(JPExec)
