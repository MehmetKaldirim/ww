import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../services/weatherService";
import prepareResponse from "../utils/prepareResponse";
import { LOADING } from "../constants";

export const fetchWeatherData = createAsyncThunk(
  "weatherData",
  async (location) => {
    try {
      const response = await getWeather(location);
      return response.data;
    } catch (e) {
      return e.response.data.message;
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
        state.isLoading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const res = prepareResponse(action.payload);
        state.data = res;
        state.isLoading = LOADING.FULFILLED;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = LOADING.REJECTED;
      });
  },
});

export const selectWeatherData = (state) => state.weather;

export default weatherSlice.reducer;
