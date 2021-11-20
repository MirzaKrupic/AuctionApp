import axios from "axios";
import { handleResponse } from "./requestHandler";
const host = "localhost:8080";

export const itemsFetch = async (page, size) => {
  const items = await fetch(
    `http://${host}/api/v1/items?page=${page}&size=${size}`
  );
  return items.json();
};

export const itemsFetchByDate = async (page, size, order, orderColumn) => {
  const items = await fetch(
    `http://${host}/api/v1/items?page=${page}&size=${size}&order=${order}&orderColumn=${orderColumn}`
  );
  return items.json();
};

export const fetchItemById = async (id, token) => {
  return axios
    .get(`http://${host}/api/v1/item/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};

export const itemBid = async (token, item) => {
  return axios
    .post(`http://${host}/api/v1/item/bid`, item, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};
