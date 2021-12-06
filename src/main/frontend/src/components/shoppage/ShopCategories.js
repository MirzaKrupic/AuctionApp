import classes from "./ShopCategories.module.css";
import ShopCategoryItem from "./ShopCategoryItem";
import { fetchCategories } from "../../utils/categoryService";
import { useEffect, useState } from "react";

function ShopCategories({categories, onCategoryChange, selected}) {
  const [categoriesFetched, setCategoriesFetched] = useState(false);

  useEffect(async () => {
    if (categories.length > 0) {
      setCategoriesFetched(true);
    }
  }, [categories]);

  const renderCategories = () => {
    return (
      <div>
        {categories.filter(function (category) {
            return category.supercategoryId == null;
          })
          .map((category) => (
            <ShopCategoryItem selected={selected} onItemChange = {onCategoryChange} category = {category} />
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
