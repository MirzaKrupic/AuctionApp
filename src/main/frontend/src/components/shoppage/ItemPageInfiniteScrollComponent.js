import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { fetchItems } from "../../utils/itemService";
import { LANDING_PAGE_TAB_VALUES } from "../../utils/constants";
import ItemPageListItem from "./ItemPageListItem";

function ItemPageInfiniteScrollComponent(props) {
  const [items, setItems] = useState([]);

  const [hasMoreItems, setHasMoreItems] = useState(true);
  let res = null;
  const [page, setPage] = useState(0);

  useEffect(async () => {}, []);

  useEffect(async () => {
    let itemsToRender = [];
    console.log(props.selectedCategories.length);
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
  }, [props.selectedCategories]);

  const fetchData = async () => {
    setPage(page + 1);
  };

  const renderItems = () => {
    return (
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container-fluid">
          <Row>
            {items.map((item) => {
              return <ItemPageListItem />;
            })}
          </Row>
        </div>
      </InfiniteScroll>
    );
  };

  return <div>{props.categories && renderItems()}</div>;
}

export default ItemPageInfiniteScrollComponent;
