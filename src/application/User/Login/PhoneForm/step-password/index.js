import React, { useRef, useEffect } from "react";

const StepPassWorld = props => {
  const { onChangePassWord, triggerLogin, passWord } = props;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <p className="input">
        密码：
        <input
          type="password"
          onChange={onChangePassWord}
          ref={inputRef}
        />
      </p>
      <hr />
      <span
        className={`LoginBtn
          ${ passWord.trim().length < 21 && passWord.trim().length > 5? "" : "disabled" }`}
        onClick={triggerLogin}
      >
        登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
      </span>
    </>
  );
};

export default StepPassWorld;
