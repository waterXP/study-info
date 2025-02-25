import React, { memo, useState, useEffect, useMemo, useCallback } from 'react'
import './AITest.styl'
import { useSelector } from 'react-redux'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import Footer from '@com/Page/Footer'
import AIItem from '@com/AIItem'
import ai from '@/consts/ai'
import tmp from './tmp'

const filter = arr => {
  const tmp = {}
  const rest = []
  arr.forEach(v => {
    const { title, type, optionList } = v
    const str = `${title}/${type}/${optionList.map(({ id }) => id).join(',')}`
    if (!tmp[str]) {
      tmp[str] = true
      rest.push(v)
    }
  })
  return rest
}

const AITest = () => {
  const { showAn, typeMode } = useSelector(({ showAn, typeMode }) => ({
    showAn,
    typeMode
  }))
  const [anMap, setAnMap] = useState({})
  const [tstMap, setTstMap] = useState({})
  const [list, setList] = useState([])
  const [filters, setFilters] = useState({
    pageSize: 10,
    pageNo: 1,
    type: -1
  })
  useEffect(() => {
    if (tmp && tmp.length > 0) {
      const nextAI = filter([...ai, ...tmp])
      nextAI.sort((a, b) => (a.type === b.type ? a.id - b.id : a.type - b.type))
      console.log(nextAI)
      setList(nextAI)
    } else {
      setList(ai)
    }
  }, [])
  const {
    dispList,
    nextPageNo,
    prevPageNo,
    pageSize,
    current,
    totalPage,
    listArr,
    allList
  } = useMemo(() => {
    const { pageSize, pageNo } = filters
    const specMap = { chk: 0, sin: 1, mul: 2 }
    const spec = specMap[typeMode] === undefined ? -1 : specMap[typeMode]
    const allList = spec === -1 ? list : list.filter(v => v.type === spec)
    const totalPage = Math.ceil(allList.length / pageSize)
    const r = {
      dispList: [],
      current: 1,
      pageSize,
      nextPageNo: 0,
      prevPageNo: 0,
      totalPage,
      allList,
      listArr: '1'
        .repeat(totalPage)
        .split('')
        .map((_, i) => i + 1)
    }
    if (totalPage >= pageNo && pageNo >= 1) {
      r.current = pageNo
      r.dispList = allList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    } else {
      r.current = 1
      r.dispList = allList.slice(0, 10)
    }
    r.prevPageNo = r.current > 1 ? r.current - 1 : totalPage
    r.nextPageNo = r.current < totalPage ? r.current + 1 : 1

    return r
  }, [filters, list, typeMode])
  useEffect(() => {
    setTstMap({})
    const body = document.querySelector('.com-content')
    if (body) {
      body.scrollTop = 0
    }
  }, [dispList])
  const onPrevClick = useCallback(() => {
    if (prevPageNo) {
      setFilters(filters => ({ ...filters, pageNo: prevPageNo }))
    }
  }, [prevPageNo])
  const onNextClick = useCallback(() => {
    if (nextPageNo) {
      setFilters(filters => ({ ...filters, pageNo: nextPageNo }))
    }
  }, [nextPageNo])
  const setPageNo = useCallback(pageNo => {
    setFilters(filters => ({ ...filters, pageNo }))
  }, [])
  const title = useMemo(() => {
    const { pageSize } = filters
    return `${(current - 1) * pageSize + 1}-${current * pageSize}/${
      allList.length
    }`
  }, [allList, filters, current])
  const onSelect = useCallback(
    (id, answer, type) => {
      if (!anMap[id]) {
        setTstMap(tstMap => {
          const r = { ...tstMap }
          if (type === 2) {
            const ori = r[id] || {}
            r[id] = { ...ori, [answer]: !ori[answer] }
          } else {
            r[id] = answer
          }
          return r
        })
      }
    },
    [anMap]
  )
  const isSubmitted = useMemo(
    () => dispList.some(({ id }) => anMap[id]),
    [anMap, dispList]
  )
  const onCenterClick = useCallback(() => {
    if (isSubmitted) {
      setAnMap(anMap => {
        const r = { ...anMap }
        dispList.forEach(v => {
          delete r[v.id]
        })
        return r
      })
    } else {
      setAnMap(anMap => {
        const r = { ...anMap }
        dispList.forEach(v => {
          if (v.type === 2) {
            if (tstMap[v.id] && tstMap[v.id] !== -1) {
              let selSome = false
              const sel = {}
              v.optionList.forEach(op => {
                if (tstMap[v.id][op.id]) {
                  sel[op.id] = true
                  selSome = true
                }
              })
              r[v.id] = selSome ? sel : -1
            } else {
              r[v.id] = -1
            }
          } else {
            r[v.id] = tstMap[v.id] || -1
          }
        })
        return r
      })
    }
    setTstMap({})
  }, [tstMap, dispList, isSubmitted])
  return (
    <Page>
      <Header title={title} to='/' hideDefault ai>
        {list && (
          <div className='pg-ai-test_process'>
            {listArr.map(v => {
              const cName = ['pg-ai-test_p']
              const isCurrent = current === v
              if (isCurrent) {
                cName.push('is-current')
              } else {
                cName.push('on-click')
              }
              let hasError = false
              const curList = list.slice((v - 1) * pageSize, v * pageSize)
              const ful = curList.every(({ id, type, optionList }) => {
                if (anMap[id]) {
                  if (type === 2) {
                    if (
                      anMap[id] === -1 ||
                      optionList.some(v =>
                        v.checked ? !anMap[id][v.id] : anMap[id][v.id]
                      )
                    ) {
                      hasError = true
                    }
                  } else {
                    const tar = optionList.find(v => v.id === anMap[id])
                    if (!tar || !tar.checked) {
                      hasError = true
                    }
                  }
                  return true
                }
                return false
              })
              if (ful) {
                if (hasError) {
                  cName.push('is-error')
                } else {
                  cName.push('is-correct')
                }
              }
              if (isCurrent) {
                return <div key={v} className={cName.join(' ')} />
              }
              return (
                <div
                  key={v}
                  className={cName.join(' ')}
                  onClick={() => {
                    setPageNo(v)
                  }}
                />
              )
            })}
          </div>
        )}
      </Header>
      <Content>
        <div className='pg-ai-test_body'>
          {dispList.map(v => (
            <AIItem
              key={v.id}
              item={v}
              select={anMap[v.id]}
              inTst={tstMap[v.id]}
              onSelect={onSelect}
            />
          ))}
        </div>
      </Content>
      {totalPage > 1 && (
        <Footer
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          centerText={isSubmitted ? '重置' : '提交'}
          onCenterClick={!showAn && onCenterClick}
        />
      )}
    </Page>
  )
}

export default memo(AITest)
