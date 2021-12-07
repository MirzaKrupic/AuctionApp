import LayoutContainer from "../components/LayoutContainer";
import ShopCategories from "../components/shoppage/ShopCategories";
import classes from "./Shop.module.css";
import { fetchCategories } from "../utils/categoryService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemPageInfiniteScrollComponent from "../components/shoppage/ItemPageInfiniteScrollComponent";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuperCategory, setSelectedSuperCategory] = useState(null);
  const { categoryId } = useParams();

  const onCategoryChange = (item) => {
    // if (!selectedCategories.includes(item.target.value)) {
    //   setSelectedCategories([...selectedCategories, ...item.target.value]);
    // } else {
    //   setSelectedCategories(
    //     selectedCategories.filter((val) => val !== item.target.value)
    //   );
    // }
  };

  const onSuperCategoryChange = (item) => {
    if(!selectedSuperCategory){
      setSelectedCategories(item)
    }else if(selectedSuperCategory == item){
      setSelectedSuperCategory(null)
    }else{
      setSelectedSuperCategory(parseInt(item))
    }
  };

  useEffect(async () => {
    if (categoryId) setSelectedSuperCategory(parseInt(categoryId));
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
  }, []);

  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <ShopCategories
          selected={categoryId ? categoryId : null}
          onCategoryChange={onCategoryChange}
          categories={categories}
          selectedSuperCategory = {selectedSuperCategory}
          onSuperCategoryChange = {onSuperCategoryChange}
        />
        <div className={classes.shop_right_section}>
          <select name="sorting" id="sorting">
            <option value="default">Default Sorting</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Rating</option>
            <option value="newness">Sort by Newness</option>
            <option value="price">Sort by Price</option>
          </select>
          <div className={classes.infinite_scroll}>
          <ItemPageInfiniteScrollComponent
            //selectedCategories={selectedCategories}
            selectedSuperCategory = {selectedSuperCategory}
            categories={categories}
          />
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

export default Shop;
