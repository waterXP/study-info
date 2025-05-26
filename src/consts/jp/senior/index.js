import ch01 from './ch01'
import ch02 from './ch02'
import ch03 from './ch03'
import ch04 from './ch04'
import ch05 from './ch05'
import ch06 from './ch06'

const r = [
  ch01,
  ch02,
  ch03,
  ch04,
  ch05,
  ch06
]

const wordList = []
const phraseList = []

r.forEach(
  r => {
    const { lesson } = r
    lesson.forEach(l => {
      const { words, no } = l
      l.word = []
      l.phrase = []
      words.forEach(w => {
        const { word, phrase } = w
        word.forEach((v, i) => {
          v.id = `senior-${no}-word-${i}`
          l.word.push(v)
          wordList.push(v)
        })
        phrase.forEach((v, i) => {
          v.id = `senior-${no}-phrase-${i}`
          l.phrase.push(v)
          phraseList.push(v)
        })
      })
    })
  }
)

export default r
