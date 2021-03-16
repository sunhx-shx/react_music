import styled from "styled-components";
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
  background-color: #f2f3f4;
  &.push-in-enter, &.push-in-appear {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  &.push-in-enter-active, &.push-in-appear-active,
  &.push-in-enter-done {
    opacity: 1;
    transition: all 500ms;
    transform: translate3d(0, 0, 0);
  }

  &.push-in-exit {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  &.push-in-exit-active,
  &.push-in-exit-done {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    transition: all 500ms;
  }
`;

export const Main = styled.div`
  width: 100%;
  padding-top: 45px;
`;

export const TabContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  div {
    width: 50%;
    padding: 10px 0 10px 0;
    margin: 0 50px;
    text-align: center;
  }
  .tabItem {
    color: #d44439;
    border-bottom: 2px solid #d44439;
  }
`;

export const TabItemContainer = styled.div`
  width: 100%;
  padding: 15px 10px;
  word-break: break-all;
  .changeNew {
    text-align: right;
    padding: 5px 25px 5px 0;
    font-size: 15px;
    color: #999999;
    .nowSelect {
      color: #d44439;
    }
  }
  .commentItem {
     padding: 10px 0;

     .moreInfo {
       display: inline-block;
       position: relative;
       width: 100%;
       margin-left: 9%;
       padding: 10px 0 15px 5px;
       border-top: 1px solid #e4e4e4;
       border-bottom: 1px solid #e4e4e4;
       .avtar {
         width: 9%;
         position: absolute;
         left: -10%;
         top: 16%;
         img {
           border-radius: 50%;
           margin-bottom: 19px;
         }
       }
       .likedCount {
        position: absolute;
         right: 15%;
         top: 25%;
       }
       div p:nth-child(1) {
        color: #9B9B9C;
        font-size: 14px;
        padding-bottom: 3px;
       }
       div p:nth-child(2) {
        color: #CDCDCD;
        font-size: 12px;
        padding-top: 3px;
       }
       p {
        word-break: break-all;
        width: 88%;
       }
     }
  }
  h1 {
    text-align: center;
    color: #9B9B9C;
    margin-top: 30%;
    font-size: 20px;
  }
 
`;


export const InfoWrapper = styled.div`
  width: 95%;
  padding: 15px 10px;
  word-break: break-all;
  p {
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      border-radius: 50%;
    }
  }
  h3 {
    padding: 10px 0;
    .play{
          vertical-align: baseline;
          font-size: 18px;
          color: ${style["theme-color"]};
    }
  }
  .playCount {
    font-size: 12px;
    color: #2E3030;
  }
  .publishTime {
    font-size: 12px;
    color: #2E3030;
  }
  .description {
    width: 100%;
    padding: 10px 0 10px 0;
    font-size: 13px;
    color: #2E3030;
    word-break: break-all;
  }
  .operation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
    width: 33.3%;
      div {
        width: 100%;
        text-align: center;
        color: #737373;
        i {
          font-size: 35px;
        }
      }
     .count {
        font-size: 15px;
     }
    }
  }
`;

export const SimilarWrapper = styled.div`
  width: 95%;
  padding: 15px 10px;
  .videoItem {
    width: 100%;
    display: flex;
    justify-content: center;
    .cover {
      width: 35%;
      position: relative;
      margin-bottom: 15px;
      .play_count {
        z-index: 1;
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: 11px;
        line-height: 15px;
        color: ${style["font-color-light"]};
        .play{
          vertical-align: baseline;
          font-size: 15px;
        }
      }
     .time_count {
      z-index: 1;
      position: absolute;
      right: 4px;
      bottom: 2px;
      font-size: 11px;
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
        transform: scale(2);
      }
    }
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .videoInfo {
      width: 60%;
      padding: 0 0 15px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .artistName {
        color: #737373;
        font-size: 13px;
      }
    }
  }
`;
