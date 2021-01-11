import React, { useState, useEffect, useCallback } from "react";
import { Header, Container } from "./style";
import { trimPhone } from "../../../../api/utils";
import StepOne from "./step-one";
import StepPassWorld from "./step-password";

const PhoneForm = props => {
  const { onClickBack, sentVcode, sentStatus, loginByPhone, changeLogin } = props;
  const [phone, setPhone] = useState("");
  const [passWord, setPassWord] = useState("");

  //点击按钮通过手机号和密码进行登录
  const triggerLogin = useCallback(
    () => {
      loginByPhone(trimPhone(phone), passWord);
    },
    [phone, passWord]
  );

  const changeLoginType = () => {
    changeLogin();
  };

  //切换手机号码和验证码表单
  const triggerSentVcode = () => {
    sentVcode(trimPhone(phone));
  };

  useEffect(() => {

  });
  const onChangePhone = e => {
    let newValue = e.target.value;
    let oldValue = phone;
    const result =
      newValue.length > oldValue.length
        ? newValue
            .replace(/[^\d]/gi, "")
            .replace(/(\d{3})(\d{0,4})(\d{0,4})/, "$1 $2 $3")
        : phone.trim().slice(0, -1);
    if (result && trimPhone(result).length > 11) {
      return;
    }
    setPhone(result);
  };

  const changeVal = (val) => {
      console.log(val);
      setPassWord(val);
  };

  //密码输入防抖
  const debounceHandler = debounce(changeVal);

  //防抖函数
  function debounce(fn, ms = 500) {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }

  const onChangePassWord = (e) => {
    debounceHandler(e.target.value);
  };



  return (
    <Container>
      <Header>
        <img
          src={require("../../../../assets/back.svg")}
          alt=""
          onClick={onClickBack}
        />
        手机号登录
      </Header>
      {!sentStatus ? (
        <StepOne
          onChangePhone={onChangePhone}
          onClickNext={changeLoginType}
          phone={phone}
        />
      ) : (
        <StepPassWorld
          onChangePassWord={ (e) => onChangePassWord(e)}
          triggerLogin={triggerLogin}
          passWord={passWord}
          reSentVcode={triggerSentVcode}
        />
      )}
    </Container>
  );
};
export default PhoneForm;
