import { CHANGE_ENTER_LOADING, CHANGE_WHETHER_LOADING, CHANGE_STILL_LOADING, SET_CURRENT_MUSIC_VIDEO, SET_CURRENT_MUSIC_VIDEO_PLAY, SET_CURRENT_MUSIC_VIDEO_INFO, SET_CURRENT_SIMILAR_MUSIC_VIDEO, SET_CURRENT_MUSIC_VIDEO_COMMENT } from './constants';
import { fromJS } from 'immutable';
import { getMusicVideoDetail, getMusicVideoData, getMusicVideoInfoData, getSimilarMusicVideo, getMusicVideoComment, getHotMusicVideoComment } from '../../../api/request';

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const changeWhetherLoading = (data) => ({
  type: CHANGE_WHETHER_LOADING,
  data
});

export const changeStillLoading = (data) => ({
  type: CHANGE_STILL_LOADING,
  data
});

export const changeCurrentMusicVideo = (data) => ({
  type: SET_CURRENT_MUSIC_VIDEO,
  data: fromJS(data)
});

export const changeCurrentMusicVideoData = (data) => ({
  type: SET_CURRENT_MUSIC_VIDEO_PLAY,
  data: fromJS(data)
});

export const changeCurrentMusicVideoInfo = (data) => ({
  type: SET_CURRENT_MUSIC_VIDEO_INFO,
  data: fromJS(data)
});

export const changeSimilarMusicVideoData = (data) => ({
  type: SET_CURRENT_SIMILAR_MUSIC_VIDEO,
  data: fromJS(data)
});

export const changeMusicVideoCommentData = (data) => ({
  type: SET_CURRENT_MUSIC_VIDEO_COMMENT,
  data: fromJS(data)
});





export const getMusicVideoDetailData = (id) => {
  return (dispatch) => {
    getMusicVideoDetail(id).then(data => {
      dispatch(changeCurrentMusicVideo(data.data));
    })
  }
};

export const getMusicVideoPlayData = (id) => {
  return (dispatch) => {
    getMusicVideoData(id).then(data => {
      dispatch(changeCurrentMusicVideoData(data.data));
    })
  }
};

export const getSimilarMusicVideoData = (id) => {
  return (dispatch) => {
    getSimilarMusicVideo(id).then(data => {
      dispatch(changeSimilarMusicVideoData(data.mvs));
      dispatch(changeEnterLoading(false));
    })
  }
};

export const getMusicVideoCommentData = (id, isNewest, pageData) => {
  return (dispatch, getState ) => {
    getMusicVideoComment(id, pageData).then(data => {
      if(pageData) {
        if(isNewest) {
          if(data.comments.length < 20) {
            dispatch(changeStillLoading(false));
          }else {
            const commentList = getState().getIn(['musicVideo', 'currentMusicVideoComment']).toJS();
            let arr = [ ...commentList.concat([ ...data.comments ]) ];
            dispatch(changeMusicVideoCommentData(arr));
            dispatch(changeWhetherLoading(false));
          }
        }
      }else {
        if(isNewest) {
          dispatch(changeMusicVideoCommentNull());
          const commentList = getState().getIn(['musicVideo', 'currentMusicVideoComment']).toJS();
          let arr = [ ...commentList.concat([ ...data.comments ]) ];
          dispatch(changeMusicVideoCommentData(arr));
          dispatch(changeWhetherLoading(false));
        }
      }

    })
  }
};

export const getMoreHotMusicVideoComment = (id, offSet, pageData) => {
  return (dispatch, getState) => {
    getHotMusicVideoComment(id, offSet, pageData).then(data => {
      if(pageData) {
        if(data.hotComments.length < 20) {
          dispatch(changeStillLoading(false));
        }else {
          const commentList = getState().getIn(['musicVideo', 'currentMusicVideoComment']).toJS();
          let arr = [ ...commentList.concat([ ...data.hotComments ]) ];
          dispatch(changeMusicVideoCommentData(arr));
          dispatch(changeWhetherLoading(false));
        }
      }else {
        dispatch(changeMusicVideoCommentNull());
        const commentList = getState().getIn(['musicVideo', 'currentMusicVideoComment']).toJS();
        let arr = [ ...commentList.concat([ ...data.hotComments ]) ];
        dispatch(changeMusicVideoCommentData(arr));
        dispatch(changeWhetherLoading(false));
      }
    });
  };
};

export const changeMusicVideoCommentNull = () => {
  return (dispatch) => {
    dispatch(changeMusicVideoCommentData([]));
  }
};

export const getMusicVideoInfo = (id) => {
  return (dispatch) => {
    getMusicVideoInfoData(id).then(data => {
      let obj = {};
      obj.commentCount = data.commentCount;
      obj.liked = data.liked;
      obj.likedCount = data.likedCount;
      obj.shareCount = data.shareCount;
      dispatch(changeCurrentMusicVideoInfo(obj));
    })
  }
};

