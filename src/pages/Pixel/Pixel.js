import React, { Fragment, useMemo, useState } from 'react'
import { InputNumber, Button } from 'antd'
import './Pixel.styl'

const Pixel = () => {
  const [running, setRunning] = useState(false)

  const [rowCount, setRowCount] = useState(15)
  const [rowTips, setRowTips] = useState([[12, 2], [8]])

  const [columnCount, setColumnCount] = useState(20)
  const [columnTips, setColumnTips] = useState([[1, 2], [3]])

  const [styleX, setStyleX] = useState({})
  const [styleY, setStyleY] = useState({})

  const { rowList, rowTipMax } = useMemo(() => {
    if (rowCount > 0) {
      return {
        rowList: '0'
          .repeat(rowCount)
          .split('')
          .map((_, i) => i),
        rowTipMax: '0'
          .repeat(Math.ceil(rowCount / 2))
          .split('')
          .map((_, i) => i)
      }
    }
    return { rowList: [], rowTipMax: [] }
  }, [rowCount])
  const { columnList, columnTipMax } = useMemo(() => {
    if (columnCount > 0) {
      return {
        columnList: '0'
          .repeat(columnCount)
          .split('')
          .map((_, i) => i),
        columnTipMax: '0'
          .repeat(Math.ceil(columnCount / 2))
          .split('')
          .map((_, i) => i)
      }
    }
    return { columnList: [], columnTipMax: [] }
  }, [columnCount])
  const settings = (
    <div className='pg-pixel_settings'>
      <div className='pg-pixel_option'>
        <div className='pg-pixel_label'>Row</div>
        <InputNumber
          className='pg-pixel_total'
          precision={0}
          min={1}
          max={99}
          value={rowCount}
          onChange={setRowCount}
          disabled={running}
        />
        <div className='pg-pixel_label'>Column</div>
        <InputNumber
          className='pg-pixel_total'
          precision={0}
          min={1}
          max={99}
          value={columnCount}
          onChange={setColumnCount}
          disabled={running}
        />
        <Button
          className='pg-pixel_button'
          type='primary'
          onClick={() => {
            setRunning(pre => !pre)
          }}
        >
          {running ? 'Stop' : 'Run'}
        </Button>
      </div>
      {!running && rowCount > 0 && columnCount > 0 && (
        <>
          {rowList.map((_, i) => {
            const values = rowTips[i] || []
            return (
              <div key={i} className='pg-pixel_option'>
                <div className='pg-pixel_label'>{`Row ${i + 1}`}</div>
                {columnTipMax.map((_, j) => {
                  const isShow = j === 0 || values[j - 1] > 0
                  return isShow ? (
                    <InputNumber
                      key={j}
                      className='pg-pixel_tip'
                      precision={0}
                      min={1}
                      disabled={running}
                      value={values[j]}
                      onChange={v => {
                        setRowTips(pre => {
                          const next = [...pre]
                          if (!next[i]) {
                            next[i] = []
                          }
                          next[i][j] = v
                          return next
                        })
                      }}
                    />
                  ) : (
                    <Fragment key={j} />
                  )
                })}
              </div>
            )
          })}
          {columnList.map((_, i) => {
            const values = columnTips[i] || []
            return (
              <div key={i} className='pg-pixel_option'>
                <div className='pg-pixel_label'>{`Column ${i + 1}`}</div>
                {rowTipMax.map((_, j) => {
                  const isShow = j === 0 || values[j - 1] > 0
                  return isShow ? (
                    <InputNumber
                      key={j}
                      className='pg-pixel_tip'
                      precision={0}
                      min={1}
                      disabled={running}
                      value={values[j]}
                      onChange={v => {
                        setColumnTips(pre => {
                          const next = [...pre]
                          if (!next[i]) {
                            next[i] = []
                          }
                          next[i][j] = v
                          return next
                        })
                      }}
                    />
                  ) : (
                    <Fragment key={j} />
                  )
                })}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
  const columnsTipsComputed = useMemo(
    () =>
      columnList.map((_, i) => {
        const item = []
        const source = rowTips[i] || []
        rowTipMax.some((_, i) => {
          if (source[i] > 0) {
            item[i] = source[i]
            return false
          }
          return true
        })
        return item
      }),
    [rowTips, rowTipMax, columnList]
  )
  const rowsTipsComputed = useMemo(
    () =>
      rowList.map((_, i) => {
        const item = []
        const source = columnTips[i] || []
        columnTipMax.some((_, i) => {
          if (source[i] > 0) {
            item[i] = source[i]
            return false
          }
          return true
        })
        return item
      }),
    [rowList, columnTipMax, columnTips]
  )
  const onMouseEnterColumn = e => {
    const { target } = e
    const { offsetLeft, clientWidth } = target
    setStyleX({
      top: 0,
      left: offsetLeft,
      width: clientWidth,
      bottom: 0
    })
    setStyleY({})
  }
  const onMouseEnterRow = e => {
    const { target } = e
    const { offsetTop, clientHeight } = target
    setStyleX({})
    setStyleY({
      top: offsetTop,
      left: 0,
      right: 0,
      height: clientHeight
    })
  }
  const onMouseEnterCell = e => {
    const { target } = e
    const { offsetTop, clientHeight, offsetLeft, clientWidth } = target
    setStyleX({
      top: 0,
      left: offsetLeft,
      width: clientWidth,
      bottom: 0
    })
    setStyleY({
      top: offsetTop,
      left: 0,
      right: 0,
      height: clientHeight
    })
  }
  return (
    <>
      {rowCount > 0 && columnCount > 0 && (
        <div className='pg-pixel'>
          <div className='pg-pixel_body'>
            <div className='pg-pixel_light-x' style={styleX} />
            <div className='pg-pixel_light-y' style={styleY} />
            <div className='pg-pixel_row'>
              <div className='pg-pixel_empty' />
              {columnList.map(column => (
                <div
                  key={column}
                  className='pg-pixel_column-tip'
                  onMouseEnter={onMouseEnterColumn}
                >
                  {columnsTipsComputed[column] &&
                    columnsTipsComputed[column].map((v, i) => (
                      <div key={i} className='pg-pixel_tip-number'>
                        {v}
                      </div>
                    ))}
                </div>
              ))}
            </div>
            {rowList.map(row => (
              <div key={row} className='pg-pixel_row'>
                <div
                  className='pg-pixel_row-tip'
                  onMouseEnter={onMouseEnterRow}
                >
                  {rowsTipsComputed[row] &&
                    rowsTipsComputed[row].map((v, i) => (
                      <div key={i} className='pg-pixel_tip-number'>
                        {v}
                      </div>
                    ))}
                </div>
                {columnList.map(column => (
                  <div
                    key={column}
                    className='pg-pixel_cell'
                    onMouseEnter={onMouseEnterCell}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {settings}
    </>
  )
}

export default Pixel
