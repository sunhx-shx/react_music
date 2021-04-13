
import { CHANGE_SONGS_OF_ARTIST, CHANGE_ARTIST, CHANGE_ENTER_LOADING, CHANGE_ARTIST_INFO, CHANGE_ARTIST_ALBUM, CHANGE_ARTIST_MUSICVIDOE } from './constants';
import { fromJS } from 'immutable';
import { getSingerInfoRequest, getSingerInfoDetailRequest, getSingerAlbumData, getSingerMusicVideoData } from './../../../api/request';

const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data)
});

const changeArtistInfo = (data) => ({
  type: CHANGE_ARTIST_INFO,
  data: fromJS(data)
});

const changeSongs = (data) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data)
});

const changeAlbums = (data) => ({
  type: CHANGE_ARTIST_ALBUM,
  data: fromJS(data)
});

const changeMusicVideos = (data) => ({
  type: CHANGE_ARTIST_MUSICVIDOE,
  data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const getSingerInfo = (id) => {
  return dispatch => {
    getSingerInfoRequest(id).then(data => {
      dispatch(changeSongs(data.hotSongs));
    });
  }
};

export const getSingerWorks = (id) => {
  return dispatch => {
    getSingerAlbumData(id).then(data => {
      dispatch(changeAlbums(data.hotAlbums));
    });
    getSingerMusicVideoData(id).then(data => {
      dispatch(changeMusicVideos(data.mvs));
    });
  }
};

export const getSingerDetailInfo = (id) => {
  return dispatch => {
    getSingerInfoRequest(id).then(data => {
      dispatch(changeArtist(data.artist));
      // dispatch(changeSongs(data.hotSongs));
      dispatch(changeEnterLoading(false));
    });
    getSingerInfoDetailRequest(id).then(data => {
      dispatch(changeArtistInfo(data.introduction));
    });
  }
};
