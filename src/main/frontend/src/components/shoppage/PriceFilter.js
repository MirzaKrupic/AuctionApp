import { Slider } from "@material-ui/core";
import classes from "./PriceFilter.module.css";
import ShopCategoryItem from "./ShopCategoryItem";
import * as React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {PRICE_VALUES} from "../../utils/constants"

function PriceFilter({ onPriceChange, price, onPriceInputChange }) {
  const SLIDER_COLOR = "#8367d8";

  const muiTheme = createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: SLIDER_COLOR,
        },
        track: {
          color: SLIDER_COLOR,
        },
        rail: {
          color: SLIDER_COLOR,
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
        <Slider value={price} onChange={onPriceChange} min={PRICE_VALUES.MIN} max={PRICE_VALUES.MAX} />
      </ThemeProvider>
      <p className={classes.current_prices}>
        ${price[0]}-${price[1]}
      </p>
      <p className={classes.average_price}>The average price is ${((price[1]+price[0])/2).toFixed(2)}</p>
    </div>
  );
}

export default PriceFilter;
