import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  artist: {},
  artistInfo: [],
  singerAlbum: [],
  singerMusicVideo: [],
  songsOfArtist: [],
  loading: true
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_ARTIST:
      return state.set('artist', action.data);
    case actionTypes.CHANGE_ARTIST_ALBUM:
      return state.set('singerAlbum', action.data);
    case actionTypes.CHANGE_ARTIST_MUSICVIDOE:
      return state.set('singerMusicVideo', action.data);
    case actionTypes.CHANGE_ARTIST_INFO:
      return state.set('artistInfo', action.data);
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      return state.set('songsOfArtist', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('loading', action.data);
    default:
      return state;
  }
}
