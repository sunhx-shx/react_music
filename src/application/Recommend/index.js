import React, { useEffect, useState, useRef } from 'react';
import Slider from '../../components/slider/';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/list/';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
import { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';
import { EnterLoading } from './../Singers/style';
import Loading from '../../baseUI/loading-v2/index';

function Recommend(props){
  const {  loginStatus, history, bannerList, recommendList, recommendMvList, songsCount, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch, getRecommendMusicVideoListDataDispatch } = props;

  const [status, setStatus] = useState(true);

  const [listStatus, setListStatus] = useState(true);

  const test = useRef();

  useEffect(() => {
    if(!bannerList.size){
      getBannerDataDispatch();
    }
    if(!recommendList.size){
      getRecommendListDataDispatch();
    }
    if(!recommendMvList.size){
      getRecommendMusicVideoListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loginStatus) {
      history.push("/login");
    }
  }, [loginStatus, history]);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() :[];
  const recommendMusicVideoListJS = recommendMvList ? recommendMvList.toJS() :[];

  return (
    <Content play={songsCount}>
      <Scroll className="list" ref={test} onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList recommendList={recommendListJS} recommendMusicVideoList={recommendMusicVideoListJS}/>
        </div>
      </Scroll>
      {enterLoading? <EnterLoading><Loading></Loading></EnterLoading> : null}
      { renderRoutes(props.route.routes) }
    </Content>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  loginStatus: state.getIn(["user", "loginStatus"]),
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  recommendMvList: state.getIn(['recommend', 'recommendMvList']),
  songsCount: state.getIn(['player', 'playList']).size,
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },

    getRecommendMusicVideoListDataDispatch() {
      dispatch(actionTypes.getRecommendMusicVideoList());
    },

  }
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
