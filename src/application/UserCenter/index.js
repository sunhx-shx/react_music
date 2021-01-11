import React, {useState, useRef, useEffect, useCallback} from "react";
import Header from "../../baseUI/header/index"
import { Container, Main } from "./style";
import { CSSTransition } from "react-transition-group";
import {withRouter} from "react-router";



function UserCenter(props) {

  const { history } = props;

  const [ showStatus, setShowStatus ] = useState(true);

  const headerEl = useRef();

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  useEffect(() => {

  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={500}
      appear={true}
      classNames="push-out"
      onExited={() => {  history.goBack() }}
    >
      <Container>
        <Header ref={headerEl} single={showStatus} title={"用户中心"} handleClick={handleBack}></Header>
        <Main>
          123
        </Main>
      </Container>
    </CSSTransition>

  );
}

export default withRouter(React.memo(UserCenter));
