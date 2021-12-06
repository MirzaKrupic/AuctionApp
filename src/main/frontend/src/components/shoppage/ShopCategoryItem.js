import classes from "./ShopCategoryItem.module.css";
import { useEffect, useState } from "react";

function ShopCategoryItem({ category, onItemChange, selected }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categoryFetched, setCategoryFetched] = useState(false);

  useEffect(async () => {
    if (category) {
      setCategoryFetched(true);
      console.log(category)
    }
  }, [category]);

  const renderOptions = () => {
    {category.subcategories.map((category) => (
      console.log(category)
    ))}
    return (
      <div>
        {category.subcategories.map((category) => (
          <div className={classes.subcategoriy_item}>
            <input
              className={classes.category_checkbox}
              type="checkbox"
              name={category.categoryId}
              value={category.categoryId}
              onChange={onItemChange}
              checked={selected==category.categoryId ? 'checked' : ''}
            />
            {" " + category.name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className={classes.category_item_container}>
        <p className={classes.category_item_text}>
          {category && category.name}
        </p>
        <p
          className={`${classes.collapse_optiono} ${classes.category_item_text}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "-" : "+"}
        </p>
      </div>
      {category && isCollapsed && renderOptions()}
    </div>
  );
}

export default ShopCategoryItem;
