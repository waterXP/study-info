import React, { memo, useState, useEffect, useMemo } from 'react'
import './AITest.styl'
import Page from '@com/Page'
import Header from '@com/Page/Header'
import Content from '@com/Page/Content'
import AIItem from '@com/AIItem'
import ai from '@/consts/ai'
import tmp from './tmp'

const AITest = () => {
  const [list, setList] = useState([])
  const [filters, setFilters] = useState({
    pageSize: 10,
    pageNo: 1,
    type: -1
  })
  useEffect(() => {
    if (tmp && tmp.length > 0) {
      const cMap = {}
      ai.forEach(v => {
        cMap[v.id] = v
      })
      const nextAI = [...ai]
      tmp.forEach(v => {
        if (!cMap[v.id]) {
          nextAI.push(v)
        }
      })
      console.log(nextAI)
      nextAI.sort((a, b) => a.id - b.id)
      setList(nextAI)
    } else {
      setList(ai)
    }
  }, [])
  const { dispList, current, nextPageNo, prevPageNo, totalPage } =
    useMemo(() => {
      const { type, pageSize, pageNo } = filters
      const allList = [0, 1, 2].includes(type)
        ? list.filter(v => v.type === type)
        : list
      const totalPage = Math.ceil(allList.length / pageSize)

      const r = {
        dispList: [],
        current: 1,
        nextPageNo: 0,
        prevPageNo: 0,
        totalPage
      }
      if (totalPage > pageNo && pageNo > 0) {
        r.current = pageNo
        r.dispList = allList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      }
      if (r.current > 1) {
        r.prevPageNo = r.current - 1
      }
      if (r.current < totalPage) {
        r.nextPageNo = r.current + 1
      }

      return r
    }, [filters, list])
  console.log(list)
  return (
    <Page>
      <Header to='/' hideDefault />
      <Content>
        {dispList.map(v => (
          <AIItem id={v.id} item={v} />
        ))}
      </Content>
    </Page>
  )
}

export default memo(AITest)
