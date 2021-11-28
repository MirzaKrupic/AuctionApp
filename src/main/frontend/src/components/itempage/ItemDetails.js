import classes from "./ItemDetails.module.css";

function ItemDetails(props) {
  return (
    <div>
      <div className={classes.details_buttons_container}>
        <button
          className={`${classes.selected_option_button} ${classes.option_button}`}
        >
          Details
        </button>
        <button className={classes.option_button}>Seller information</button>
        <button className={classes.option_button}>Customer reviews</button>
      </div>
      <div className={classes.product_details}>
        <p>{props.details}</p>
      </div>
    </div>
  );
}

export default ItemDetails;
