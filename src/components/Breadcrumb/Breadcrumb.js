import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Breadcrumb.styl'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TextButton from '@com/Buttons/TextButton'

const Breadcrumb = ({
  to = '/',
  children,
  noTop,
  title,
  qa,
  ex,
  ls,
  ai,
  hideDefault,
  type,
  wrap
}) => {
  const dispatch = useDispatch()
  const showCn = useSelector(({ showCn }) => showCn)
  const showEx = useSelector(({ showEx }) => showEx)
  const showQa = useSelector(({ showQa }) => showQa)
  const showLs = useSelector(({ showLs }) => showLs)
  const displayType = useSelector(({ displayType }) => displayType)
  const showNt = useSelector(({ showNt }) => showNt)
  const showAn = useSelector(({ showAn }) => showAn)
  const typeMode = useSelector(({ typeMode }) => typeMode)
  const navigate = useNavigate()
  const onClick = useCallback(
    e => {
      e.stopPropagation()
      if (typeof to === 'function') {
        to()
      } else {
        navigate(type === 'jp' && to === '/' ? '/jlpt' : to)
      }
    },
    [to, navigate, type]
  )
  const onHome = useCallback(
    e => {
      e.stopPropagation()
      navigate('/gaoxiang')
    },
    [navigate]
  )
  const changeCn = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayCn' })
  }, [])
  const changeEx = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayEx' })
  }, [])
  const changeQa = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayQa' })
  }, [])
  const changeNt = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeShowNt' })
  }, [])
  const changeAn = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeShowAn' })
  }, [])
  const changeTypeMode = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeTypeMode' })
  }, [])
  const changeLs = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayLs' })
  }, [])
  const changeDisplayType = useCallback(e => {
    e.stopPropagation()
    dispatch({ type: 'changeDisplayType' })
  }, [])
  return (
    <div className={wrap ? 'com-breadcrumb is-wrap' : 'com-breadcrumb'}>
      <div className='com-breadcrumb_left'>
        <span className='com-breadcrumb_flag'>&lt;&nbsp;</span>
        {!noTop && (
          <>
            <TextButton onClick={onHome}>首页</TextButton>
            <span>&nbsp;/&nbsp;</span>
          </>
        )}
        <TextButton onClick={onClick}>{children}</TextButton>
        {title && <span>&nbsp;&nbsp;{title}</span>}
      </div>
      <div className='com-breadcrumb_right'>
        {type === 'jp' && (
          <>
            {ai && (
              <span
                className={`${
                  showAn ? 'com-breadcrumb_on' : 'com-breadcrumb_off'
                } on-click`}
                onClick={changeAn}
              >
                an
              </span>
            )}
            {ai && (
              <span
                className={`${
                  showNt ? 'com-breadcrumb_on' : 'com-breadcrumb_off'
                } on-click`}
                onClick={changeNt}
              >
                nt
              </span>
            )}
            {ai && (
              <span className='com-breadcrumb_on on-click' onClick={changeTypeMode}>
                {typeMode}
              </span>
            )}
            {qa && (
              <span
                className={`${
                  showQa ? 'com-breadcrumb_on' : 'com-breadcrumb_off'
                } on-click`}
                onClick={changeQa}
              >
                qa
              </span>
            )}
            {ex && (
              <span
                className={`${
                  showEx ? 'com-breadcrumb_on' : 'com-breadcrumb_off'
                } on-click`}
                onClick={changeEx}
              >
                ex
              </span>
            )}
            {ls && (
              <span
                className={`${
                  showLs ? 'com-breadcrumb_on' : 'com-breadcrumb_off'
                } on-click`}
                onClick={changeLs}
              >
                ls
              </span>
            )}
            {!hideDefault && (
              <>
                <span
                  className={`${
                    showCn ? 'com-breadcrumb_on' : 'com-breadcrumb_off'
                  } on-click`}
                  onClick={changeCn}
                >
                  cn
                </span>
                <span
                  className='com-breadcrumb_on on-click'
                  onClick={changeDisplayType}
                >
                  {displayType}
                </span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
Breadcrumb.propTypes = {}

export default memo(Breadcrumb)
