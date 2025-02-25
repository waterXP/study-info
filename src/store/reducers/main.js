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
  showLs: false,
  showQa: true,
  displayType: 'all', // all, kana, mana
  // ----------------- ai
  showNt: false,
  showAn: false,
  typeMode: 'all'
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
    case 'changeDisplayLs': {
      return {
        ...state,
        showLs: !state.showLs
      }
    }
    case 'changeDisplayQa': {
      return {
        ...state,
        showQa: !state.showQa
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
    case 'changeTypeMode': {
      return {
        ...state,
        typeMode:
          state.typeMode === 'all'
            ? 'chk'
            : state.typeMode === 'chk'
              ? 'sin'
              : state.typeMode === 'sin'
                ? 'mul'
                : 'all'
      }
    }
    case 'changeShowNt': {
      return {
        ...state,
        showNt: !state.showNt
      }
    }
    case 'changeShowAn': {
      return {
        ...state,
        showAn: !state.showAn
      }
    }
    default:
      return state
  }
}
