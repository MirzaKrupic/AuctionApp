import { Slider } from "@material-ui/core";
import classes from "./PriceFilter.module.css";
import ShopCategoryItem from "./ShopCategoryItem";
import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function PriceFilter() {
  function valuetext(value) {
    return `${value}°C`;
  }
  
    const [value, setValue] = React.useState([20, 37]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

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
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
      />
      </ThemeProvider>
    </div>
  );
}

export default PriceFilter;
