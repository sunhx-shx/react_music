import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.play > 0 ? "60px": 0};
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  .singerHeader {
    color: #2E2E2E;
  }
`

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url(${props => props.bgUrl});
  background-size: cover;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* : blur(20px); */
    background: rgba(7, 17, 27, 0.3);
  }
`
export const CollectButton = styled.div`
  position: fixed;
  left: 0; right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index:50;
  background: ${style["theme-color"]};
  color: ${style["font-color-light"]};
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont{
    display: inline-block;
    margin-right: 10px;
    font-size: 20px;
    vertical-align: -2px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`

export const SongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: ${props => props.play ? "60px": 0};
  right: 0;
  >.myScroll{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`

export const TabItemBox = styled.div`
  width: 100%;
  position: absolute;
  z-index: 50;
  border-radius: 10px;
  .tabInnerBox {
    width: 100%;
    display: flex;
    justify-content: space-around;
    >div {
      padding: 10px 15px;
    }
  }
  .tabItem {
    color: #d44439;
    border-bottom: 2px solid #d44439;
  }
`;

export const TabContainer = styled.div`
  width: 100%;
  display: ${ props => props.show?  "block" : "none"};
  overflow: hidden;
  .singerInfo {
    margin: 15px;
    padding: 20px;
    background-color: #F5F5F5;
    border-radius: 10px;
    h1 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    p {
      text-indent: 40px;
    }
  }
  .singerInfo:last-of-type {
    margin-bottom: 10px;
  }
  
  .albumBox {
    width: 90%;
    clear: both;
    overflow: hidden;
    margin: 10px 20px;
    display: flex;
    justify-content: start;
    .albumPic {
      width: 20%;
      img {
        border-radius: 12px;
      }
    }
    .albumInfo {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name {
        
      }
      .detail {
        color: #9B9B9C;
        font-size: 13px;
        span {
          font-size: 12px;
          color: #9B9B9C;
        }
      }
    }
  }
  
  >h1 {
    text-align: center;
    color: #9B9B9C;
    margin-top: 45%;
    font-size: 20px;
  }
  .boxWrapper {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    .topBox {
       width: 45%;
      .videoBox {
        margin: 15px 0 0 0;
        position: relative;
        overflow: hidden;
        border-radius: 10px 10px 0 0;
         .mainImg {
           display: flex;
           justify-content: center;
           padding: 30px 0;
         }
         .avatar {
           margin: 0 0 10px 15px;
           border-radius: 50%;
         }
         .time_count {
           z-index: 1;
           position: absolute;
           right: 5px;
           bottom: 2px;
           font-size: 13px;
           line-height: 15px;
           color: ${style["font-color-light"]};
         }
      }
      .videoInfo {
        font-size: 13px;
        background-color: #F9F9F9;
        padding: 10px 0 15px 0;
        border-radius: 0 0 10px 10px;
        z-index: -1;
        .playData {
          margin-top: 20px;
          color: #9C9C9C;
        }
      }
    }
  }
`;

export const BgPic = styled.div`
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  filter: blur(6px);
  background: url(${props => props.background}) center center no-repeat;
  background: contain;
  background-position: 0 0;
  background-size: 100% 100%;
  border-radius: 15px;
`;

export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`;
