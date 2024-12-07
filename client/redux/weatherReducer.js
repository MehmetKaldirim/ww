import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../services/weatherService";
import prepareResponse from "../utils/prepareResponse";
import { LOADING } from "../constants";

// Async Thunk: Hava durumu verisini çekme
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
        console.log("fetchWeatherData.pending çağrıldı");
        state.isLoading = LOADING.PENDING;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        //console.log("fetchWeatherData.fulfilled çağrıldı", action.payload);
        state.isLoading = LOADING.FULFILLED;
        const res = prepareResponse(action.payload);
        state.data = res;
        console.log("res = " + res);
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        console.log("fetchWeatherData.rejected çağrıldı", action.payload);
        state.isLoading = LOADING.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectWeatherData = (state) => state.weather;

export default weatherSlice.reducer;
