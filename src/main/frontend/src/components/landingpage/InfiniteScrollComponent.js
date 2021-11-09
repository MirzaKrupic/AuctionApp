import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import LandingPageItem from "./LandingPageItem";
import { Row } from "react-bootstrap";
import {itemsFetch, itemsFetchByDate} from './itemService';

function InfiniteScrollComponent(props) {
  const [items, setItems] = useState([]);

  const [hasMoreItems, setHasMoreItems] = useState(true);

  const [page, setpage] = useState(0);

  useEffect(async () => {
    let data = "";

    if(props.criteria === "normal"){
      data = await itemsFetch(page, 20);
    }else if(props.criteria === "last_chance"){
      data = await itemsFetchByDate(page, 20, "desc");
    }

    setItems(data.content);
  }, []);

  const fetchData = async () => {
    let commentsFromServer = "";

    if(props.criteria === "normal"){
      commentsFromServer = await itemsFetch(page, 20);
    }else if(props.criteria === "last_chance"){
      commentsFromServer = await itemsFetchByDate(page, 20, "desc");
    }

    setItems([...items, ...commentsFromServer.content]);

    setHasMoreItems(commentsFromServer.last);

    setpage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore={!hasMoreItems}
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
            return (
              <LandingPageItem
                item_type="SMALL"
                key={item.id}
                photo={item.photo}
                card_title={item.name}
                price={item.startingPrice}
              />
            );
          })}
        </Row>
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteScrollComponent;
