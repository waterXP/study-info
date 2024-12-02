import React, { Fragment, memo } from 'react'
import './JPExec.styl'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import sort from '@/consts/jp/exec/sort'

const JPExec = () => (
  <Page>
    <Header to='/' ex />
    <Content>
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
    </Content>
  </Page>
)

export default memo(JPExec)
