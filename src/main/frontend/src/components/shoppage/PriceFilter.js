import { Slider } from "@material-ui/core";
import classes from "./PriceFilter.module.css";
import ShopCategoryItem from "./ShopCategoryItem";
import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function PriceFilter({onPriceChange, price}) {

    const muiTheme = createMuiTheme({
      overrides:{
        MuiSlider: {
          thumb:{
          color: "#8367d8",
          },
          track: {
            color: '#8367d8'
          },
          rail: {
            color: '#8367d8'
          }
        }
    }
    });
    
  return (
    <div className={classes.categories_container}>
      <p className={classes.categories_heading}>FILTER BY PRICE</p>
      <ThemeProvider theme={muiTheme}>
      <Slider
        value={price}
        onChange={onPriceChange}
        min={0}
        max={1000}
      />
      </ThemeProvider>
      <p>${price[0]}-${price[1]}</p>
    </div>
  );
}

export default PriceFilter;
