import { CHANGE_CURRENT_ALBUM, CHANGE_TOTAL_COUNT, CHANGE_PULLUP_LOADING, CHANGE_START_INDEX, CHANGE_ENTER_LOADING } from './constants';
import { getAlbumDetailRequest, getSingerAlbumDetailRequest } from '../../../api/request';
import { fromJS } from 'immutable';

export const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
});

export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data
});
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

const changeTotalCount = (data) => ({
  type: CHANGE_TOTAL_COUNT,
  data
});

export const changeStartIndex = (data) => ({
  type: CHANGE_START_INDEX,
  data
});

export const getAlbumList = (id) => {
  return dispatch => {
    getAlbumDetailRequest(id).then(res => {
      let data = res.playlist;
      dispatch(changeCurrentAlbum(data));
      dispatch(changeEnterLoading(false));
      dispatch(changeStartIndex(0));
      dispatch(changeTotalCount(data.tracks.length))
    }).catch(() => {
      console.log("获取album数据失败!")
    })
  }
};

export const getSingerAlbumData = (id) => {
  return dispatch => {
    getSingerAlbumDetailRequest(id).then(res => {
      let data = res.album;
      let arr = [...res.songs];
      data.songs = [...arr];
      dispatch(changeCurrentAlbum(data));
      dispatch(changeEnterLoading(false));
      dispatch(changeStartIndex(0));
      dispatch(changeTotalCount(data.songs.length))
    }).catch(() => {
      console.log("获取歌手专辑数据失败！");
    });
  }
};
