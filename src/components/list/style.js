import styled from 'styled-components';
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title{
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    color: ${style["font-color"]};
  }
`
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  //&:after {
  //  content: "";
  //  flex: auto;
  //}
`

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .decorate {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
  }
  .img_wrapper{
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      z-index: 1;
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play{
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 50px;
      text-align: left;
      font-size: ${style["font-size-s"]};
      line-height: 1.4;
      color: ${style["font-color-desc"]};
    }
`;

export const VideoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  //&:after {
  //  content: "";
  //  flex: auto;
  //}
`;

export const VideoListItem = styled.div`
  position: relative;
  width: 90%;
  .decorate {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
  }
  .img_wrapper{
    position: relative;
    //width: 100%;
    //height: 100%;
     .play_count {
        z-index: 1;
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: ${style["font-size-s"]};
        line-height: 15px;
        color: ${style["font-color-light"]};
        .play{
          vertical-align: baseline;
          font-size: 14px;
        }
      }
     .time_count {
      z-index: 1;
      position: absolute;
      right: 2px;
      bottom: 2px;
      font-size: ${style["font-size-m"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
    }
    .play_icon {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 50%; 
      height: 50%;
      z-index: 99;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: ${style["font-color-light"]};
        opacity: 0.7;
        transform: scale(5);
      }
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 30px;
      text-align: left;
      font-size: ${style["font-size-s"]};
      line-height: 1.4;
      color: ${style["font-color-desc"]};
    }
`;
