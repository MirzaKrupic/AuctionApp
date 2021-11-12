import axios from "axios";
const host = "localhost:8080";

export const register = async (person) => {
  return axios
    .post(`http://${host}/api/v1/registration`, person)
    .then((res) => {
      return { response: res.data.response, status: res.status };
    })
    .catch((error) => {
      return error.response;
    });
};

export const login = async (person) => {
  await axios
    .post(`http://${host}/api/v1/login`, person)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
