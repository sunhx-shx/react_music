import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized?limit=30");
};

export const getRecommendMusicVideoListRequest = () => {
  return axiosInstance.get("/personalized/mv");
};

export const getMusicVideoDetail = (id) => {
  return axiosInstance.get(`/mv/detail?mvid=${id}`);
};

export const getMusicVideoData = (id) => {
  return axiosInstance.get(`/mv/url?id=${id}`);
};

export const getMusicVideoInfoData = (id) => {
  return axiosInstance.get(`/mv/detail/info?mvid=${id}`);
};

export const getSimilarMusicVideo = (id) => {
  return axiosInstance.get(`/simi/mv?mvid=${id}`);
};

export const getMusicVideoComment = (id, pageData) => {
  if(pageData) {
    return axiosInstance.get(`/comment/mv?id=${id}&before=${pageData}`);
  }else {
    return axiosInstance.get(`/comment/mv?id=${id}`);
  }
};

export const getHotMusicVideoComment = (id, pageData) => {
    return axiosInstance.get(`/comment/hot?id=${id}&type=1&before=${pageData}`);
};



export const getHotSingerListRequest = count => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
};

export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return axiosInstance.get(`/search?keywords=${query}`);
};

export const getSongDetailRequest = id => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};

export const getLyricRequest = id => {
  return axiosInstance.get(`/lyric?id=${id}`);
};

export const loginByPhoneRequest = (phone, password) => {
  return axiosInstance.get(
    `/login/cellphone?phone=${phone}&password=${password}`
  );
};

export const sentVcodeRequest = phone => {
  return axiosInstance.get(`/captcha/sent?phone=${phone}`);
};

export const loginByVcodeRequest = (phone, vcode) => {
  return axiosInstance.get(`/captcha/verify?phone=${phone}&captcha=${vcode}`);
};

export const getUserAccountInfo = () => {
  return axiosInstance.get(`/login/status`);
};

export const refreshLoginStatus = () => {
  return axiosInstance.get(`/login/refresh`);
};
