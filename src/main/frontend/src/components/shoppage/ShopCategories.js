import classes from "./ShopCategories.module.css";
import ShopCategoryItem from "./ShopCategoryItem";

function ShopCategories({
  categories,
  onCategoryChange,
  selected,
  selectedSuperCategory,
  onSuperCategoryChange,
}) {

  return (
    <div className={classes.categories_container}>
      <p className={classes.categories_heading}>PRODUCT CATEGORIES</p>
      {categories.length > 0 && (
        <div>
          {categories
            .filter(function (category) {
              return category.supercategoryId == null;
            })
            .map((category) => (
              <ShopCategoryItem
                onSuperCategoryChange={onSuperCategoryChange}
                selectedSuperCategory={selectedSuperCategory}
                selected={selected}
                onItemChange={onCategoryChange}
                category={category}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default ShopCategories;
