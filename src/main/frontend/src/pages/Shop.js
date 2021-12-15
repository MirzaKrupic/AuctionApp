import LayoutContainer from "../components/LayoutContainer";
import ShopCategories from "../components/shoppage/ShopCategories";
import classes from "./Shop.module.css";
import { fetchCategories } from "../utils/categoryService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/shoppage/ItemList";
import PriceFilter from "../components/shoppage/PriceFilter";
import * as React from "react";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuperCategory, setSelectedSuperCategory] = useState(null);
  const [price, setPrice] = React.useState([0, 1000]);
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
          <PriceFilter onPriceChange={onPriceChange} price={price} />
        </div>
        <div className={classes.shop_right_section}>
          <select name="sorting" id="sorting">
            {options.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </select>
          {categories
            .filter((category) => {
              return selectedCategories.includes(category.categoryId) || selectedSuperCategory === category.categoryId;
            })
            .map((category) => (
              category.name
            ))}
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
