import React from 'react';
import {
  ListWrapper,
  ListItem,
  List,
  VideoList,
  VideoListItem
} from './style';
import LazyLoad from "react-lazyload";
import { withRouter } from 'react-router-dom';



function RecommendList(props) {
  const { recommendList, recommendMusicVideoList } = props;

  const enterDetail = (id) => {
    props.history.push(`/recommend/music/${id}`);
  };

  const enterVideoDetail = (id) => {
    props.history.push(`/recommend/video/${id}`);
  };

  return (
      <ListWrapper>
        <h1 className="title">推荐歌单</h1>
        <List>
          {
            recommendList.map(item => {
              return (
                <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                  <div className="img_wrapper">
                    <div className="decorate"></div>
                    <LazyLoad
                      placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                      <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                    </LazyLoad>
                    <div className="play_count">
                      <i className="iconfont play">&#xe885;</i>
                      <span className="count">{Math.floor(item.playCount / 10000)}万</span>
                    </div>
                  </div>
                  <div className="desc">{item.name}</div>
                </ListItem>
              )
            })
          }
        </List>
        <h1 className="title">推荐MV</h1>
        <VideoList>
          {
            recommendMusicVideoList.map(item => {
              return (
                <VideoListItem key={item.id} onClick={() => enterVideoDetail(item.id)}>
                  <div className="img_wrapper">
                    <div className="decorate"></div>
                    <LazyLoad offset={ -50 } placeholder={<img width="100%" height="100%" src={require('./atOnce.png')} alt="music"/>}>
                      <img src={ item.picUrl + "?param=400x200" } width="100%" height="100%" alt="music"/>
                    </LazyLoad>
                    <div className="play_count">
                      <i className="iconfont play">&#xe634;</i>&nbsp;
                      <span className="count">{ item.playCount/100 }万</span>
                    </div>
                    <div className="time_count">
                      <span className="count">{ item.duration/60000 > 1? (parseInt(item.duration/60000) > 10? parseInt(item.duration/60000) : ('0' + parseInt(item.duration/60000))) : '00' }:{ item.duration > 60000? (item.duration % 60000 === 0? '00' : ((item.duration % 60000)/1000 > 10? ((item.duration % 60000)/1000) : '0' + (item.duration % 60000)/1000)) : (item.duration/1000 > 10? item.duration/1000 : '0' + item.duration/1000) }</span>
                    </div>
                    <div className="play_icon">
                      <i className="iconfont">&#xe608;</i>
                    </div>
                  </div>
                  <div className="desc">{item.name}</div>
                </VideoListItem>
              )
            })
          }
        </VideoList>

      </ListWrapper>
    );
}

export default withRouter(React.memo(RecommendList));
