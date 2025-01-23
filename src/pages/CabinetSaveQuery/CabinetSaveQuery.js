import React, { memo } from 'react'
import './CabinetSaveQuery.styl'
import CabinetReturn from '@/components/CabinetReturn'
import Icon from '@/components/Icon'

const CabinetSaveQuery = () => (
  <div className='cabinet-save-query'>
    <CabinetReturn />
    <div>
      <div>
        <div>
          <p>收件人手机尾号：</p>
          <div />
          <div />
          <div />
          <div />
        </div>
        <div>
          <div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          <div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
          </div>
          <div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
          <div>
            <div>0</div>
            <div>
              <Icon type='icon-qingkong' />
            </div>
            <div>
              <Icon type='icon-tuige' />
            </div>
          </div>
        </div>
        <div>
          <p>选择收件人</p>
          <p>张三</p>
          <p>李四</p>
          <p>王五</p>
          <div>
            <span>上一页</span>
            <span>返回</span>
            <span>下一页</span>
          </div>
        </div>
      </div>
      <div>
        <p>选择箱子大小</p>
        <div>
          <p>小箱</p>
          <p>中箱</p>
          <p>大箱</p>
        </div>
        <div>开锁</div>
        <div>取消</div>
      </div>
    </div>
  </div>
)

export default memo(CabinetSaveQuery)
