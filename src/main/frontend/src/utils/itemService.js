import axios from "axios";
import { handleResponse } from "./requestHandler";
const host = "localhost:8080";

export const fetchItems = async (page, size, order, orderColumn) => {
  let url = `http://${host}/api/v1/items?page=${page}&size=${size}`;
  if(order){
    url = url + `&order=${order}`
  }
  if(size){
    url = url + `&orderColumn=${orderColumn}`
  }
  const items = await fetch(
    url
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
  console.log(item);
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
