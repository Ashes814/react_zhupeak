// State related to User
import { createSlice } from "@reduxjs/toolkit";
import { request, setToken as _setToken, getToken, removeToken } from "@/utils";
import { loginApi, getProfileApi } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  // data state
  initialState: {
    token: getToken() ? getToken() : "",
    userInfo: {},
  },

  // syncronous actions
  reducers: {
    setToken(state, action) {
      state.token = action.payload;

      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

// 解构actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

// 异步action
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginApi(loginForm);

    dispatch(setToken(res.data.token));
  };
};

// get userInfo
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileApi();
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, setToken, clearUserInfo };

export default userReducer;
