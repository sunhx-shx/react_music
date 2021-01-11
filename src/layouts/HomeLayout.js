import React, { useState } from "react";
import { renderRoutes } from "react-router-config";
import { withRouter } from 'react-router-dom';
import { Top, Tab, TabItem, Container } from "./HomeLayout.style";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Player from "../application/Player/index";

function Home(props) {
  const { route, history } = props;

  const [state, setState] = useState(true);

  const backLogin = (props) => {
    history.push('/login');
  };


  return (
    <CSSTransition
      in={state}
      timeout={1500}
      appear={true}
      classNames="fade"
      onExited={backLogin}
    >
      <Container>
        <div>
          <Top>
        <span
          className="iconfont menu"
          onClick={ () => props.history.push("/userCenter") }
        >
          &#xe65c;
        </span>
            <span className="title">云音悦</span>
            <span
              className="iconfont search"
              onClick={() => props.history.push("/search")}
            >
          &#xe62b;
        </span>
          </Top>
          <Tab>
            <NavLink to="/recommend" activeClassName="selected">
              <TabItem>
                <span>推荐</span>
              </TabItem>
            </NavLink>
            <NavLink to="/singers" activeClassName="selected">
              <TabItem>
                <span>歌手</span>
              </TabItem>
            </NavLink>
            <NavLink to="/rank" activeClassName="selected">
              <TabItem>
                <span>排行榜</span>
              </TabItem>
            </NavLink>
          </Tab>
          {renderRoutes(route.routes)}
          <Player></Player>
        </div>
      </Container>

    </CSSTransition>

  );
}

//React.memo用于控制组件在接收到的props变化之后按需重新渲染，提升App运行性能，功能类似于pureComponent，PureComponent要依靠 class 才能使用。而 React.memo() 可以和 functional component 一起使用。

export default withRouter(React.memo(Home));
