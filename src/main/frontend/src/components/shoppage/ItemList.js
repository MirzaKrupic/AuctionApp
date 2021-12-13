import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { Row, Container } from "react-bootstrap";
import ItemPageListItem from "./ItemPageListItem";
import classes from "./ItemList.module.css";
import { fetchItems } from "../../utils/itemService";
import { SORTING_VALUES } from "../../utils/constants";

function ItemList(props) {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedSupercategory, setSelectedSupercategory] = useState(
    props.selectedSuperCategory
  );
  const PAGE_SIZE = 2;

  useEffect(async () => {
    setItems([]);
    setHasMoreItems(true);
    setPage(0);
    if (props.selectedSuperCategory != null) {
      setSelectedSupercategory(props.selectedSuperCategory);
    }
  }, [props.selectedSuperCategory]);

  useEffect(async () => {
    let data = "";
    if (selectedSupercategory !== null) {
      data = await fetchItems(
        page,
        PAGE_SIZE,
        null,
        SORTING_VALUES.NAME,
        selectedSupercategory
      );
      setItems([...items, ...data.content]);
      setHasMoreItems(!data.last);
    }
  }, [selectedSupercategory, page]);

  // useEffect(async () => {
  //   setItemsToRender([]);
  //   setHasMoreItems(true)
  //   setPage(0);
  //   let itemsToRender = [];
  //   if (props.selectedCategories.length == 0) {
  //     props.categories
  //       .filter(function (category) {
  //         return category.supercategoryId != null && category.items.length > 0;
  //       })
  //       .map((category) =>
  //         category.items.map((item) => itemsToRender.push(item))
  //       );
  //   } else {
  //     props.selectedCategories.map((selectedCategory) =>
  //       props.categories
  //         .filter(function (category) {
  //           return category.categoryId == selectedCategory;
  //         })
  //         .map((category) =>
  //           category.items.map((item) => itemsToRender.push(item))
  //         )
  //     );
  //   }
  //   setItems(itemsToRender);
  // }, [props.categories, props.selectedCategories]);

  const fetchData = async () => {
    setPage(page + 1);
  };

  return (
    <div>
      {props.categories && (
        <div>
          <Container fluid className={classes.no_padding_left}>
            <Row no-gutters>
              {items.map((item) => {
                return (
                  <ItemPageListItem
                    details={item.details}
                    name={item.name}
                    photo={item.photo}
                    price={item.startingPrice}
                  />
                );
              })}
            </Row>
          </Container>
          {hasMoreItems && (
            <button className={classes.fetch_button} onClick={fetchData}>
              EXPLORE MORE
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemList;
