import g001 from './grammar001'
import g006 from './grammar006'
import g011 from './grammar011'
import g013 from './grammar013'
import g015 from './grammar015'
import g017 from './grammar017'
import g019 from './grammar019'
import g021 from './grammar021'
import g023 from './grammar023'
import g025 from './grammar025'
import g027 from './grammar027'
import g028 from './grammar028'
import g029 from './grammar029'
import g030 from './grammar030'
import g032 from './grammar032'
import g034 from './grammar034'
import g035 from './grammar035'
import g036 from './grammar036'
import g037 from './grammar037'
import g038 from './grammar038'
import g039 from './grammar039'
import g040 from './grammar040'
import g041 from './grammar041'
import g100 from './grammar100'
import g200 from './grammar200'

export default [
  g001,
  g006,
  g011,
  g013,
  g015,
  g017,
  g019,
  g021,
  g023,
  g025,
  g027,
  g028,
  g029,
  g030,
  g032,
  g034,
  g035,
  g036,
  g037,
  g038,
  g039,
  g040,
  g041,
  g100,
  g200
].map(({ content, ...next }, i) => ({
  id: i + 1,
  ...next,
  content: content.map((v, i) => ({
    id: i + 1,
    ...v
  }))
}))
