const host = "localhost:8080";

export const fetchCategories = async () => {
  const items = await fetch(`http://${host}/api/v1/categories`);
  return items.json();
};
