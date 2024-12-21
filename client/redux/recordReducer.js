import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOADING } from "../constants";
import { createRecord } from "../services/recordService";

export const postNewRecord = createAsyncThunk(
  "newRecord",
  async (params, { rejectWithValue }) => {
    try {
      const response = await createRecord(params);
      console.log(response.data.data, "response.data");
      return response.data;
    } catch (e) {
      console.log(e.response);
      return rejectWithValue(
        e.response.data.message || String(e.response.data)
      );
    }
  }
);

const recordSlice = createSlice({
  name: "record",
  initialState: {
    newRecord: {
      isLoading: LOADING.INITIAL,
      data: null,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postNewRecord.pending, (state) => {
        state.newRecord.isLoading = LOADING.PENDING;
      })
      .addCase(postNewRecord.fulfilled, (state, action) => {
        state.newRecord.data = action.payload;
        state.newRecord.isLoading = LOADING.FULFILLED;
      })
      .addCase(postNewRecord.rejected, (state, action) => {
        state.newRecord.error = action.payload;
        state.newRecord.isLoading = LOADING.REJECTED;
      });
  },
});

export const selectNewRecordData = (state) => state.record.newRecord;

export default recordSlice.reducer;
