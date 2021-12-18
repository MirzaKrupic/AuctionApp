import classes from "./ItemPageListItem.module.css";

function ItemPageListItem({name, price, photo, details}) {
  return (
    <div className={classes.item_container}>
      <img className={classes.item_picture} src={photo.split(";")[0]} />
      <div className={classes.details_section}>
        <p className={classes.item_name}>{name}</p>
        <p className={classes.item_description}>
          {details.length > 100 ? details.substring(0, 100) + "..." : details}
        </p>
        <p className={classes.item_price}>Start From ${price}</p>
        <div className={classes.button_group}>
          <div class={classes.item_button}>
            {"Watchlist "}
            <span class={classes.eye_icon}></span>
          </div>
          <div class={classes.item_button}>
            {"Bid "}
            <span class={classes.bid_icon}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPageListItem;
