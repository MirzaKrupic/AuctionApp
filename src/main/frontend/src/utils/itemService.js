const host = "localhost:8080";

export const itemsFetch = async (page, size) => {
  const items = await fetch(`http://${host}/api/v1/items?page=${page}&size=${size}`)
  return items.json();
};

export const itemsFetchByDate = async (page, size, order, orderColumn) => {
  const items = await fetch(`http://${host}/api/v1/items?page=${page}&size=${size}&order=${order}&orderColumn=${orderColumn}`)
  return items.json();
};
