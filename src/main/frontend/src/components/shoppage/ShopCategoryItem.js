import classes from "./ShopCategoryItem.module.css";
import { useState } from "react";

function ShopCategoryItem() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderOptions = () => {
    return (
      <div className={classes.subcategoriy_item}>
        <input
          className={classes.category_checkbox}
          type="checkbox"
          name="accesories"
          value="Accesories"
        />
        {" Accesories"}
      </div>
    );
  };

  return (
    <div>
      <div className={classes.category_item_container}>
        <p className={classes.category_item_text}>Women</p>
        <p
          className={`${classes.collapse_optiono} ${classes.category_item_text}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "-" : "+"}
        </p>
      </div>
      {isCollapsed && renderOptions()}
    </div>
  );
}

export default ShopCategoryItem;
