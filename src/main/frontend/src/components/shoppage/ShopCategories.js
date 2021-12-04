import classes from "./ShopCategories.module.css";
import ShopCategoryItem from "./ShopCategoryItem";
import { fetchCategories } from "../../utils/categoryService";
import { useEffect, useState } from "react";

function ShopCategories(props) {
  const [categoriesFetched, setCategoriesFetched] = useState(false);

  useEffect(async () => {
    if (props.categories.length > 0) {
      setCategoriesFetched(true);
    }
  }, [props.categories]);

  const renderCategories = () => {
    console.log(props.categories);
    return (
      <div>
        {props
          .categories.filter(function (category) {
            return category.supercategoryId == null;
          })
          .map((category) => (
            <ShopCategoryItem onItemChange = {props.onCategoryChange} category = {category} />
          ))}
      </div>
    );
  };

  return (
    <div className={classes.categories_container}>
      <p className={classes.categories_heading}>PRODUCT CATEGORIES</p>
      {categoriesFetched && renderCategories()}
    </div>
  );
}

export default ShopCategories;
