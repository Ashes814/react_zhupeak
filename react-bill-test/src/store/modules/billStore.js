import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "billStore",
  initialState: {
    billList: [],
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

const { setBillList, addBill } = billStore.actions;
// Async
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/ka");
    dispatch(setBillList(res.data));
  };
};

const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:3001/ka", data);
    dispatch(addBill(res.data));
  };
};

export { getBillList, addBillList };
const reducer = billStore.reducer;
export default reducer;
