import axiosClient from "./axiosClient";

const authApi = {
  login(user) {
    const url = `api/auth/login`;
    return axiosClient.post(url, user);
  },
  register(user) {
    const url = `api/auth/signup`;
    return axiosClient.post(url, user);
  },
};

export default authApi;
