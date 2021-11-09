const host = "localhost:8080";

export const itemsFetch = async (page, size) => {
  const items = await (
    await fetch(`http://${host}/api/v1/items?page=${page}&size=${size}`)
  ).json();
  return items;
};

export const itemsFetchByDate = async (page, size, order) => {
  const items = await (
    await fetch(`http://${host}/api/v1/items?page=${page}&size=${size}&order=${order}`)
  ).json();
  return items;
};
