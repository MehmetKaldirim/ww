import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../services/weatherService";
import prepareResponse from "../utils/prepareResponse";
import { LOADING } from "../constants";

export const fetchWeatherData = createAsyncThunk(
  "weatherData",
  async (location, { rejectWithValue }) => {
    try {
      const response = await getWeather(location);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    isLoading: LOADING.INITIAL,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.isLoading = LOADING.PENDING;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.isLoading = LOADING.FULFILLED;
        const res = prepareResponse(action.payload);
        state.data = res;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = LOADING.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectWeatherData = (state) => state.weather;

export default weatherSlice.reducer;