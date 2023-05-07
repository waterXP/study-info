const initialStates = {
  viewMode: 'recite',
  shortTip: true,
  showDetail: false
}

export default function mainReducer(state = initialStates, action) {
  switch (action.type) {
    case 'changeViewMode': {
      return {
        ...state,
        viewMode: state.viewMode === 'recite' ? 'reading' : 'recite'
      }
    }
    case 'changeShortTip': {
      return {
        ...state,
        shortTip: !state.shortTip
      }
    }
    case 'changeShowDetail': {
      return {
        ...state,
        showDetail: !state.showDetail
      }
    }
    default:
      return state
  }
}
