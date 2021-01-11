import styled from "styled-components";
import style from "../../assets/global-style";

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  background-color: ${ props => props.addColor? style["theme-color"] : "" };
  color: ${  props => props.addColor? "#ffffff" : style["font-color-light"] };
  .back{
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1{
    font-size: ${ props => props.addColor? style["font-size-ll"] : style["font-size-l"]};
    font-weight: 700;
    width: ${  props => props.addColor? "85%" : "" };
    text-align: ${  props => props.addColor? "center" : "" };
  }
`
