import React, { memo } from 'react'
import './CabinetPickCode.styl'
import CabinetReturn from '@/components/CabinetReturn'
import Icon from '@/components/Icon'

const CabinetPickCode = () => (
  <div className='cabinet-pick-code'>
    <CabinetReturn />
    <div>
      <div>
        <div>
          <p>收件人取件码：</p>
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
      </div>
    </div>
  </div>
)

export default memo(CabinetPickCode)
