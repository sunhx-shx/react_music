import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  &.push-out-enter, &.push-out-appear {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  &.push-out-enter-active, &.push-out-appear-active,
  &.push-out-enter-done {
    opacity: 1;
    transition: all 500ms;
    transform: translate3d(0, 0, 0);
  }

  &.push-out-exit {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  &.push-out-exit-active,
  &.push-out-exit-done {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    transition: all 500ms;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 45px;
  background-color: #f2f3f4;
`;
