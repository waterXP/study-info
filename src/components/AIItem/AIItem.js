import React, { memo, useCallback } from 'react'
import './AIItem.styl'
import { useSelector } from 'react-redux'

const AIItem = ({ item, select, onSelect, inTst }) => {
  const { showNt, showAn } = useSelector(({ showNt, showAn }) => ({
    showNt,
    showAn
  }))
  const handleSelect = useCallback(
    anId => {
      onSelect(item.id, anId, item.type)
    },
    [item]
  )
  if (item) {
    const { title, note, optionList, type } = item
    return (
      <div className='com-ai-item'>
        <p className='com-ai-item_title'>
          {title
            .trim()
            .replace(/&lt;.*?&gt;/g, '')
            .replace('&mdash;', '—')}
        </p>
        {showNt && (
          <p className='com-ai-item_note'>
            {note
              .trim()
              .replace(/&lt;.*?&gt;/g, '')
              .replace('&mdash;', '—')}
          </p>
        )}
        <div className='com-ai-item_options'>
          {optionList.map(({ id, text, checked }) => {
            let cName = 'com-ai-item_option'
            if (showAn) {
              if (checked) {
                cName = 'com-ai-item_option is-checked'
              }
            } else if (type === 2) {
              if (inTst) {
                if (inTst[id]) {
                  cName = 'com-ai-item_option is-tst'
                }
              } else if (select) {
                if (select === -1) {
                  cName = checked
                    ? 'com-ai-item_option is-error-checked'
                    : 'com-ai-item_option'
                } else if (select[id]) {
                  cName = checked
                    ? 'com-ai-item_option is-select-checked'
                    : 'com-ai-item_option is-error'
                } else if (checked) {
                  cName = 'com-ai-item_option is-error-checked'
                }
              }
            } else if (inTst) {
              if (inTst === id) {
                cName = 'com-ai-item_option is-tst'
              }
            } else if (select) {
              if (select === id) {
                cName = checked
                  ? 'com-ai-item_option is-select-checked'
                  : 'com-ai-item_option is-error'
              } else if (checked) {
                cName = 'com-ai-item_option is-error-checked'
              }
            }

            return (
              <div
                key={id}
                className={cName}
                onClick={() => {
                  !showAn && !select && handleSelect(id)
                }}
              >
                {text
                  .trim()
                  .replace(/&lt;.*?&gt;/g, '')
                  .replace('&mdash;', '—')}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return null
}

export default memo(AIItem)
