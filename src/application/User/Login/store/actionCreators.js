import {
  loginByPhoneRequest,
  sentVcodeRequest,
  loginByVcodeRequest,
  getUserAccountInfo,
  refreshLoginStatus
} from "../../../../api/request";
import {
  CHANGE_USER_INFO,
  CHANGE_SENT_STATUS,
  CHANGE_LOGIN_STATUS
} from "./constants";
import { fromJS } from 'immutable';

export const saveUserInfo = data => ({
  type: CHANGE_USER_INFO,
  data: fromJS(data)

});

export const saveSentStatus = data => ({
  type: CHANGE_SENT_STATUS,
  data: fromJS(data)
});

export const saveLoginStatus = data => ({
  type: CHANGE_LOGIN_STATUS,
  data: fromJS(data)
});

export const loginByPhone = (phone, password) => {
  return dispatch => {
    loginByPhoneRequest(phone, password)
      .then(res => {
        if(res.code === 200) {
          dispatch(getAccountInfo());
          dispatch(saveUserInfo(res));
          dispatch(saveLoginStatus(true));
        }
      })
      .catch(() => {
        console.log("登录失败！");
      });
  };
};

export const loginByVcode = (phone, vcode) => {
  return dispatch => {
    loginByVcodeRequest(phone, vcode)
      .then(res => {
        if (res.code === 200) {
          dispatch(saveUserInfo(res));
          dispatch(saveLoginStatus(true));
        }
      })
      .catch(() => {
        console.log("登录失败！");
      });
  };
};

export const sentVcode = phone => {
  return dispatch => {
    sentVcodeRequest(phone)
      .then(res => {
        if (res.code === 200) {
          dispatch(saveSentStatus(true));
        }
      })
      .catch(() => {
        console.log("请求失败！");
      });
  };
};

export const refreshStatus = () => {
  return dispatch => {
    refreshLoginStatus().then( res => {
      console.log(res);
      if(res.code === 200) {
        dispatch(getAccountInfo());
      }
    })
  };
};

export const getAccountInfo = () => {
  return dispatch => {
    getUserAccountInfo().then( res => {
      console.log(res);
    }).catch(() => {
      console.log("获取账户信息失败！");
    });
  };
};
