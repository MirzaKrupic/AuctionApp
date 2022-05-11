import axios from "axios";
import { HOST } from "./constants";

let api = "";
if (process.env.REACT_APP_URL) {
  api = process.env.REACT_APP_URL;
} else {
  api = HOST;
}

export const register = async (person) => {
  return axios
    .post(`${api}/api/v1/registration`, person)
    .then((res) => {
      return { response: res.data.response, status: res.status };
    })
    .catch((error) => {
      return error.response;
    });
};

export const login = async (person) => {
    return axios
    .post(`${api}/api/v1/login`, person)
    .then((res) => {
      return { token: res.data.token, status: res.status };
    })
    .catch((error) => {
      return error.response;
    });
};

export const getUserByToken = async (token) => {
  return axios
    .get(`${api}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateUser = async (token, user) => {
  return axios
    .post(`${api}/api/v1/user`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};