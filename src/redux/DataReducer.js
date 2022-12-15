import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "fetchData",
  async ({ startDate, endDate }) => {
    console.log(startDate, endDate);
    let response = await axios.get(
      // `http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03`
      `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
    );
    // console.log(response.data.data);
    return response.data.data;
  }
);
// export const dataSort = createAsyncThunk(
//   "dataSort",
//   async (appData, appName) => {
//     return appData.map((e) => ({
//       ...e,
//       app_data: appName.filter((item) => {
//         if (e.app_id == item.app_id) {
//           return item.app_name;
//         }
//       }),
//     }));
//   }
// );

const DataSlice = createSlice({
  name: "data",
  initialState: {
    dataList: null,
    fData: null,
  },
  reducers: {},
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.dataList = data;
      }
    },
  },
});

export default DataSlice.reducer;
