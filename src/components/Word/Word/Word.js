import React, { memo, useMemo } from 'react'
import './Word.styl'
import JPText from '@/components/JPText'

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
  const { kana, mana, type, cn, ex } = useMemo(() => word || {}, [word])
  if (inRecite) {
    if (!showResult) {
      return (
        <div className='com-word-word'>
          {switches.kana && kana && (
            <p className='com-word-word_line is-recite'>{kana}</p>
          )}
          {switches.mana && mana && (
            <p className='com-word-word_line is-recite'>{`（${mana}）`}</p>
          )}
          {switches.type && type && (
            <p className='com-word-word_line is-recite'>{`「${type}」`}</p>
          )}
          {switches.cn && cn && (
            <p className='com-word-word_line is-recite'>{cn}</p>
          )}
          {switches.ex && ex && <p className='com-word-word_line'>{ex}</p>}
        </div>
      )
    }
    return (
      <div className='com-word-word'>
        {kana && (
          <p
            className={
              switches.kana
                ? 'com-word-word_line is-recite'
                : 'com-word-word_line'
            }
          >
            {kana}
          </p>
        )}
        {mana && (
          <p
            className={
              switches.mana
                ? 'com-word-word_line is-recite'
                : 'com-word-word_line'
            }
          >{`（${mana}）`}</p>
        )}
        {type && (
          <p
            className={
              switches.type
                ? 'com-word-word_line is-recite'
                : 'com-word-word_line'
            }
          >{`「${type}」`}</p>
        )}
        {cn && (
          <p
            className={
              switches.cn
                ? 'com-word-word_line is-recite'
                : 'com-word-word_line'
            }
          >
            {cn}
          </p>
        )}
        {ex && (
          <p
            className={
              switches.ex
                ? 'com-word-word_line is-recite'
                : 'com-word-word_line'
            }
          >
            {ex}
          </p>
        )}
      </div>
    )
  }
  return (
    <div className='com-word-word'>
      <p className='com-word-word_line'>
        <JPText kana={kana} mana={mana} />
      </p>
      {type && <p className='com-word-word_line'>{`「${type}」`}</p>}
      {cn && <p className='com-word-word_line'>{cn}</p>}
      {ex && <p className='com-word-word_line'>{ex}</p>}
    </div>
  )
}

export default memo(Word)
