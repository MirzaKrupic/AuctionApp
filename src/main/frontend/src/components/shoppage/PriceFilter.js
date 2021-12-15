import { Slider } from "@material-ui/core";
import classes from "./PriceFilter.module.css";
import ShopCategoryItem from "./ShopCategoryItem";
import * as React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

function PriceFilter({ onPriceChange, price, onPriceInputChange }) {
  const muiTheme = createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: "#8367d8",
        },
        track: {
          color: "#8367d8",
        },
        rail: {
          color: "#8367d8",
        },
      },
    },
  });

  return (
    <div className={classes.categories_container}>
      <p className={classes.categories_heading}>FILTER BY PRICE</p>
      <div className={classes.price_text_boxes}>
        <input
          className={classes.price_input}
          name="min"
          placeholder={"eg. $" + price[0]}
          onChange={onPriceInputChange}
        />
        <input
          className={classes.price_input}
          name="max"
          placeholder={"eg. $" + price[1]}
          onChange={onPriceInputChange}
        />
      </div>
      <ThemeProvider theme={muiTheme}>
        <Slider value={price} onChange={onPriceChange} min={0} max={1000} />
      </ThemeProvider>
      <p className={classes.current_prices}>
        ${price[0]}-${price[1]}
      </p>
      <p className={classes.average_price}>The average price is ${((price[1]+price[0])/2).toFixed(2)}</p>
    </div>
  );
}

export default PriceFilter;
