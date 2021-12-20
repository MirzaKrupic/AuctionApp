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
