import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from "./style";
import {connect} from "react-redux";



function Login() {
  return(
    <Container>
      <input type="text" placeholder="请输入手机号或邮箱"/><br />
      <input type="text" placeholder="请输入密码"/>
    </Container>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({

});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login));
