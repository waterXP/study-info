import React, { Fragment } from 'react'

const chDelete = str => {
  if (typeof str === 'string' && str.includes('[[') && str.includes(']]')) {
    const r = []
    str.split('[[').forEach(v => {
      if (v.includes(']]')) {
        const [str, text] = v.split(']]')
        if (str.includes('((')) {
          str.split('((').forEach(v => {
            const [inStr, inText] = v.split('))')
            const [mana, kana] = inStr.split(',')
            if (mana && kana) {
              r.push(
                <span className='glb-delete'>
                  <ruby>
                    {mana}
                    <rp>「</rp>
                    <rt>{kana}</rt>
                    <rp>」</rp>
                  </ruby>
                </span>
              )
            } else {
              r.push(<span className='glb-delete'>{inStr}</span>)
            }
            r.push(<span className='glb-delete'>{chDelete(inText)}</span>)
          })
        } else {
          r.push(<span className='glb-delete'>{str}</span>)
          r.push(text)
        }
      } else {
        r.push(v)
      }
    })
    return r
  }
  return str
}
let i = 0
const trans = arr =>
  arr.map(line => {
    const r = []
    line.split('<<').forEach(v => {
      if (v.includes('>>')) {
        const [str, text] = v.split('>>')
        if (str.includes('((')) {
          str.split('((').forEach(v => {
            const [inStr, inText] = v.split('))')
            const [mana, kana] = inStr.split(',')
            if (mana && kana) {
              r.push(
                <span className='glb-cd'>
                  <ruby>
                    {mana}
                    <rp>「</rp>
                    <rt>{kana}</rt>
                    <rp>」</rp>
                  </ruby>
                </span>
              )
            } else {
              r.push(<span className='glb-cd'>{inStr}</span>)
            }
            r.push(<span className='glb-cd'>{chDelete(inText)}</span>)
          })
        } else if (Array.isArray(chDelete(str))) {
          r.push(
            <span className='glb-cd'>
              {chDelete(str).map(v => (
                <Fragment key={i++}>{v}</Fragment>
              ))}
            </span>
          )
        } else {
          r.push(<span className='glb-cd'>{chDelete(str)}</span>)
        }
        r.push(chDelete(text))
      } else {
        r.push(chDelete(v))
      }
    })
    return (
      <>
        {r.map(line => {
          if (typeof line === 'string') {
            const inlineR = []
            line.split('((').forEach(v => {
              if (v.includes('))')) {
                const [str, text] = v.split('))')
                const [mana, kana] = str.split(',')
                if (mana && kana) {
                  inlineR.push(
                    <ruby>
                      {mana}
                      <rp>「</rp>
                      <rt>{kana}</rt>
                      <rp>」</rp>
                    </ruby>
                  )
                } else {
                  inlineR.push(chDelete(str))
                }
                inlineR.push(chDelete(text))
              } else {
                inlineR.push(chDelete(v))
              }
            })
            return (
              <Fragment key={i++}>
                {inlineR.map(line => (
                  <Fragment key={i++}>{line}</Fragment>
                ))}
              </Fragment>
            )
          }
          if (Array.isArray(line)) {
            return (
              <Fragment key={i++}>
                {line.map(v => (
                  <Fragment key={i++}>{v}</Fragment>
                ))}
              </Fragment>
            )
          }
          return <Fragment key={i++}>{line}</Fragment>
        })}
      </>
    )
  })
export default [
  [
    {
      q: [
        'レポートを((作成,さくせい))するうえで((注意,ちゅうい))すべきことは、((事実,じじつ))なのか((意見,いけん))なのかを((明確,めいかく))にすることだ。'
      ]
    },
    {
      q: [
        '((田中,たなか))さんはいつも((人,ひと))のやることに((文句,もんく))を((言,い))うばかりで、((自分,じぶん))では((何,なに))もしない。'
      ]
    },
    {
      q: [
        'お((互,たが))い((感情的,かんじょうてき))になっていると((冷静,れいせい))に((話,はな))そうとしてもうまくいかないものだ。'
      ]
    },
    {
      q: [
        'A「((昨日,きのう))、また((仕事,しごと))で((失敗,しっぱい))しちゃったんだよね。この((仕事,しごと))、((私,わたし))に((向,む))いていないんだろうね。やっぱり((転職,てんしょく))しようかな。」',
        'B「((私,わたし))は((反対,はんたい))しないよ。((本当,ほんとう))に((向,む))いていないと((思,おも))うんだったら((続,つづ))けることもないと((思,おも))うからね。」'
      ]
    },
    {
      q: [
        '((日本,にほん))では、((99歳,きゅうじゅうきゅうさい))のお((祝,いわ))いを「((白寿,はくじゅ))」と((言,い))います。「((百,ひゃく))」の((字,じ))から「((一,いち))」をとると「（((白,しろ))」という((字,じ))になることからそう((呼,よ))ばれています。'
      ]
    }
  ],
  [
    {
      q: [
        'なぜときどき((駅,えき))ですれ((違,ちが))うだけの((彼女,かのじょ))のことがこんなに((気,き))になるのか((自分,じぶん))でもよくわからない。'
      ]
    },
    {
      q: [
        '((薬,くすり))は((正,ただ))しく((飲,の))まないと((得,え))られるはずの((効果,こうか))が((得,え))られないだけでなく((状態,じょうたい))を((悪化,あっか))させてしまう((危険,きけん))もある。'
      ]
    },
    {
      q: [
        '((狭,せま))い((部屋,へや))でもテーブルの((上,うえ))に((物,もの))を((置,お))かないようにするだけで((広,ひろ))く((感,かん))じられるようになると((本,ほん))に((書,か))いてあった。'
      ]
    },
    {
      q: [
        '((宇宙,うちゅう))にはこれだけ((多,おお))くの((星,ほし))があるのだからどこかの((星,ほし))に((生物,せいぶつ))がいたとしても((不思議,ふしぎ))ではないと((思,おも))う。'
      ]
    },
    {
      q: [
        '((講師,こうし))「((片付,かたづ))けが((苦手,にがて))という((話,はなし))をよく((聞,き))きますが、それは((決,けっ))して((性格,せいかく))や((能力,のうりょく))の((問題,もんだい))ではなくやり((方,かた))を((知,し))らないだけなので、やり((方,かた))を((身,み))につければ((必,かなら))ず((片付,かたづ))けられるようになります。」'
      ]
    }
  ],
  [
    {
      q: ['((朝,あさ))、((開花,かいか))した((時,とき))には((真,ま))っ((白,しろ))だった((花,はな))が((夕方,ゆうがた))が((近,ちか))づくにつれて((次第,しだい))にビンクへと((変化,へんか))していく((珍,めずら))しい((花,はな))があります。']
    },
    {
      q: ['((子供,こども))の((頃,ころ))は、((1年,いちねん))が((長,なが))く((感,かん))じられたのに、((年,とし))をとるにつれて((短,みじか))く((感,かん))じるようになるのはなぜだろうか。']
    },
    {
      q: ['((雑誌,ざっし))か((何,なに))かで((誰,だれ))かが((自分,じぶん))にとって((人生,じんせい))で((1番,いちばん))((大切,たいせつ))なのは((人,ひと))との((出会,であ))いだとインタビューに((答,こた))えていたのを((見,み))て、((本当,ほんとう))にそうだなと((思,おも))った。']
    },
    {
      q: ['((情報,じょうほう))をどのような((順番,じゅんばん))で((提示,ていじ))するかによって((相手,あいて))の((受,う))け((止,と))め((方,かた))が((変,か))わって((来,く))るので、((順番,じゅんばん))を((意識,いしき))して((話,はな))す((必要,ひつよう))がある。']
    },
    {
      q: ['私の職場では、節電のため、廊下の蛍光灯を一つおきにはずしている。']
    }
  ]
].map(v =>
  v.map(({ q }) => trans(q))
)
