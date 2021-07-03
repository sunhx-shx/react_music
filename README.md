# react hooks+redux+immutable.js仿网易云音乐打造精美webApp

本项目是站在前辈的肩膀上基于自学的react hook知识独立开发了mv模块，扩展了歌手详情模块，提升了自身对react框架的理解，巩固了自己所学的react生态技术知识

[前辈项目地址](http://47.98.159.95:8010)


打开方式:
1. 将项目 clone 下来
```shell
$ git clone https://github.com/sunhx-shx/react_music.git
$ cd react_music
$ npm install

// 下载数据api模块
$ git clon https://github.com/sunhx-shx/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install 

```
接下来，要记得把`src/api/config.js`中把`baseUrl`改成接口的地址。（一定要记得,不然报404!）

2. 运行
```shell
$ npm start
```

现在就在本地的3000端口访问了。如果要打包到线上，执行`npm run build`即可。


项目介绍:


### 功能介绍

#### 1、MV推荐部分

首页推荐:

![Iamge](http://www.sunhx.co/mv_index.png)




#### 2、MV详情部分


![Iamge](http://www.sunhx.co/mv_page.jpg)

这里使用了video-react播放器组件，实现了mv的播放控制和redux中相关播放状态以及数据的交互





#### 3、MV评论部分

![Iamge](http://www.sunhx.co/mv_comment.jpg)

这里做了异步加载的处理，上拉到底进行新数据的获取，下拉则进行数据的重新加载。





#### 4、歌手详情部分

![Iamge](http://www.sunhx.co/singer_album.jpg)



![Iamge]http://www.sunhx.co/singer_mv.jpg)





### 项目部分模块分享

#### 1、mv模块代码

```js
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
  const [ offSet, setOffSet ] = useState(0);
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
    history.push(`/video/${id}`);
    test.current.refresh();
  };

  const changeTab = () => {
    setTabShow(!tabShow);
  };

  const changeNewSelect = () => {
    setIsNewest(!isNewest);
  };

  const loadMoreComment = () => {
    if(currentMusicVideoCommentJS.length < 20) {
      return false;
    }else {
      if(!tabShow) {
        if(currentMusicVideoCommentJS.length > 0) {
          if(isNewest) {
            let pageData = currentMusicVideoCommentJS[currentMusicVideoCommentJS.length - 1].time;
            changeCommentType(id, isNewest, pageData);
          }else {
            setOffSet(offSet +1);
          }
        }
      }
    }
  };

  useEffect(() => {
    if(didMountRef.current) {
      let pageData = currentMusicVideoCommentJS[currentMusicVideoCommentJS.length - 1].time;
      getMoreHotComment(id, offSet, pageData);
    }else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line
  }, [ offSet ]);

  useEffect(() => {
    if(didMountRef.current) {
      if(isNewest) {
        changeCommentType(id, isNewest);
      }else {
        getMoreHotComment(id, offSet);
      }
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
                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./atOnce.png')} alt="music"/>} overflow={true}>
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
                        <div className="commentItem" key={ item.commentId }>
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
                {
                  currentMusicVideoCommentJS.length < 20 && currentMusicVideoCommentJS.length > 0? <h2 style={{ textAlign: 'center', color: '#999999', padding: '10px 0' }}> — 暂无更多评论了！— </h2> : null
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

    getMoreHotComment(id, offSet, pageData) {
      dispatch(changeWhetherLoading(true));
      dispatch(getMoreHotMusicVideoComment(id, offSet, pageData));
    },
  }
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(VideoComponent));
```

