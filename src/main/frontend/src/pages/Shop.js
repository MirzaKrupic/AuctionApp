import LayoutContainer from "../components/LayoutContainer";
import ShopCategories from "../components/shoppage/ShopCategories";
import classes from "./Shop.module.css";
import { fetchCategories } from "../utils/categoryService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/shoppage/ItemList";
import PriceFilter from "../components/shoppage/PriceFilter";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/styles";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuperCategory, setSelectedSuperCategory] = useState(null);
  const [price, setPrice] = useState([0, 1000]);
  const { categoryId } = useParams();
  const options = [
    {
      value: "default",
      name: "Default Sorting",
    },
    {
      value: "popularity",
      name: "Sort by Popularit",
    },
    {
      value: "rating",
      name: "Sort by Rating",
    },
    {
      value: "newness",
      name: "Sort by Newness",
    },
    {
      value: "price",
      name: "Sort by Price",
    },
  ];

  const onCategoryChange = (item) => {
    if (!selectedCategories.includes(parseInt(item.target.value))) {
      setSelectedCategories([
        ...selectedCategories,
        parseInt(item.target.value),
      ]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((val) => val !== parseInt(item.target.value))
      );
    }
  };

  const onSuperCategoryChange = (superCategory) => {
    if (selectedSuperCategory === 0) {
      setSelectedSuperCategory(parseInt(superCategory));
    } else if (selectedSuperCategory === superCategory) {
      setSelectedSuperCategory(0);
      setSelectedCategories([]);
    } else {
      setSelectedSuperCategory(parseInt(superCategory));
    }
  };

  const onPriceChange = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(async () => {
    if (categoryId) {
      setSelectedSuperCategory(parseInt(categoryId));
    } else {
      setSelectedSuperCategory(0);
    }
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
  }, []);

  const chipDelete = (id) => {
    if (id === selectedSuperCategory) {
      setSelectedSuperCategory(0);
      setSelectedCategories([]);
    } else if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((val) => val !== parseInt(id))
      );
    } else {
      setPrice([0, 1000]);
    }
  };

  const onPriceInputChange = (field) => {
    if (field.target.value !== "") {
      if (field.target.name === "max") {
        setPrice([price[0], field.target.value]);
      } else {
        setPrice([field.target.value, price[1]]);
      }
    }
  };

  const CustomChip = styled(Chip)({
    backgroundColor: "#8367d8",
    color: "#fff",
    marginBottom: "10px",
  });

  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <div className={classes.shop_left_section}>
          <ShopCategories
            onCategoryChange={onCategoryChange}
            categories={categories}
            selectedCategories={selectedCategories}
            selectedSuperCategory={selectedSuperCategory}
            onSuperCategoryChange={onSuperCategoryChange}
          />
          <PriceFilter
            onPriceInputChange={onPriceInputChange}
            onPriceChange={onPriceChange}
            price={price}
          />
        </div>
        <div className={classes.shop_right_section}>
          <select name="sorting" id="sorting">
            {options.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </select>
          <Stack direction="row" spacing={1}>
            {categories
              .filter((category) => {
                return (
                  selectedCategories.includes(category.categoryId) ||
                  selectedSuperCategory === category.categoryId
                );
              })
              .map((category) => (
                <CustomChip
                  label={category.name}
                  onDelete={() => chipDelete(category.categoryId)}
                />
              ))}
            {(price[0] !== 0 || price[1] !== 1000) && (
              <Chip
                style={{
                  backgroundColor: "#8367d8",
                  color: "#fff",
                  marginBottom: "10px",
                }}
                label={"$" + price[0] + "-$" + price[1]}
                onDelete={() => chipDelete(-1)}
              />
            )}
          </Stack>
          <div className={classes.item_list}>
            <ItemList
              selectedCategories={selectedCategories}
              selectedSuperCategory={selectedSuperCategory}
              categories={categories}
              price={price}
            />
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

export default Shop;
