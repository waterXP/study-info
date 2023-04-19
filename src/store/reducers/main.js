const initialStates = {
  viewMode: 'recite'
}

export default function mainReducer(state = initialStates, action) {
  switch (action.type) {
    case 'changeViewMode': {
      return {
        ...state,
        viewMode: state.viewMode === 'recite' ? 'reading' : 'recite'
      }
    }
    default:
      return state
  }
}
