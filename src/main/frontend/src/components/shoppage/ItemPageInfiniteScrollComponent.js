import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import ItemPageListItem from "./ItemPageListItem";
import classes from "./ItemPageInfiniteScrollComponent.module.css";

function ItemPageInfiniteScrollComponent(props) {
  const [items, setItems] = useState([]);

  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);
  const [itemsToRender, setItemsToRender] = useState([]);

  useEffect(async () => {
    if (items.length > 0) {
      setItemsToRender((oldArray) => [...oldArray, ...items.slice(page, 2)]);
      setPage(page + 2);
    }
  }, [items]);

  useEffect(async () => {
    setItemsToRender([]);
    setHasMoreItems(true)
    setPage(0);
    let itemsToRender = [];
    if (props.selectedCategories.length == 0) {
      props.categories
        .filter(function (category) {
          return category.supercategoryId != null && category.items.length > 0;
        })
        .map((category) =>
          category.items.map((item) => itemsToRender.push(item))
        );
    } else {
      props.selectedCategories.map((selectedCategory) =>
        props.categories
          .filter(function (category) {
            return category.categoryId == selectedCategory;
          })
          .map((category) =>
            category.items.map((item) => itemsToRender.push(item))
          )
      );
    }
    setItems(itemsToRender);
  }, [props.categories, props.selectedCategories]);

  const fetchData = async () => {
    setItemsToRender((oldArray) => [...oldArray, ...items.slice(page, page+2)]);
    if(page+2 >= items.length){
      setHasMoreItems(false);
    }
    setPage(page + 2);
  };

  const renderItems = () => {
    return (
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Container fluid className={classes.no_padding_left}>
          <Row no-gutters>
            {itemsToRender.map((item) => {
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
