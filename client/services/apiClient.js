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
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (e) {
    console.log(e);
  }
};

export const setUserName = async (name) => {
  await AsyncStorage.setItem("username", name);
};

export const getUserName = async () => {
  const name = await AsyncStorage.getItem("username");
  return name;
};

const getToken = async (tokenKey) => {
  return await SecureStore.getItemAsync(tokenKey);
};

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken(TOKEN_KEY);
      console.log(token);
      if (
        token &&
        config.url !== "auth/signin/" &&
        config.url !== "auth/signup/"
      ) {
        // TODO: check headers
        config.headers["Authorization"] = token;
        console.log(config.headers, "config.headers");
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
      try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await AsyncStorage.setItem("isauth", "false");
      } catch (e) {
        console.log(e);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
