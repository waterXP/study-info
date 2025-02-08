import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import './CabinetPickList.styl'
import { Carousel } from 'antd'
// import { useNavigate } from 'react-router-dom'
import CabinetBody from '@/components/CabinetBody'
import Icon from '@/components/Icon'

const CabinetPickList = () => {
  // const navigate = useNavigate()
  const ref = useRef(null)
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    setList([
      {
        id: '01',
        text: '01号箱'
      },
      {
        id: '02',
        text: '02号箱'
      },
      {
        id: '03',
        text: '03号箱'
      },
      {
        id: '07',
        text: '07号箱'
      },
      {
        id: '08',
        text: '08号箱'
      },
      {
        id: '12',
        text: '12号箱'
      }
    ])
  }, [])
  const handlePrev = useCallback(() => {
    ref.current && ref.current.prev && ref.current.prev()
  }, [])
  const handleNext = useCallback(() => {
    ref.current && ref.current.next && ref.current.next()
  }, [])
  const afterChange = useCallback(current => {
    setCurrent(current)
  }, [])
  const { canPrev, canNext, showArrow } = useMemo(() => {
    const r = { showArrow: false, canPrev: false, canNext: false }
    if (list && list.length > 3) {
      r.showArrow = true
      if (current > 0) {
        r.canPrev = true
      }
      if (current < list.length - 3) {
        r.canNext = true
      }
    }
    return r
  }, [current, list])
  const openBox = useCallback(() => {}, [])
  //   navigate('/pick')
  // }, [navigate])
  return (
    <CabinetBody delay={90}>
      <div className='pg-cabinet-pick-list'>
        <p className='pg-cabinet-pick-list_title'>{`你有${list.length}个快递待取`}</p>
        {showArrow ? (
          <div className='pg-cabinet-pick-list_body'>
            {canPrev ? (
              <Icon
                className='pg-cabinet-pick-list_arrorw on-click'
                type='icon-sanjiaoleft'
                onClick={handlePrev}
              />
            ) : (
              <Icon
                className='pg-cabinet-pick-list_arrorw is-disabled'
                type='icon-sanjiaoleft'
              />
            )}
            <div className='pg-cabinet-pick-list_wrap'>
              <Carousel
                ref={ref}
                slidesToShow={3}
                infinite={false}
                swipeToSlide
                afterChange={afterChange}
                dots={false}
              >
                {list.map(({ id, text }) => (
                  <div key={id} className='pg-cabinet-pick-list_button-wrap'>
                    <div
                      className='pg-cabinet-pick-list_button on-click'
                      onClick={openBox}
                    >
                      <span className='pg-cabinet-pick-list_button-text'>
                        {text}
                      </span>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            {canNext ? (
              <Icon
                className='pg-cabinet-pick-list_arrorw on-click'
                type='icon-sanjiaoright'
                onClick={handleNext}
              />
            ) : (
              <Icon
                className='pg-cabinet-pick-list_arrorw is-disabled'
                type='icon-sanjiaoright'
              />
            )}
          </div>
        ) : (
          <div className='pg-cabinet-pick-list_body'>
            {list.map(({ id, text }) => (
              <div key={id} className='pg-cabinet-pick-list_button-wrap'>
                <div
                  className='pg-cabinet-pick-list_button on-click'
                  onClick={openBox}
                >
                  <span className='pg-cabinet-pick-list_button-text'>
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CabinetBody>
  )
}

export default memo(CabinetPickList)
