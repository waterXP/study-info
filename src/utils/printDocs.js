// label:
// h>>> 主标题
// t>>> 段落标题
// mh>>> 表格首行
// md>>> 表格内容行
// s>>> 小标题
// b>>> 提示
// r>>> 文本右对齐
// https://jp.hujiang.com/

export const printLesson = txt => {
  const a = txt
    .replace(/\n\n/g, '\n')
    .split('\n')
    .map(v => v.trim())
  const r = a.map(v => `'${v}'`).join(',')
  console.log(r)
  return r
}

export const printDocs = txt => {
  const a = txt
    .replace(/\n\n/g, '\n')
    .split('\n')
    .map(v => v.trim())
  const word = []
  const phrase = []

  a.forEach(txt => {
    if (txt.includes('[')) {
      const r = {
        kana: '',
        mana: '',
        type: '',
        cn: ''
      }
      const [be, af] = txt.split('[')
      const [kana, manaF] = be.split('（')
      if (kana) {
        r.kana = kana.trim()
      }
      if (manaF) {
        const manaS = manaF.trim()
        r.mana = manaS.slice(0, manaS.length - 1).trim()
      }
      if (af) {
        const [type, cn] = af.split(']')
        if (type) {
          r.type = type.trim()
        }
        if (cn) {
          r.cn = cn.trim()
        }
      }
      word.push(
        `{kana:'${r.kana}',mana:'${r.mana}',type:'${r.type}',cn:'${r.cn}'}`
      )
    } else {
      const r = {
        kana: '',
        mana: '',
        cn: ''
      }
      const [kana, af] = txt.split('（')
      if (kana) {
        r.kana = kana.trim()
      }
      if (af) {
        const [mana, cn] = af.split('）')
        if (mana) {
          r.mana = `${r.kana[0] === '～' ? '～' : ''}${mana.trim()}`
        }
        if (cn) {
          r.cn = cn.trim()
        }
      }
      phrase.push(`{kana:'${r.kana}',mana:'${r.mana}',cn:'${r.cn}'}`)
    }
  })
  const r = {
    word: word.join(','),
    phrase: phrase.join(',')
  }
  console.log(r.word)
  console.log(r.phrase)
  return r
}

export default null
