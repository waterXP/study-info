import React, { memo, useMemo, useState, useCallback, useEffect } from 'react'
import './CabinetInput.styl'
import Icon from '@/components/Icon'

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'icon-qingkong', 'icon-tuige']
const blockList = [0, 1, 2, 3]

const CabinetInput = ({
  title,
  onFullChange,
  list,
  current,
  onSelect,
  onClear
}) => {
  const [pageNo, setPageNo] = useState(0)
  useEffect(() => {
    setPageNo(0)
  }, [list])
  const { dispList, maxPageNo, hasPagination } = useMemo(() => {
    const r = { dispList: [], maxPageNo: 0, hasPagination: false }
    if (list && list.length > 0) {
      const maxPageNo = Math.ceil(list.length / 5) - 1
      const pg = pageNo < maxPageNo ? pageNo : maxPageNo
      r.hasPagination = list.length > 5
      r.maxPageNo = maxPageNo
      r.dispList = list.slice(pg * 5, (pg + 1) * 5)
    }
    return r
  }, [list, pageNo])
  const onNext = useCallback(() => {
    setPageNo(pageNo => (pageNo < maxPageNo ? pageNo + 1 : maxPageNo))
  }, [maxPageNo])
  const onPrev = useCallback(() => {
    setPageNo(pageNo => (pageNo > 0 ? pageNo - 1 : 0))
  }, [])
  const showList = useMemo(() => list && list.length > 0, [list])
  const [values, setValues] = useState(['', '', '', ''])
  const [cur, setCur] = useState(0)
  useEffect(() => {
    if (values.every(v => typeof v === 'number')) {
      onFullChange(values)
    }
  }, [values])
  const onButton = useCallback(
    v => {
      if (v === 'icon-qingkong') {
        setValues(['', '', '', ''])
        setCur(0)
      } else if (v === 'icon-tuige') {
        const r = [...values]
        if (r[cur] === '' && cur > 0) {
          setValues(values => {
            const r = [...values]
            r[cur - 1] = ''
            return r
          })
          setCur(cur => (cur > 0 ? cur - 1 : 0))
        } else {
          setValues(values => {
            const r = [...values]
            r[cur] = ''
            return r
          })
        }
      } else {
        setValues(values => {
          const r = [...values]
          r[cur] = v
          return r
        })
        setCur(cur => (cur < 3 ? cur + 1 : 3))
      }
    },
    [cur, values]
  )
  const handleClear = useCallback(() => {
    onClear && onClear()
    setValues(['', '', '', ''])
    setCur(0)
  }, [onClear])
  const handleCancel = useCallback(() => {
    if (list && list.length > 1) {
      onSelect('')
    } else {
      onClear && onClear()
      setValues(['', '', '', ''])
      setCur(0)
    }
  }, [list, onSelect])
  const targetName = useMemo(() => {
    if (Array.isArray(list)) {
      const target = list.find(({ value }) => value === current)
      if (target) {
        return target.name
      }
    }
    return ''
  }, [current, list])
  return (
    <div className='com-cabinet-input'>
      <p className='com-cabinet-input_title'>{title}</p>
      <div className='com-cabinet-input_blocks'>
        {blockList.map(v =>
          v === cur ? (
            <div key={v} className='com-cabinet-input_block is-current'>
              <span className='com-cabinet-input_block-text'>{values[v]}</span>
            </div>
          ) : (
            <div
              key={v}
              className='com-cabinet-input_block'
              onClick={() => {
                setCur(v)
              }}
            >
              <span className='com-cabinet-input_block-text'>{values[v]}</span>
            </div>
          )
        )}
      </div>
      {showList ? (
        targetName ? (
          <div className='com-cabinet-input_list'>
            <div className='com-cabinet-input_list-detail'>
              <p className='com-cabinet-input_list-topic'>收件人姓名：</p>
              <p className='com-cabinet-input_list-topic'>{targetName}</p>
            </div>
            <div className='com-cabinet-input_list-buttons'>
              <div
                className='com-cabinet-input_list-button on-click'
                onClick={handleCancel}
              >
                返回
              </div>
            </div>
          </div>
        ) : (
          <div className='com-cabinet-input_list'>
            <p className='com-cabinet-input_list-topic'>选择收件人：</p>
            <div className='com-cabinet-input_list-body'>
              {dispList.map(({ userName, userId }) =>
                current === userId ? (
                  <div
                    key={userId}
                    className='com-cabinet-input_list-item is-current'
                  >
                    {userName}
                  </div>
                ) : (
                  <div
                    key={userId}
                    className='com-cabinet-input_list-item'
                    onClick={() => {
                      onSelect && onSelect(userId)
                    }}
                  >
                    {userName}
                  </div>
                )
              )}
            </div>
            <div className='com-cabinet-input_list-buttons'>
              {hasPagination &&
                (pageNo > 0 ? (
                  <div
                    className='com-cabinet-input_list-button on-click'
                    onClick={onPrev}
                  >
                    上一页
                  </div>
                ) : (
                  <div className='com-cabinet-input_list-button is-disabled'>
                    上一页
                  </div>
                ))}
              <div
                className='com-cabinet-input_list-button on-click'
                onClick={handleClear}
              >
                返回
              </div>
              {hasPagination &&
                (pageNo < maxPageNo ? (
                  <div
                    className='com-cabinet-input_list-button on-click'
                    onClick={onNext}
                  >
                    下一页
                  </div>
                ) : (
                  <div className='com-cabinet-input_list-button is-disabled'>
                    下一页
                  </div>
                ))}
            </div>
          </div>
        )
      ) : (
        <div className='com-cabinet-input_buttons'>
          {buttons.map(v => (
            <div
              key={v}
              className='com-cabinet-input_button on-click'
              onClick={() => {
                onButton(v)
              }}
            >
              {typeof v === 'number' ? (
                <span className='com-cabinet-input_button-text'>{v}</span>
              ) : (
                <Icon className='com-cabinet-input_button-icon' type={v} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(CabinetInput)
