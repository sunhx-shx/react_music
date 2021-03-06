import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Scroll from '../../baseUI/scroll/index';
import style from "../../assets/global-style";
import { connect } from 'react-redux';
import { getAlbumList, getSingerAlbumData, changePullUpLoading, changeEnterLoading, changeCurrentAlbum } from './store/actionCreators';
import { EnterLoading } from './../Singers/style';
import Loading from './../../baseUI/loading/index';
import  Header  from './../../baseUI/header/index';
import AlbumDetail from '../../components/album-detail/index';
import { HEADER_HEIGHT } from './../../api/config';
import MusicNote from '../../baseUI/music-note/index';

function Album(props) {

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false);

  const musicNoteRef = useRef();
  const headerEl = useRef();

  const id = props.match.params.id;
  const num = useLocation().state.num;

  const { currentAlbum, enterLoading, pullUpLoading, songsCount } = props;
  const { getAlbumDataDispatch, changePullUpLoadingStateDispatch, getSingerAlbumDataDispatch, resetCurrentAlbum } = props;

  let currentAlbumJS = currentAlbum.toJS();

  useEffect(() => {
    if(num !== 0) {
      if(num === 1) {
        getAlbumDataDispatch(id);
      }else {
        getSingerAlbumDataDispatch(id);
      }
    }
    return () => {
      resetCurrentAlbum();
    }
  }, [getSingerAlbumDataDispatch, resetCurrentAlbum, num, getAlbumDataDispatch, id]);



  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y/minScrollY);
    let headerDom = headerEl.current;
    if(pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent-1)/2);
      setTitle(currentAlbumJS&&currentAlbumJS.name);
      setIsMarquee(true);
    } else{
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  }, [currentAlbumJS]);

  const handlePullUp = () => {
    changePullUpLoadingStateDispatch(true);
    changePullUpLoadingStateDispatch(false);
  };

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const musicAnimation = (x , y) => {
    musicNoteRef.current.startAnimation({x, y});
  };

  return (
      <CSSTransition
        in={showStatus}
        timeout={300}
        classNames="fly"
        appear={true}
        unmountOnExit
        onExited={props.history.goBack}
      >
        <Container play={songsCount}>
          <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
          { enterLoading ?
            <EnterLoading><Loading></Loading></EnterLoading>
            :
            <Scroll
            onScroll={handleScroll}
            pullUp={handlePullUp}
            pullUpLoading={pullUpLoading}
            bounceTop={false}
          >
              { Object.keys(currentAlbumJS).length > 0? <AlbumDetail currentAlbum={currentAlbumJS} num={num} pullUpLoading={pullUpLoading} musicAnimation={musicAnimation}></AlbumDetail> : null }
          </Scroll>}
          <MusicNote ref={musicNoteRef}></MusicNote>
        </Container>
      </CSSTransition>
  );
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  pullUpLoading: state.getIn(['album', 'pullUpLoading']),
  enterLoading: state.getIn(['album', 'enterLoading']),
  startIndex: state.getIn(['album', 'startIndex']),
  totalCount: state.getIn(['album', 'totalCount']),
  songsCount: state.getIn(['player', 'playList']).size
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
    getSingerAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getSingerAlbumData(id));
    },
    changePullUpLoadingStateDispatch(state) {
      dispatch(changePullUpLoading(state));
    },
    resetCurrentAlbum() {
      dispatch(changeCurrentAlbum({}));
    }
  }
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
