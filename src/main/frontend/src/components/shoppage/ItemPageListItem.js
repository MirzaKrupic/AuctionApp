import classes from "./ItemPageListItem.module.css";

function ItemPageListItem() {
  return (
    <div className={classes.item_container}>
      <img className={classes.item_picture} src="/images/lowersectpic.png" />
      <div className={classes.details_section}>
        <p className={classes.item_name}>Shoes Collection</p>
        <p className={classes.item_description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra
          placerat. Aenean auctor luctus tempus. Cras laoreet et magna in
          dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In
          hac habitasse platea dictumst.
        </p>
        <p className={classes.item_price}>Start From $59.00</p>
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
