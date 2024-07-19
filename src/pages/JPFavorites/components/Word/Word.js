import React, { memo, useMemo } from 'react'
import './Word.styl'

const Word = ({ word, switches, showResult }) => {
  const inRecite = useMemo(() => {
    const { kana, mana, cn, type } = switches
    let len = 0
    let a = 0
    if (word.kana) {
      len++
      a += +kana
    }
    if (word.mana) {
      len++
      a += +mana
    }
    if (word.type) {
      len++
      a += +type
    }
    if (word.cn) {
      len++
      a += +cn
    }
    if (len === a || a === 0) {
      return false
    }
    return true
  }, [switches, word])
  const { kana, mana, type, cn } = useMemo(() => word || {}, [word])
  if (inRecite) {
    if (!showResult) {
      return (
        <div className='pg-jp-words--word'>
          {switches.kana && kana && (
            <p className='pg-jp-words--word_line is-recite'>{kana}</p>
          )}
          {switches.mana && mana && (
            <p className='pg-jp-words--word_line is-recite'>{`（${mana}）`}</p>
          )}
          {switches.type && type && (
            <p className='pg-jp-words--word_line is-recite'>{`「${type}」`}</p>
          )}
          {switches.cn && cn && (
            <p className='pg-jp-words--word_line is-recite'>{cn}</p>
          )}
        </div>
      )
    }
    return (
      <div className='pg-jp-words--word'>
        {kana && (
          <p
            className={
              switches.kana
                ? 'pg-jp-words--word_line is-recite'
                : 'pg-jp-words--word_line'
            }
          >
            {kana}
          </p>
        )}
        {mana && (
          <p
            className={
              switches.mana
                ? 'pg-jp-words--word_line is-recite'
                : 'pg-jp-words--word_line'
            }
          >{`（${mana}）`}</p>
        )}
        {type && (
          <p
            className={
              switches.type
                ? 'pg-jp-words--word_line is-recite'
                : 'pg-jp-words--word_line'
            }
          >{`「${type}」`}</p>
        )}
        {cn && (
          <p
            className={
              switches.cn
                ? 'pg-jp-words--word_line is-recite'
                : 'pg-jp-words--word_line'
            }
          >
            {cn}
          </p>
        )}
      </div>
    )
  }
  return (
    <div className='pg-jp-words--word'>
      {kana && <p className='pg-jp-words--word_line'>{kana}</p>}
      {mana && <p className='pg-jp-words--word_line'>{`（${mana}）`}</p>}
      {type && <p className='pg-jp-words--word_line'>{`「${type}」`}</p>}
      {cn && <p className='pg-jp-words--word_line'>{cn}</p>}
    </div>
  )
}

export default memo(Word)
