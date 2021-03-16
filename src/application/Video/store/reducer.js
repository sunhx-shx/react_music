import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  currentMusicVideo: {},
  currentMusicVideoPlayData: {},
  currentMusicVideoInfo: {},
  currentMusicVideoComment: [],
  similarMusicVideo: {},
  playing: false,
  enterLoading: false,
  whetherLoading: false,
});



export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case actionTypes.CHANGE_WHETHER_LOADING:
      return state.set('whetherLoading', action.data);
    case actionTypes.SET_CURRENT_MUSIC_VIDEO:
      return state.set('currentMusicVideo', action.data);
    case actionTypes.SET_CURRENT_MUSIC_VIDEO_PLAY:
      return state.set('currentMusicVideoPlayData', action.data);
    case actionTypes.SET_CURRENT_MUSIC_VIDEO_INFO:
      return state.set('currentMusicVideoInfo', action.data);
    case actionTypes.SET_CURRENT_SIMILAR_MUSIC_VIDEO:
      return state.set('similarMusicVideo', action.data);
    case actionTypes.SET_CURRENT_MUSIC_VIDEO_COMMENT:
      return state.set('currentMusicVideoComment', action.data);
    default:
      return state;
  }
}
