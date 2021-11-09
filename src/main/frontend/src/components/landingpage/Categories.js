import classes from "./Categories.module.css";

function Categories(props) {
  return (
    <section className={classes.categories_list}>
      <div className={`${classes.category_item} ${classes.category_item_heading}`}>
        <p className={classes.categoriesheading}>CATEGORIES</p>
      </div>
      {props.categories.map((category) => (
        <div className={classes.category_item}>
          <p>{category.name}</p>
        </div>
      ))}

      <div className={classes.category_item}>
        <p>All Categories</p>
      </div>
    </section>
  );
}

export default Categories;
