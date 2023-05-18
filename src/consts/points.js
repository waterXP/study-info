export default {
  pdm: {
    title: '前导图法',
    texts: `前导图法 Precedence Diagramming Method, PDM，
紧前关系绘图法
单代号网络图
活动节点图 Active On Node, AON

使用方框或者长方形【节点】代表活动，节点之间用箭头连接，以显示节点之间的逻辑。
// pdm.jpg

4种类型的依赖关系：
1 结束-开始的关系 F-S型, Finish-to-Start；只有比赛结束，颁奖典礼才能开始
2 结束-结束的关系 F-F型, Finish-to-Finish：只有完成文件的编写，才能完成文件的编辑
3 开始-开始的关系 S-S型, Start-to-Start：开始地基浇灌之后，才能开始混凝土的找平
4 开始-结束的关系 S-F型, Start-to-Finish：只有第二位保安人员开始值班，第一位保安人员才能结束值班
// pdm-dependence.jpg


节点：
最早开始时间 Earliest Start time, ES
最迟开始时间 Latest Start time, LS
最早完成时间 Earliest Finish time, EF
最迟完成时间 Latest Finish time, LF
活动历时：DU
｜ 最早开始时间 ｜ 工期    ｜ 最早完成时间 ｜
｜ 活动名称                            ｜
｜ 最迟开始时间 ｜总浮动时间｜最迟完成时间  ｜`
  },
  earn: {
    title: '挣值管理',
    texts: `计划值，PV，Planned Value
挣值，EV，Earned Value
实际成本，AC，Actual Cost
进度偏差，SV，Schedule Variance，SV=EV-PV
成本偏差，CV，Cost Variance，CV=EV-AC
进度绩效指数，SPI，Schedule Performance Index，SPI=EV/PV
成本绩效指数，CPI，Cost Performance Index，CPI=EV/AC


const columns = [
  { title: '缩写', dataIndex: 'key' },
  { title: '名称', dataIndex: 'name' },
  { title: '术语词典定义', dataIndex: 'define' },
  { title: '如何使用', dataIndex: 'how' },
  { title: '公式', dataIndex: 'fn' },
  { title: '对结果的解释', dataIndex: 'explain' }
]

const earn = [
  {
    key: 'pv',
    name: '计划价值',
    define: '为计划工作分配的经批准的预算',
    how: '在某一时点上，通常为数据日期或项目完工日期，计划完成工作的价值',
    fn: '',
    explain: ''
  }, {
    key: 'EV',
    name: '挣值',
    define: '对已完成工作的测量，用该工作的批准预算来表示',
    how: '在某一时点上，通常为数据日期，全部完成工作的计划价值，与实际成本无关',
    fn: '挣值=完成工作的计划价值之和',
    explain: ''
  }, {
    key: 'AC',
    name: '实际成本',
    define: '在给定时间段内，因执行项目活动而实际发生的成本',
    how: '在某一时点上，通常为数据日期，全部完成工作的实际成本',
    fn: '',
    explain: ''
  }, {
    key: 'BAC',
    name: '完工预算',
    define: '为将要执行的工作所建立的全部预算的总和',
    how: '全部计划工作的价值，项目的成本基准',
    fn: '',
    explain: ''
  }, {
    key: 'CV',
    name: '成本偏差',
    define: '在某个给定时间点，预算亏空或盈余量，表示为挣值与计划成本之差',
    how: '在某一时点上，通常为数据日期，完成工作的价值与同一时点上实际成本之间的差异',
    fn: 'CV=EV-AC',
    explain: '正数=在计划成本之内；零=与计划成本持平；负数=超过计划成本'
  }, {
    key: 'SV',
    name: '进度偏差',
    define: '在某个给定时间点，项目进度提前或落后的情况，表示为挣值与计划价值之差',
    how: '在某一时点上，通常为数据日期，完成工作的佳人与同一时点上计划完成的工作之间的差异',
    fn: 'SV=EV-PV',
    explain: '正数=提前于进度计划；零=在进度计划上；负数=落后于进度计划'
  }, {
    key: 'VAC',
    name: '完工偏差',
    define: '对预算亏空量或盈余量的一种预测，是完工预算与完工估算之差',
    how: '项目完工成本的估算差异',
    fn: 'VAC=BAC-EAC',
    explain: '正数=在计划成本之内；零=在进度计划上；负数=落后于进度计划'
  }, {
    key: 'CPI',
    name: '成本绩效指数',
    define: '度量预算资源的成本效率的一种指标，表示为挣值与实际成本之比',
    how: 'CPI等于1.0说明项目完全按预算进行，到目前为止完成的工作的成本与预计使用的成本一样，其他数值则表示已完工作的成本高于或低于预算的百分比',
    fn: 'CPI=EV/AC',
    explain: '>1在计划成本之内；=1与计划成本持平；<1超过计划成本'
  }, {
    key: 'SPI',
    name: '进度绩效指数',
    define: '测量进度效率的一种指标，表示为挣值与计划价值之比',
    how: 'SPI等于1.0说明项目完全按照进度计划执行，到目前为止，已完成工作与计划完成的工作完全一致。其他数值则表示已完工作落后或提前于计划工作的百分比',
    fn: 'SPI=EV/PV',
    explain: '>1提前于进度计划；=1在计划进度上；<1落后于进度计划'
  }, {
    key: 'EAC',
    name: '完工预算',
    define: '完成所有工作所需的预期总成本，等于截至目前的实际成本加上完工尚需估算',
    how: '如果预计剩余工作的CPI与当前的一致',
    fn: 'EAC=BAC/CPI',
    explain: ''
  }, {
    key: 'EAC',
    name: '完工预算',
    define: '完成所有工作所需的预期总成本，等于截至目前的实际成本加上完工尚需估算',
    how: '如果剩余工作将以计划效率完成',
    fn: 'EAC=AC+BAC-EV',
    explain: ''
  }, {
    key: 'EAC',
    name: '完工预算',
    define: '完成所有工作所需的预期总成本，等于截至目前的实际成本加上完工尚需估算',
    how: '如果原计划不再有效',
    fn: 'EAC=AC+自上而下估算的ETC',
    explain: ''
  }, {
    key: 'EAC',
    name: '完工预算',
    define: '完成所有工作所需的预期总成本，等于截至目前的实际成本加上完工尚需估算',
    how: '如果CPI和SPI同时影响剩余工作',
    fn: 'EAC=AC+[(BAC-EV)/(CPI*SPI)]',
    explain: ''
  }, {
    key: 'ETC',
    name: '完工尚需估算',
    define: '完成所有剩余项目工作的预计成本',
    how: '假设工作正按计划执行，则使用这个公式计算完成剩余工作所需成本',
    fn: 'ETC=ESC-AC',
    explain: ''
  }, {
    key: 'ETC',
    name: '完工尚需估算',
    define: '完成所有剩余项目工作的预计成本',
    how: '对剩余工作进行自下而上重新估算',
    fn: 'ETC=再估值',
    explain: ''
  },  {
    key: 'TCPI',
    name: '完工尚需绩效指数',
    define: '为了实现特定的管理目标，剩余资源的使用必须达到的成本绩效指标，是完成剩余工作所需的成本与剩余预算之比',
    how: '为了按计划完成，必须维持的效率',
    fn: 'TCPI=(BAC-EV)/(BAC-AC)',
    explain: '>1很难完成；=1正好完成；<1很容易完成'
  },  {
    key: 'TCPI',
    name: '完工尚需绩效指数',
    define: '为了实现特定的管理目标，剩余资源的使用必须达到的成本绩效指标，是完成剩余工作所需的成本与剩余预算之比',
    how: '为了实现当前的完工估算(EAC)，必须维持的效率',
    fn: 'TCPI=(BAC-EV)/(EAC-AC)',
    explain: '>1很难完成；=1正好完成；<1很容易完成'
  }
]

// --------------------------------------
完工估算，EAC，Estimate at Completion
完工预算，BAC，Budget at Completion
完工尚需估算，ETC，Estimate to Completion，EAC=AC+ETC
基于非典型的偏差计算ETC，ETC=BAC-EV，此时EAC=BAC-CV
基于典型的偏差计算ETC，ETC=(BAC-EV)/CPI，此时EAC=BAC/CPI
完工偏差，VAC，Variance at Completion，VAC=BAC-EAC
完工尚需绩效指数，TCPI，To-Complete Performance Index，TCPI=(BAC-EV)/(BAC-AC)

BAC=Total PV of Projects
EAC=AC+ETC
ETC=(BAC-EV)/CPI 或 BAC-EV
VAC=BAC-EAC
TCPI=(BAC-EV)/(BAC-AC)`
  }
}
