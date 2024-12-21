import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherReducer";
import recordReducer from "./recordReducer";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    record: recordReducer,
  },
});

export default store;
