import junior from './junior'
import intermediate from './intermediate'

const r = [...junior, ...intermediate]

export const words = []
r.forEach(({ lesson }) => {
  lesson.forEach(({ word, phrase }) => {
    words.push(...(word || []))
    words.push(...(phrase || []))
  })
})

export default r
