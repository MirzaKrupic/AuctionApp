import classes from "./ShopCategoryItem.module.css";
import { useEffect, useState } from "react";
import { AirlineSeatFlat } from "@material-ui/icons";

function ShopCategoryItem({
  category,
  onItemChange,
  selected,
  selectedSuperCategory,
  onSuperCategoryChange,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categoryFetched, setCategoryFetched] = useState(false);

  useEffect(async () => {
    if (category) {
      setCategoryFetched(true);
      if (selectedSuperCategory === category.categoryId) {
        setIsCollapsed(true);
      }
    }
  }, [category]);

  const renderOptions = () => {
    return (
      <div>
        {category.subcategories.map((category) => (
          <div className={classes.subcategoriy_item}>
            <input
              disabled
              className={classes.category_checkbox}
              type="checkbox"
              name={category.categoryId}
              value={category.categoryId}
              onChange={onItemChange}
              checked={selected == category.categoryId ? "checked" : ""}
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
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            onSuperCategoryChange("jes");
          }}
        >
          {isCollapsed ? "-" : "+"}
        </p>
      </div>
      {category && isCollapsed && renderOptions()}
    </div>
  );
}

export default ShopCategoryItem;
