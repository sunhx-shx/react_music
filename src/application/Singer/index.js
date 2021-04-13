import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "./style";
import Header from "../../baseUI/header/index";
import { ImgWrapper, CollectButton, SongListWrapper, BgLayer, TabItemBox, TabContainer, VideoBox, BgPic } from "./style";
import Scroll from "../../baseUI/scroll/index";
import { HEADER_HEIGHT } from "./../../api/config";
import { getSingerInfo, getSingerDetailInfo, getSingerWorks } from "./store/actionCreators";
import { connect } from "react-redux";
import Loading from "./../../baseUI/loading/index";
import { EnterLoading } from "../Singers/style";
import { changeEnterLoading } from "./store/actionCreators";
import { timestampToTime } from "../../api/utils";
import { CSSTransition } from "react-transition-group";
import SongsList from "../SongList/";
import MusicNote from "../../baseUI/music-note/index";

function Singer(props) {
  const initialHeight = useRef(0);
  const [showStatus, setShowStatus] = useState(true);
  const [showName, setShowName] = useState(false);
  const [tabSymbol, setTabSymbol] = useState(1);

  const OFFSET = 5;

  const {
    artist: immutableArtist,
    songs: immutableSongs,
    artistInfo,
    loading,
    songsCount,
    singerAlbums,
    singerMusicVideos
  } = props;

  const { getSingerDataDispatch } = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();
  const artistInfoData = artistInfo.toJS();
  const singerAlbumData = singerAlbums.toJS();
  const singerMusicVideoData = singerMusicVideos.toJS();


  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  const topTab = useRef();
  const musicNoteRef = useRef();

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
    let h = imageWrapper.current.offsetHeight;
    initialHeight.current = h;
    songScrollWrapper.current.style.top = `${h - OFFSET + 35}px`;
    //把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    // eslint-disable-next-line
  }, []);

  const handleScroll = pos => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const tabDOM = topTab.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    const percent = Math.abs(newY / height);
    //说明: 在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM其实是起一个遮罩的作用，给歌单内容提供白色背景
    //因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
    if (newY > 0) {
      //处理往下拉的情况,效果：图片放大，按钮跟着偏移
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      headerDOM.style.backgroundColor = "transparent";
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
      tabDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      //往上滑动，但是还没超过Header部分
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      tabDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.height = "40%";
      imageDOM.style.zIndex = -1;
      headerDOM.style.background = `rgba(255, 255, 255, ${percent * 1.35})`;
      imageDOM.style["opacity"] = `${1 - percent * 1.35}`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 1.35}`;
      setShowName(false);
    } else if (newY < minScrollY) {
      //往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      tabDOM.style.top = `${HEADER_HEIGHT}px`;
      layerDOM.style.zIndex = 1;
      tabDOM.style.zIndex = 100;
      tabDOM.style.backgroundColor = "#fff";
      setShowName(true);
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      headerDOM.style.backgroundColor = "#fff";
      //此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  };

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  const enterDetail = (id) => {
    props.history.push({ pathname: `/album/${id}`, state: { num: 2 } });
  };

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const changeTab = (data) => {
    setTabSymbol(data);
  };

  const enterVideoDetail = (id) => {
    props.history.push(`/video/${id}`);
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header
          handleClick={setShowStatusFalse}
          title={showName? artist.name : ""}
          deepColor={showName}
          ref={header}
        ></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe7eb;</i>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <TabItemBox ref={topTab}>
          <div className="tabInnerBox">
            <div onClick={ () => { changeTab(1) } } className={ tabSymbol === 1? "tabItem" : "" }>主页</div>
            <div onClick={ () => { changeTab(2) } } className={ tabSymbol === 2? "tabItem" : "" }>歌曲</div>
            <div onClick={ () => { changeTab(3) } } className={ tabSymbol === 3? "tabItem" : "" }>专辑</div>
            <div onClick={ () => { changeTab(4) } } className={ tabSymbol === 4? "tabItem" : "" }>视频</div>
          </div>
        </TabItemBox>
        <SongListWrapper ref={songScrollWrapper} play={songsCount}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <div className="scrollContainer">
              <TabContainer show={ tabSymbol === 1 }>
                {
                  artistInfoData.length > 0?
                    artistInfoData .map((item, index) => {
                    return(
                      <div className="singerInfo" key={index}>
                        <h1>{ item.ti }</h1>
                        <p>{ item.txt }</p>
                      </div>
                    )
                  }) : <h1>暂无歌手相关信息！</h1>
                }
              </TabContainer>
              <TabContainer show={ tabSymbol === 2 }>
                <SongsList
                  songs={songs}
                  showCollect={false}
                  usePageSplit={false}
                  musicAnimation={musicAnimation}
                ></SongsList>
              </TabContainer>
              <TabContainer show={ tabSymbol === 3 }>
                {
                  singerAlbumData.length > 0?
                    singerAlbumData.map((item, index) => {
                      return(
                        <div className="albumBox" key={index} onClick={() => enterDetail(item.id)}>
                          <div className="albumPic">
                            <img src={ `${item.picUrl}?param=60x60` } alt="AlbumPic"/>

                          </div>
                          <div className="albumInfo">
                            <div className="name">{ item.name }</div>
                            <div className="detail">{ timestampToTime(item.publishTime) + '\u00A0\u00A0\u00A0\u00A0' + item.size + "首" } &nbsp;&nbsp;&nbsp;&nbsp;<span className="company">{ item.company }</span></div>
                          </div>
                        </div>
                      )
                    }) : <h1>暂无专辑相关信息！</h1>
                }
              </TabContainer>
              <TabContainer show={ tabSymbol === 4 }>
                <div className="boxWrapper">
                  {
                    singerMusicVideoData.length > 0?
                      singerMusicVideoData.map((item, index) => {
                        return(
                          <div className="topBox" onClick={() => enterVideoDetail(item.id)}>
                            <div className="videoBox">
                              <BgPic background={ item.imgurl }>
                              </BgPic>
                              <div className="time_count">
                                <span className="count">{ item.duration/60000 > 1? (parseInt(item.duration/60000) > 10? parseInt(item.duration/60000) : ('0' + parseInt(item.duration/60000))) : '00' }:{ item.duration > 60000? (item.duration % 60000 === 0? '00' : ((item.duration % 60000)/1000 > 10? ((item.duration % 60000)/1000) : '0' + (item.duration % 60000)/1000)) : (item.duration/1000 > 10? item.duration/1000 : '0' + item.duration/1000) }</span>
                              </div>
                              <div className="backLayer">

                              </div>
                              <div className="mainImg">
                                <img src={ item.imgurl16v9 } width="90%" height="35%" alt="imgUrl"/>
                              </div>
                              <img src={ artist.picUrl } width="23px" height="23px" alt="avatar" className="avatar" />
                            </div>
                            <div className="videoInfo">
                              <p>{ item.name }</p>
                              <div className="playData">
                                <i className="iconfont play">&#xe634;</i>&nbsp;
                                <span className="count">{ item.playCount/100 }万</span>
                              </div>
                            </div>
                          </div>
                        )
                      }) : <h1>暂无视频相关信息！</h1>
                  }
                </div>
              </TabContainer>
            </div>
          </Scroll>
        </SongListWrapper>
        {loading ? (
          <EnterLoading style={{ zIndex: 100 }}>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  artist: state.getIn(["singerInfo", "artist"]),
  artistInfo: state.getIn(["singerInfo", "artistInfo"]),
  singerAlbums: state.getIn(["singerInfo", "singerAlbum"]),
  singerMusicVideos: state.getIn(["singerInfo", "singerMusicVideo"]),
  songs: state.getIn(["singerInfo", "songsOfArtist"]),
  loading: state.getIn(["singerInfo", "loading"]),
  songsCount: state.getIn(["player", "playList"]).size
});
// 映射dispatch到props上
const mapDispatchToProps = dispatch => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getSingerInfo(id));
      dispatch(getSingerDetailInfo(id));
      dispatch(getSingerWorks(id));
    }
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singer));
