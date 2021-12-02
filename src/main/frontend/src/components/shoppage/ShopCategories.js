import classes from "./ShopCategories.module.css"

function ShopCategories(){
    return(
        <div className = {classes.categories_container}>
            <p className={classes.categories_heading}>PRODUCT CATEGORIES</p>
        </div>
    );
}

export default ShopCategories;