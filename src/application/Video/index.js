import React, {useEffect, useState, useCallback, useRef, useLayoutEffect} from 'react';
import Scroll from '../../baseUI/scroll/index';
import Header from "../../baseUI/header/index";
import { forceCheck } from 'react-lazyload';
import LazyLoad from "react-lazyload";
import { changeEnterLoading, changeWhetherLoading, getMusicVideoDetailData, getMusicVideoPlayData, getMoreHotMusicVideoComment, getMusicVideoInfo, getSimilarMusicVideoData, getMusicVideoCommentData, changeMusicVideoCommentNull } from "./store/actionCreators";
import { Container, Main, InfoWrapper, SimilarWrapper, TabContent, TabItemContainer } from "./style";
import "../../../node_modules/video-react/dist/video-react.css";
import {connect} from "react-redux";
import { EnterLoading } from './../Singers/style';
import Loading from './../../baseUI/loading/index';
import { isEmptyObject } from '../../api/utils';
import {
  Player,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
  ReplayControl, // 后退按钮
  ForwardControl,  // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,  // 倍速播放选项
  VolumeMenuButton
} from 'video-react';
import {CSSTransition} from "react-transition-group";


function VideoComponent(props) {

  const { history, enterLoading, songsCount, whetherLoading, currentMusicVideo, currentMusicVideoPlayData, currentMusicVideoInfo, similarMusicVideo, currentMusicVideoComment } = props;
  const { getMusicVideoDetailDispatch, changeCommentType, getMoreHotComment } = props;

  const [ showStatus, setShowStatus ] = useState(true);
  const [ isNewest, setIsNewest ] = useState(true);
  const id = props.match.params.id;
  const test = useRef();
  const didMountRef = useRef(false);

  const [ tabShow, setTabShow ] = useState(true);


  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const leftPad = (num, n) => {
    let len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  };

  const DateTime = (myDate, separ1, separ2, separ3) => {
    let stryear = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    let strMonth = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    let strDate = myDate.getDate(); // 获取当前日(1-31)
    let strhour = myDate.getHours(); // 获取当前小时数(0-23)
    let strm = myDate.getMinutes(); // 获取当前分钟数(0-59)
    let strs = myDate.getSeconds(); // 获取当前秒数(0-59)
    if (strs < 10) {
      strs = "0" + strs;
    }
    return stryear + separ1 + leftPad(strMonth, 2) + separ1 +
      leftPad(strDate, 2) + separ2 +
      leftPad(strhour, 2) + separ3 + leftPad(strm, 2) +
      separ3 + strs
  };

  const enterSimilarVideoDetail = (id) => {
    history.push(`/recommend/video/${id}`);
    test.current.refresh();
  };

  const changeTab = () => {
    setTabShow(!tabShow);
  };

  const changeNewSelect = () => {
    setIsNewest(!isNewest);
  };

  const loadMoreComment = () => {
    if(!tabShow) {
      if(currentMusicVideoCommentJS.length > 0) {
        if(isNewest) {
          let pageData = currentMusicVideoCommentJS[currentMusicVideoCommentJS.length - 1].time;
          changeCommentType(id, isNewest, pageData);
        }else {
          let pageData = currentMusicVideoCommentJS[currentMusicVideoCommentJS.length - 1].time;
          getMoreHotComment(id, pageData);
        }
      }
    }
  };

  useEffect(() => {
    if(didMountRef.current) {
      changeCommentType(id, isNewest);
    }else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line
  }, [ isNewest ]);

  useEffect(() => {
    getMusicVideoDetailDispatch(id);
  }, [getMusicVideoDetailDispatch, id]);

  let currentMusicVideoJS = currentMusicVideo? currentMusicVideo.toJS() : {};
  let currentMusicVideoPlayDataJs =  currentMusicVideoPlayData? currentMusicVideoPlayData.toJS() : {};
  let musicVideoInfo = currentMusicVideoInfo? currentMusicVideoInfo.toJS() : {};
  let currentMusicVideoCommentJS = currentMusicVideoComment? currentMusicVideoComment.toJS() : {};
  let similarMusicVideoJS =  similarMusicVideo? similarMusicVideo.toJS() : [];

  const renderSimilarMusicVideo = (list) => {
    return (
      <SimilarWrapper>
        <h3 style={{ paddingBottom: "10px" }}>相关MV</h3>
        {
          list.length > 0? (
            list.map(item => {
              return (
                <div className="videoItem" key={item.id} onClick={ () => { enterSimilarVideoDetail(item.id) } }>
                  <div className="cover">
                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('../../components/list/atOnce.png')} alt="music"/>}>
                      <img src={ item.cover } width="100%" height="100%" alt="video_cover"/>
                    </LazyLoad>
                    <div className="play_count">
                      <i className="iconfont play">&#xe634;</i>&nbsp;
                      <span className="count">{ item.playCount/100 }万</span>
                    </div>
                    <div className="time_count">
                      <span className="count">{ item.duration/60000 > 1? (parseInt(item.duration/60000) > 10? parseInt(item.duration/60000) : ('0' + parseInt(item.duration/60000))) : '00' }:{ item.duration > 60000? (item.duration % 60000 === 0? '00' : ((item.duration % 60000)/1000 > 10? ((item.duration % 60000)/1000) : '0' + (item.duration % 60000)/1000)) : (item.duration/1000 > 10? item.duration/1000 : '0' + item.duration/1000) }</span>
                    </div>
                    <div className="play_icon">
                      <i className="iconfont">&#xe731;</i>
                    </div>
                  </div>
                  <div className="videoInfo">
                    <p className="title">{ item.name }</p>
                    <p className="artistName">{ item.artistName }</p>
                  </div>
                </div>
              )
            })
          ) : null
        }
      </SimilarWrapper>
    )
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={500}
      appear={true}
      classNames="push-in"
      onExited={() => {  history.push(`/recommend`); }}
    >
      <Container play={songsCount}>
        <Header single={showStatus} title={"MusicVideo"} handleClick={handleBack}></Header>
        { enterLoading ?  <EnterLoading><Loading></Loading></EnterLoading> :
          <Scroll ref={test} refresh={true} onScroll={forceCheck} pullUpLoading={ whetherLoading } pullUp={ loadMoreComment }>
            <Main>
              <Player
                playsInline
                poster={ currentMusicVideoJS.cover }
                src={ currentMusicVideoPlayDataJs.url }
              >
                <ControlBar autoHide={true} disableDefaultControls={false}>
                  <ReplayControl seconds={10} order={1.1} />
                  <ForwardControl seconds={30} order={1.2} />
                  <PlayToggle />
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
                  <VolumeMenuButton />
                </ControlBar>
              </Player>
              <TabContent>
                <div onClick={ changeTab } className={ tabShow?  'tabItem' : null } >MV相关</div>
                <div onClick={ changeTab } className={ !tabShow?  'tabItem' : null }>MV评论</div>
              </TabContent>
              <TabItemContainer style={{ display: tabShow? 'block' : 'none' }}>
                <InfoWrapper>
                  <p style={{ padding: "10px 0 0 0" }}>
                    { Array.isArray(currentMusicVideoJS.artists)? <img src={ currentMusicVideoJS.artists[0].img1v1Url } alt="avtar"/> : <span /> }&nbsp;&nbsp;&nbsp;
                    { Array.isArray(currentMusicVideoJS.artists)? <span>{ currentMusicVideoJS.artists[0].name }</span> : <span /> }
                  </p>
                  <h3><i className="iconfont play">&#xe634;</i>&nbsp;{ currentMusicVideoJS.name }</h3>
                  <p><span className="playCount">{ currentMusicVideoJS.playCount/100 }万次播放</span> &nbsp;&nbsp;&nbsp;<span className="publishTime">{ currentMusicVideoJS.publishTime }</span></p>
                  <p className="description">简介：{ currentMusicVideoJS.desc }</p>
                  <div className="operation">
                    <div>
                      <div className="icon"><i className="iconfont">&#xe638;</i></div>
                      <div className="count">{ musicVideoInfo.commentCount }</div>
                    </div>
                    <div>
                      <div className="icon"><i className="iconfont">&#xe64e;</i></div>
                      <div className="count">{ musicVideoInfo.likedCount }</div>
                    </div>
                    <div>
                      <div className="icon"><i className="iconfont">&#xe62c;</i></div>
                      <div className="count">{ musicVideoInfo.shareCount }</div>
                    </div>
                  </div>
                </InfoWrapper>
                { renderSimilarMusicVideo(similarMusicVideoJS) }
              </TabItemContainer>
              <TabItemContainer style={{ display: !tabShow? 'block' : 'none' }}>
                <div className="changeNew">
                  <span onClick={ changeNewSelect } className={ isNewest? 'nowSelect' : '' }>推荐</span> | <span onClick={ changeNewSelect } className={ isNewest? '' : 'nowSelect' }>最热</span>
                </div>
                {
                  currentMusicVideoCommentJS.length > 0?
                    currentMusicVideoCommentJS.map( item => {
                      return (
                        <div className="commentItem" key={ item.time }>
                          <div className="moreInfo">
                            <div className="avtar">
                              <img src={ item.user.avatarUrl } width="100%" height="100%" alt="avatar"/>
                            </div>
                            <div style={{ padding: "10px 0" }}>
                              <p>{ item.user.nickname }</p>
                              <p>{ DateTime(new Date(item.time), '-', ' ', ':') }</p>
                            </div>
                            <p>{ item.content }</p>
                            <div className="likedCount">
                              { item.likedCount }<i className="iconfont" style={{ fontSize: '20px' }}>&#xe61e;</i>
                            </div>
                          </div>
                        </div>
                      )
                    }) : <h1>暂无相关评论！</h1>
                 }

              </TabItemContainer>
            </Main>
        </Scroll>}
      </Container>
    </CSSTransition>
  );
}


// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    enterLoading: state.getIn(['musicVideo', 'enterLoading']),
    whetherLoading: state.getIn(['musicVideo', 'whetherLoading']),
    currentMusicVideo: state.getIn(['musicVideo', 'currentMusicVideo']),
    currentMusicVideoPlayData: state.getIn(['musicVideo', 'currentMusicVideoPlayData']),
    currentMusicVideoInfo: state.getIn(['musicVideo', 'currentMusicVideoInfo']),
    similarMusicVideo: state.getIn(['musicVideo', 'similarMusicVideo']),
    currentMusicVideoComment: state.getIn(['musicVideo', 'currentMusicVideoComment']),
    songsCount: state.getIn(['player', 'playList']).size
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getMusicVideoDetailDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getMusicVideoDetailData(id));
      dispatch(getMusicVideoPlayData(id));
      dispatch(getMusicVideoInfo(id));
      dispatch(getSimilarMusicVideoData(id));
      dispatch(changeMusicVideoCommentNull());
      dispatch(getMusicVideoCommentData(id, true));
    },

    changeCommentType(id, data, pageData) {
      dispatch(changeWhetherLoading(true));
      dispatch(getMusicVideoCommentData(id, data, pageData));
    },

    getMoreHotComment(id, pageData) {
      dispatch(changeWhetherLoading(true));
      dispatch(getMoreHotMusicVideoComment(id, pageData));
    },
  }
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(VideoComponent));
