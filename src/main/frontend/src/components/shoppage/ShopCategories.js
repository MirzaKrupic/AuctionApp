import classes from "./ShopCategories.module.css"
import ShopCategoryItem from "./ShopCategoryItem";

function ShopCategories(){
    return(
        <div className = {classes.categories_container}>
            <p className={classes.categories_heading}>PRODUCT CATEGORIES</p>
            <ShopCategoryItem />
            <ShopCategoryItem />
            <ShopCategoryItem />
            <ShopCategoryItem />
            <ShopCategoryItem />
            <ShopCategoryItem />
        </div>
    );
}

export default ShopCategories;