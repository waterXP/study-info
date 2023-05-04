const initialStates = {
  viewMode: 'recite',
  showTip: true
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
        showTip: !state.showTip
      }
    }
    default:
      return state
  }
}
