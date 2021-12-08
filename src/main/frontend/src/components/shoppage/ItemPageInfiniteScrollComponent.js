import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, useRef } from "react";
import { Row, Container } from "react-bootstrap";
import ItemPageListItem from "./ItemPageListItem";
import classes from "./ItemPageInfiniteScrollComponent.module.css";
import {fetchItems} from '../../utils/itemService';

function ItemPageInfiniteScrollComponent(props) {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isMounted = useRef(false);
  const size = 2;
  const sortBy = "name";

  useEffect(async () => {
    setItems([]);
    setHasMoreItems(true)
    setPage(0);
    if(props.selectedSuperCategory != null){
      setSelectedCategory(props.selectedSuperCategory);
    }
  }, [props.selectedSuperCategory]);

  useEffect(async () => {
    let data = "";
    if (isMounted.current) {
      data = await fetchItems(page, size, null, sortBy, selectedCategory);
      setItems([...items, ...data.content]);
      setHasMoreItems(!data.last);
    } else {
      isMounted.current = true;
    }
  }, [selectedCategory, page]);

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

  const renderItems = () => {
    return (
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        <Container fluid className={classes.no_padding_left}>
          <Row no-gutters>
            {items.map((item) => {
              return <ItemPageListItem details = {item.details} name = {item.name} photo = {item.photo} price = {item.startingPrice} />;
            })}
          </Row>
        </Container >
      </InfiniteScroll>
    );
  };

  return <div>{props.categories && renderItems()}</div>;
}

export default ItemPageInfiniteScrollComponent;
