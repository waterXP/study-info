import React, { Fragment, memo, useMemo } from 'react'
import './Mana.styl'

const Mana = ({ mana, ruby }) => {
  const m = useMemo(() => (mana && mana.join('')) || '', [mana])
  if (ruby && mana && ruby.length === mana.length) {
    return (
      <>
        {mana.map((v, i) => {
          if (ruby[i]) {
            return (
              <ruby key={i}>
                {v}
                <rp>「</rp>
                <rt>{ruby[i]}</rt>
                <rp>」</rp>
              </ruby>
            )
          }
          return <Fragment key={i}>{v}</Fragment>
        })}
      </>
    )
  }
  return m
}

export default memo(Mana)
