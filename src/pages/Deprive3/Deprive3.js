import React, { memo, useState, useMemo, useCallback } from 'react'
import './Deprive3.styl'
import { Input } from 'antd'
import { copyToClipboard } from '@/utils/tool'

const { TextArea } = Input

const Deprive3 = () => {
  const [s, setS] = useState('')
  const [v, setV] = useState('')
  const [pre, setPre] = useState('pg')
  const [cha, setCha] = useState('1')
  const [no, setNo] = useState('1')
  const [key, setKey] = useState('')
  const onChangeCn = useCallback(({ target: { value } }) => {
    setS(value)
  }, [])
  const onChangeEn = useCallback(({ target: { value } }) => {
    setV(value)
  }, [])
  const onPreChange = useCallback(({ target: { value } }) => {
    setPre(value)
  }, [])
  const onChaChange = useCallback(({ target: { value } }) => {
    setCha(value)
  }, [])
  const onNoChange = useCallback(({ target: { value } }) => {
    setNo(value)
  }, [])
  const changeValue = useCallback(({ target: { value } }) => {
    setKey(value)
  }, [])
  const onCopy1 = useCallback(() => {
    copyToClipboard(`import { withTranslation } from '@/utils/i18n'

@withTranslation()`)
  }, [])
  const onCopy2 = useCallback(() => {
    copyToClipboard(`import { useTranslation } from '@/utils/i18n'
const { t } = useTranslation()`)
  }, [])
  const onCopy3 = useCallback(() => {
    if (key && key.trim()) {
      copyToClipboard(`t('${key.trim()}')`)
    }
  }, [key])
  const onCopy4 = useCallback(() => {
    if (key && key.trim()) {
      copyToClipboard(`{t('${key.trim()}')}`)
    }
  }, [key])
  const onCopy5 = useCallback(() => {
    if (key && key.trim()) {
      copyToClipboard(`this.props.t('${key.trim()}')`)
    }
  }, [key])
  const onCopy6 = useCallback(() => {
    if (key && key.trim()) {
      copyToClipboard(`i18next.t('${key.trim()}')`)
    }
  }, [key])
  const { cn, en, count, cur } = useMemo(() => {
    const r = { cn: '', en: '', count: 0, cur: 0 }
    if (typeof v === 'string' && typeof s === 'string' && s && v) {
      const cc = +cha
      const nn = +no
      const co = {
        i: 0,
        f: false
      }
      if (pre && !Number.isNaN(cc) && !Number.isNaN(nn)) {
        co.f = true
        co.i = nn
      }
      const cns = s.replace(/'/g, "\\'").split('\n').filter(Boolean)
      const ens = v.replace(/'/g, "\\'").split('\n').filter(Boolean)
      const keys = ens.map(v => {
        const r = v.split(' ').join('_').toLocaleLowerCase()
        if (co.f && r.length > 30) {
          return `${pre}_${cc}_${++co.i}`
        }
        return r
      })
      if (co.i && co.f) {
        r.cur = co.i
      }
      const cnstr = cns.map((v, i) => `${keys[i]}: '${v}'`).join(',\n')
      const enstr = ens.map((v, i) => `${keys[i]}: '${v}'`).join(',\n')
      r.count = keys.length
      if (cnstr) {
        r.cn = `\n${cnstr},`
      }
      if (enstr) {
        r.en = `\n${enstr},`
      }
    }
    return r
  }, [v, s, pre, cha, no])
  const copyCn = useCallback(() => {
    if (cn) {
      copyToClipboard(cn)
    }
  }, [cn])
  const copyEn = useCallback(() => {
    if (en) {
      copyToClipboard(en)
    }
  }, [en])
  const onUpdate = useCallback(() => {
    const n = +no
    if (!Number.isNaN(n)) {
      setNo(n + count)
    }
  }, [no, count])
  return (
    <div className='pg-deprive-3'>
      <div className='pg-deprive-3_top'>
        <TextArea
          className='pg-deprive-3_item'
          value={s}
          onChange={onChangeCn}
        />
        <div className='pg-deprive-3_divider' />
        <TextArea
          className='pg-deprive-3_item'
          value={v}
          onChange={onChangeEn}
        />
      </div>
      <div className='pg-deprive-3_flex'>
        <p className='pg-deprive-3_label'>pre:</p>
        <Input
          className='pg-deprive-3_input'
          value={pre}
          onChange={onPreChange}
        />
        <p className='pg-deprive-3_label'>cha:</p>
        <Input
          className='pg-deprive-3_input'
          value={cha}
          onChange={onChaChange}
        />
        <p className='pg-deprive-3_label'>no:</p>
        <Input
          className='pg-deprive-3_input'
          value={no}
          onChange={onNoChange}
        />
        <div className='pg-deprive-3_button on-click' onClick={onUpdate}>
          {`Update (${cur || 0})`}
        </div>
      </div>
      <div className='pg-deprive-3_bottom'>
        <div className='pg-deprive-3_text'>
          <div className='pg-deprive-3_value'>{cn}</div>
          <div className='pg-deprive-3_button on-click' onClick={copyCn}>
            Copy
          </div>
        </div>
        <div className='pg-deprive-3_divider' />
        <div className='pg-deprive-3_text'>
          <div className='pg-deprive-3_value'>{en}</div>
          <div className='pg-deprive-3_button on-click' onClick={copyEn}>
            Copy
          </div>
        </div>
      </div>
      <div className='pg-deprive-3_tap'>
        <div className='pg-deprive-3_r-button on-click' onClick={onCopy1}>withTranslation</div>
        <div className='pg-deprive-3_r-button on-click' onClick={onCopy2}>useTranslation</div>
        <Input className='pg-deprive-3_input' value={key} onChange={changeValue} />
        <div className='pg-deprive-3_r-button on-click' onClick={onCopy3}>t(x)</div>
        <div className='pg-deprive-3_r-button on-click' onClick={onCopy4}>{'{t(x)}'}</div>
        <div className='pg-deprive-3_r-button on-click' onClick={onCopy5}>this.props.t(x)</div>
        <div className='pg-deprive-3_button on-click' onClick={onCopy6}>i18next.t(x)</div>
      </div>
    </div>
  )
}

export default memo(Deprive3)
