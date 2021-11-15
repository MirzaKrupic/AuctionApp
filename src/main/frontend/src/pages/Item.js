import classes from "./Item.module.css";
import LayoutContainer from "../components/LayoutContainer";
import ImageGalery from "../components/itempage/ImageGalery";
import ItemInfo from "../components/itempage/ItemInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchItemById } from "../utils/itemService";

function Item() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});

  useEffect(async () => {
    const fetchedItem = await fetchItemById(itemId);

    setItem(fetchedItem);
  }, []);

  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <ImageGalery image={item.photo} />
        <ItemInfo
          itemId={itemId}
          name={item.name}
          count={item.count}
          amount={item.amount}
          startingPrice={item.startingPrice}
          auctionEndDate={item.auctionEndDate}
        />
      </div>
    </LayoutContainer>
  );
}

export default Item;
