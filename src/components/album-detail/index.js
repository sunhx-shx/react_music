import React from 'react';
import { TopDesc, Menu } from './style';
import { timestampToTime } from '../../api/utils';
import SongsList from '../../application/SongList/';

function AlbumDetail(props) {
  const { currentAlbum, pullUpLoading, num } = props;

  const renderTopDesc = () => {
    return (
      <TopDesc background={ num === 1 ? currentAlbum.coverImgUrl : currentAlbum.picUrl }>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={ num === 1 ? currentAlbum.coverImgUrl : currentAlbum.picUrl } alt=""/>
          <div className="play_count" style={{ display: num === 1 ? "block" : "none" }}>
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{Math.floor(currentAlbum.playCount/1000)/10}万</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={ num === 1? currentAlbum.creator.avatarUrl : currentAlbum.artist.picUrl } alt=""/>
            </div>
            <div className="name">{ num === 1? currentAlbum.creator.nickname : currentAlbum.artist.name }</div><br />
          </div>
          <div className="publishTime" style={{ display: num === 2 ? "block" : "none" }}>{ `发行时间：${timestampToTime(currentAlbum.publishTime)}` }</div>
        </div>
      </TopDesc>
    )
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe638;</i>
          { num === 1? currentAlbum.commentCount : currentAlbum.info.commentCount }评论
        </div>
        <div>
          <i className="iconfont">&#xe61e;</i>
          {  num === 1? currentAlbum.shareCount : currentAlbum.info.shareCount }点赞
        </div>
        <div>
          <i className="iconfont">&#xe6c9;</i>
          { num === 1? currentAlbum.trackCount : currentAlbum.info.mark }收藏
        </div>
        <div>
          <i className="iconfont">&#xe81a;</i>
          更多
        </div>
      </Menu>
    )
  };
  const renderSongList = () => {
    return (
      <SongsList
        songs={ num === 1? currentAlbum.tracks : currentAlbum.songs}
        collectCount={currentAlbum.trackCount}
        showCollect={true}
        loading={pullUpLoading}
        musicAnimation={props.musicAnimation}
        showBackground={true}
      ></SongsList>
    )
  };

  return (
    <div>
      { renderTopDesc() }
      { renderMenu() }
      { renderSongList() }
    </div>
  )
}
export default React.memo(AlbumDetail);
