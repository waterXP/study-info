import { getStorage, setStorage } from '@/utils/tool'

const initialStates = {
  viewMode: 'recite',
  shortTip: true,
  showDetail: false,
  favorites: getStorage('FAVORITE') || {},
  pptExplain: false,
  pptExample: true,
  showCn: true,
  showEx: false,
  displayType: 'all' // all, kana, mana
}

export default function mainReducer(state = initialStates, action) {
  switch (action.type) {
    case 'changeDisplayCn': {
      return {
        ...state,
        showCn: !state.showCn
      }
    }
    case 'changeDisplayEx': {
      return {
        ...state,
        showEx: !state.showEx
      }
    }
    case 'changeDisplayType': {
      return {
        ...state,
        displayType:
          state.displayType === 'all'
            ? 'kana'
            : state.displayType === 'kana'
              ? 'mana'
              : 'all'
      }
    }
    case 'changeViewMode': {
      return {
        ...state,
        viewMode: state.viewMode === 'recite' ? 'reading' : 'recite'
      }
    }
    case 'changePptExplain': {
      return {
        ...state,
        pptExplain: !state.pptExplain
      }
    }
    case 'changePptExample': {
      return {
        ...state,
        pptExample: !state.pptExample
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
    case 'updateStorage': {
      if (action.id) {
        const nextFavorites = { ...state.favorites }
        if (nextFavorites[action.id]) {
          delete nextFavorites[action.id]
        } else {
          nextFavorites[action.id] = true
        }
        setStorage('FAVORITE', nextFavorites)
        return { ...state, favorites: nextFavorites }
      }
    }
    default:
      return state
  }
}
