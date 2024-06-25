import React from 'react'
import ch01 from './ch01'
import ch02 from './ch02'
import ch03 from './ch03'
import ch04 from './ch04'
import ch05 from './ch05'
import ch06 from './ch06'
import ch07 from './ch07'
import ch08 from './ch08'
import ch09 from './ch09'
import ch10 from './ch10'
import ch11 from './ch11'
import ch12 from './ch12'

const r = [
  ch01,
  ch02,
  ch03,
  ch04,
  ch05,
  ch06,
  ch07,
  ch08,
  ch09,
  ch10,
  ch11,
  ch12
]

const wordList = []
const phraseList = []

r.forEach(r => {
  const { lesson } = r
  lesson.forEach(v => {
    const { topic, word, phrase, no } = v
    v.topicSingle = topic.replace(/<(.*?)>/g, (_, txt) => {
      const [mana] = txt.split(',')
      return mana
    })
    v.topicAll = topic.replace(/<(.*?)>/g, (_, txt) => {
      const [mana, kana] = txt.split(',')
      return (
        <ruby>
          {mana}
          <rp>「</rp>
          <rt>{kana}</rt>
          <rp>」</rp>
        </ruby>
      )
    })
    word.forEach((v, i) => {
      v.id = `junior-${no}-word-${i}`
      wordList.push(v)
    })
    phrase.forEach((v, i) => {
      v.id = `junior-${no}-phrase-${i}`
      phraseList.push(v)
    })
  })
})

export default r
