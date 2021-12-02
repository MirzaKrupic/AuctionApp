import LayoutContainer from "../components/LayoutContainer";
import ItemPageListItem from "../components/shoppage/ItemPageListItem";
import ShopCategories from "../components/shoppage/ShopCategories";
import classes from "./Shop.module.css";

function Shop() {
  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <ShopCategories />
        <ItemPageListItem />
      </div>
    </LayoutContainer>
  );
}

export default Shop;
