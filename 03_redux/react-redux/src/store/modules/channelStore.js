import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
  name: "channel",
  initialState: {
    channelList: [],
  },
  reducers: {
    setChannelList(state, action) {
      state.channelList = action.payload;
    },
  },
});

const { setChannelList } = channelStore.actions;
const url = "http://geek.itheima.net/v1_0/channels";

const fetchChannelList = () => {
  return async (dispatch) => {
    const res = await axios.get(url);
    dispatch(setChannelList(res.data.data.channels));
  };
};

export { fetchChannelList };
const reducer = channelStore.reducer;
export default reducer;

// // 创建异步
// const { setChannelList } = channelStore.actions;
// const url = "http://geek.itheima.net/v1_0/channels";
// // 封装一个函数 在函数中return一个新函数 在新函数中封装异步
// // 得到数据之后通过dispatch函数 触发修改
// const fetchChannelList = () => {
//   return async (dispatch) => {
//     const res = await axios.get(url);
//     dispatch(setChannelList(res.data.data.channels));
//   };
// };

// export { fetchChannelList };

// const channelReducer = channelStore.reducer;
// export default channelReducer;
