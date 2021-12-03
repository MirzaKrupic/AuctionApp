import axios from "axios";
import { handleResponse } from "./requestHandler";
const host = "localhost:8080";

export const fetchCategories = async () => {
  const items = await fetch(`http://${host}/api/v1/items/shop`);
  return items.json();
};
