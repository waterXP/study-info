import React, { memo, useMemo, useState, useCallback, useRef } from 'react'
import './Write.styl'
import Icon from '@com/Icon'
import { Modal, Input } from 'antd'
import JPText from '@com/JPText'

const Write = ({
  open,
  onCancel,
  title,
  onPrev,
  onNext,
  onCheck,
  showAnswer,
  course,
  onFavorite,
  favorites
}) => {
  const [input, setInput] = useState('')
  const onInputChange = useCallback(({ target: { value } }) => {
    setInput(value)
  }, [])
  const refInput = useRef(null)
  const footer = useMemo(
    () => (
      <div className='pg-jp-words_modal-footer'>
        <div className='pg-jp-words_modal-button on-click' onClick={onPrev}>
          上一个
        </div>
        <div className='pg-jp-words_modal-button on-click' onClick={onNext}>
          下一个
        </div>
        <div className='pg-jp-words_modal-button on-click' onClick={onCheck}>
          检查
        </div>
      </div>
    ),
    [onPrev, onNext, onCheck]
  )
  return (
    <Modal
      open={open}
      closable={false}
      footer={footer}
      onCancel={onCancel}
      title={title}
    >
      <div className='pg-jp-words_modal-body'>
        <Input
          ref={refInput}
          className='pg-jp-words_input'
          onPressEnter={onCheck}
          value={input}
          onChange={onInputChange}
          placeholder='入力してください'
        />
        {showAnswer && course && (
          <p className='pg-jp-words_input-tip'>
            <JPText kana={course.kana} mana={course.mana} />
            <span>{`${course.type ? `「${course.type}」` : ''}${
              course.cn || ''
            }`}</span>
          </p>
        )}
      </div>
      {course && (
        <div className='pg-jp-words_favorite on-click' onClick={onFavorite}>
          {favorites[course.id] ? (
            <Icon
              className='pg-jp-words_favorite-icon is-favorite'
              type='icon-favorites-fill'
            />
          ) : (
            <Icon className='pg-jp-words_favorite-icon' type='icon-favorites' />
          )}
        </div>
      )}
    </Modal>
  )
}

export default memo(Write)
