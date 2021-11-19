import axios from "axios";
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

export const fetchItemById = async (id) => {
  return axios
    .get(`http://${host}/api/v1/items/info?itemId=${id}`)
    .then((res) => {
      //window.location("/login");
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const itemBid = async (token, item) => {
  return axios
    .post(`http://${host}/api/v1/items/bid`, item, {
      headers: {
        "Authorization":
          `Bearer ${token}`,
       "Content-Type": "application/json"
        },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};
