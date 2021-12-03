import LayoutContainer from "../components/LayoutContainer";
import ItemPageListItem from "../components/shoppage/ItemPageListItem";
import ShopCategories from "../components/shoppage/ShopCategories";
import classes from "./Shop.module.css";
import {fetchCategories} from '../utils/categoryService';
import { useEffect, useState } from "react";

function Shop() {
  const [item, setItem] = useState([]);

  useEffect(async () => {
    const fetchedCategories = await fetchCategories();
    setItem(fetchedCategories);
  }, []);

  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <ShopCategories categories = {item} />
        <ItemPageListItem />
      </div>
    </LayoutContainer>
  );
}

export default Shop;
