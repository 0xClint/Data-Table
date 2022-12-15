import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAppName = createAsyncThunk("fetchApp", async () => {
  const response = await axios.get(
    `http://go-dev.greedygame.com/v3/dummy/apps`
  );
  console.log(response.data.data);
  return response.data.data;
});

const AppSlice = createSlice({
  name: "app",
  initialState: {
    appNames: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAppName.fulfilled]: (state, action) => {
      //   console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.appNames = data;
      }
    },
  },
});

export default AppSlice.reducer;
