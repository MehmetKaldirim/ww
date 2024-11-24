import apiClient, { setToken } from "./apiClient";

export const signUp = async ({ email, password, name }) => {
  const params = {
    email,
    password,
    name,
  };

  return await apiClient
    .post("auth/signup/", params)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e))
    .finally(() => console.log("finish"));
};

export const signIn = async ({ email, password, name }) => {
  const params = {
    email,
    password,
    name,
  };

  return await apiClient
    .post("auth/signin/", params)
    .then((res) => {
      const token = res.data.token;
      console.log(token);
      setToken(token);
    })
    .catch((e) => console.log(e))
    .finally(() => console.log("logged in finish"));
};
