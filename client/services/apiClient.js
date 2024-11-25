import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "TOKEN_KEY";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Cache-Control": "no-cache",
  },
});

export const setToken = async (token) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

const getToken = async (tokenKey) => {
  await SecureStore.getItemAsync(tokenKey);
};

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken(TOKEN_KEY);
      if (
        token &&
        config.url !== "auth/signin/" &&
        config.url !== "auth/signup/"
      ) {
        // TODO: check headers
        config.headers["x-authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (e) {
      console.log(e, "encrypted");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // clear token and set isAuth to false
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await AsyncStorage.setItem("isauth", false);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
