import fs from 'fs'
import path from 'path'

const wrapPageStyles = [
  'src/pages/JLPT/JLPT.styl',
  'src/pages/Gaoxiang/Gaoxiang.styl',
  'src/pages/JPNote/JPNote.styl',
  'src/pages/JPPpt/JPPpt.styl',
  'src/pages/JPN2/JPN2.styl'
]

describe('wrap page layout', () => {
  it('does not keep extra top padding on page roots that use wrapped breadcrumbs', () => {
    wrapPageStyles.forEach(file => {
      const source = fs.readFileSync(path.resolve(file), 'utf8')

      expect(source).not.toMatch(/padding 16px 0 0/)
    })
  })
})
