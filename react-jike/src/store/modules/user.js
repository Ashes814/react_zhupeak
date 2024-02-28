// State related to User
import { createSlice } from "@reduxjs/toolkit";
import { request, setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  // data state
  initialState: {
    token: getToken() ? getToken() : "",
  },

  // syncronous actions
  reducers: {
    setToken(state, action) {
      state.token = action.payload;

      _setToken(action.payload);
    },
  },
});

// 解构actionCreater
const { setToken } = userStore.actions;

const userReducer = userStore.reducer;

// 异步action
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm);

    dispatch(setToken(res.data.token));
  };
};

export { fetchLogin, setToken };

export default userReducer;
