import React, { memo, useState, useMemo, useEffect, useCallback } from 'react'
import './CabinetPickList.styl'
import CabinetBody from '@/components/CabinetBody'
import Icon from '@/components/Icon'
import { findWaitTakeList } from '@/api/expressLocker'

const colors = [
  {
    color: { color: '#a855f7' },
    backgroundColor: { backgroundColor: '#fbf6ff' }
  },
  {
    color: { color: '#2c6cfe' },
    backgroundColor: { backgroundColor: '#eff6ff' }
  },
  {
    color: { color: '#10ba82' },
    backgroundColor: { backgroundColor: '#eefff4' }
  },
  {
    color: { color: '#ebb305' },
    backgroundColor: { backgroundColor: '#fefce8' }
  },
  {
    color: { color: '#eb4441' },
    backgroundColor: { backgroundColor: '#fef3f2' }
  }
]

const CabinetPickList = ({
  onUrl,
  deviceCode,
  userInfo,
  handleOpen,
  setLoading
}) => {
  const [list, setList] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const totalPage = useMemo(
    () => (list && list.length > 0 ? Math.ceil(list.length / 5) : 0),
    [list]
  )
  useEffect(() => {
    if (userInfo) {
      setLoading(true)
      findWaitTakeList({ deviceCode, takeUserId: userInfo.personId })
        .then(d => {
          if (d.code === 200) {
            setList(d.data || [])
            setPageNo(1)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [deviceCode, userInfo])
  const openBox = useCallback(box => {
    handleOpen('pick', { ...box, hasOthers: list && list.length > 1 })
  }, [])
  const dispList = useMemo(() => {
    if (list && list.length > 0) {
      const arr = list.slice((pageNo - 1) * 5, (pageNo - 1) * 5 + 5)
      if (arr.length > 0) {
        return arr
      }
      return list.slice(0, 5)
    }
    return []
  }, [list, pageNo])
  const onNext = useCallback(() => {
    setPageNo(pageNo => (pageNo < totalPage ? pageNo + 1 : pageNo))
  }, [totalPage])
  const onPrev = useCallback(() => {
    setPageNo(pageNo => (pageNo > 1 ? pageNo - 1 : pageNo))
  }, [])
  return (
    <CabinetBody delay={90} onUrl={onUrl} userInfo={userInfo}>
      <div className='pg-cabinet-pick-list'>
        <div className='pg-cabinet-pick-list_body'>
          <img
            className='pg-cabinet-pick-list_banner'
            src='./assets/box.jpg'
            alt='box'
          />
          <p className='pg-cabinet-pick-list_title'>{`你有${list.length}个快递待取`}</p>
          <div className='pg-cabinet-pick-list_content'>
            {dispList.map((v, index) => {
              const { color, backgroundColor } = colors[index % 5]
              return (
                <div key={index} className='pg-cabinet-pick-list_button-wrap'>
                  <div
                    className='pg-cabinet-pick-list_button on-click'
                    style={backgroundColor}
                    onClick={() => {
                      openBox(v)
                    }}
                  >
                    <Icon
                      className='pg-cabinet-pick-list_box-icon'
                      type='icon-baoguofahuo'
                      style={color}
                    />
                    <span className='pg-cabinet-pick-list_button-text'>
                      {v.boxName}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          {totalPage > 1 && (
            <div className='pg-cabinet-pick-list_pages'>
              {pageNo > 1 ? (
                <div
                  className='pg-cabinet-pick-list_page on-click'
                  onClick={onPrev}
                >
                  上一页
                </div>
              ) : (
                <div className='pg-cabinet-pick-list_page is-disabled'>上一页</div>
              )}
              {pageNo < totalPage ? (
                <div
                  className='pg-cabinet-pick-list_page on-click'
                  onClick={onNext}
                >
                  下一页
                </div>
              ) : (
                <div
                  className='pg-cabinet-save_button is-disabled'
                >
                  下一页
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPickList)
