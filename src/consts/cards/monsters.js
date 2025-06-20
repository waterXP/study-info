// 整理下主要规则：
// 准备阶段：
// 按强弱给怪兽卡分三类【牌背作好区分就行】，分别洗匀，分成三堆
// 洗混可购买牌堆
// 每个玩家获取初始卡牌（2张进攻，2张防御，1张光线（需要充量或消耗生命值使用）
// 每个玩家一个角色牌【奥】生命值：10；能量：4

// 开始若干轮，直到场上怪兽全部被消失，当轮到一个玩家需要抽怪兽卡但没有怪兽卡可抽时，执行休息指令，或打出援助卡帮助其他玩家消灭怪兽

// 每一轮开始时，
// 弃掉场上可购买的卡牌，重要抽取新的可购买卡牌供玩家购买（玩家人数+2），如果可购牌堆耗尽，洗混弃牌堆继续抽取，如果弃牌堆为空，则展示所有可购卡牌
// 计算最低得分者和最高得分者，同分时则没有最低得分者或最高得分者，分别获得最低或最高得分指示物,【最高得分指示物玩家3人以上时有】

// 一轮中，玩家按次序进行游戏：
// 1 面前没有怪兽卡，可以选择休息（跳过回合，生命值恢复满）或者抽取新怪兽卡（可以休息跳过，部分卡牌需要在抽取怪兽前打出）
// 2 怪兽对战（最初可以打出两张卡来计算攻防，部分卡片允许打出更多的卡牌）
// 3 计算结果：
// a 怪兽生命值归0，获取对应积分和点数
// b 奥生命值归0，失去对应积分
// c 怪和奥生命值均归0，积分不变，获得点数
// d 都不归0，积分，点数都不变，怪兽卡仍保留在玩家面前
// 4 使用点数购买卡牌，
// a 此阶段开始时，拥有最高积分的玩家额外消耗1点积分（0时不消耗），拥有最低积分的玩家额外增加1点积分，
// b 使用点数给卡牌充能（部分卡牌使用需要消耗能量或生命值，两者都不够时无法使用）或购买新卡牌
// 5 结束回合

// 游戏结束：怪兽全部被消灭时游戏结束，按得分高低决定玩家排名

// 你看下上面这个规则是否可行，有没有地方要修改

// 卡牌类型：
// 嗯，暂订奥的卡牌就一种，生命为10，基础奖励10（结果时该卡牌价值10点，越强的卡牌基础奖励越低）

// 奥特曼卡牌
const user = {
  name: '奥特曼',
  maxHealth: 10,
  maxPoint: 6,
  combatLimit: 3,
  beamLimit: 3,
  shieldLimit: 2
}

// 怪兽卡牌
const a1 = {
  name: '巴尔坦星人',
  count: 3,
  damage: 2,
  health: 2,
  score: 2,
  point: 2
}
const a2 = {
  name: '皮古蒙',
  count: 3,
  damge: 3,
  health: 2,
  score: 2,
  point: 3
}
const a3 = {
  name: '卡美拉',
  count: 3,
  damage: 2,
  health: 3,
  score: 3,
  point: 2
}
const a4 = {
  name: '伽鲁加',
  count: 3,
  damge: 3,
  health: 3,
  score: 3,
  point: 3
}
const a5 = {
  name: '小金刚',
  count: 3,
  damage: 3,
  health: 1,
  score: 2,
  point: 2
}
const b1 = {
  name: '百慕拉',
  count: 2,
  damage: 6,
  health: 2,
  score: 4,
  point: 4
}
const b4 = {
  name: '西格拉斯',
  count: 2,
  damage: 4,
  health: 4,
  score: 4,
  point: 4
}
const b2 = {
  name: '泰莱斯通',
  count: 2,
  damage: 5,
  health: 5,
  score: 5,
  point: 5
}
const b3 = {
  name: '艾勃隆',
  count: 2,
  damage: 4,
  health: 5,
  score: 5,
  point: 4
}
const b5 = {
  name: '古代怪兽哥尔赞',
  count: 2,
  damage: 2,
  health: 8,
  score: 6,
  point: 4
}
const c3 = {
  name: '贝蒙斯坦',
  count: 1,
  damage: 7,
  health: 6,
  score: 7,
  point: 6
}
const c2 = {
  name: '哥莫拉',
  count: 1,
  damage: 7,
  health: 7,
  score: 7,
  point: 7
}
const c1 = {
  name: '杰顿',
  count: 1,
  damage: 8,
  health: 7,
  socre: 8,
  point: 7
}
const c4 = {
  name: '艾雷王',
  count: 1,
  damage: 6,
  health: 10,
  score: 8,
  point: 8
}
const c5 = {
  name: '哥尔赞',
  count: 1,
  damage: 6,
  health: 8,
  score: 7,
  point: 7
}

// 基础卡牌
const base1 = {
  name: '奥特拳',
  count: 2,
  power: 1,
  type: 'combat'
}
const base2 = {
  name: '奥特防御',
  count: 2,
  shield: 1,
  type: 'shield'
}
const base3 = {
  name: '奥特攻击光线',
  count: 1,
  power: 2,
  cost: 2,
  type: 'beam'
}

const fight1 = {
  name: '奥特断雾斩',
  count: 2,
  power: 2,
  cost: 1,
  point: 2,
  type: 'combat'
}
const fight2 = {
  name: '奥特背负投',
  count: 1,
  power: 3,
  cost: 1,
  point: 4,
  type: 'combat'
}
const fight3 = {
  name: '八分光轮',
  count: 2,
  power: 3,
  cost: 2,
  point: 3,
  type: 'beam'
}
const fight4 = {
  name: '斯派修姆光线',
  count: 1,
  power: 4,
  cost: 3,
  point: 3,
  type: 'beam'
}
const fight5 = {
  name: '奥特V字屏障',
  count: 2,
  shield: 1,
  action: 1,
  cost: 1,
  point: 3,
  type: 'shield'
}
const fight6 = {
  name: '捕捉光环',
  count: 1,
  shield: 3,
  cost: 1,
  point: 2,
  type: 'shield'
}
const fight7 = {
  name: '分身术',
  count: 2,
  action: 2,
  point: 5,
  cost: 2,
  type: 'combat'
}



const equip1 = {
  name: '能量',
  count: 1,
  maxPoint: 1,
  point: 3,
  type: 'equip'
}
const equip2 = {
  name: '能量+',
  count: 1,
  maxPoint: 2,
  point: 5,
  type: 'equip'
}
const equip3 = {
  name: '生命',
  count: 1,
  maxHelath: 1,
  point: 3,
  type: 'equip'
}
const equip4 = {
  name: '生命+',
  count: 1,
  maxHelath: 2,
  point: 5,
  type: 'equip'
}
const equip5 = {
  name: '积分',
  score: 2,
  point: 3,
  type: 'equip'
}
const equip6 = {
  name: '积分+',
  score: 3,
  point: 5,
  type: 'equip'
}


const special1 = {
  name: '奥特充能',
  count: 3,
  health: 3,
  point: 2,
  type: 'use'
}
const special2 = {
  name: '怪兽出现',
  count: 2,
  monster: 1,
  point: 3,
  type: 'use'
}
const special3 = {
  name: '撤退',
  count: 3,
  retreat: 1,
  point: 1,
  type: 'use'
}
const special4 = {
  name: '增援',
  count: 3,
  help: 1,
  point: 2,
  type: 'use'
}
const search = {
  name: '索敌',
  count: 3,
  search: 3,
  point: 2,
  type: 'use'
}

export default [a1, a2, a3]
