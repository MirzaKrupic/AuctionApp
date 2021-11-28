import classes from "./Item.module.css";
import LayoutContainer from "../components/LayoutContainer";
import ImageGalery from "../components/itempage/ImageGalery";
import ItemInfo from "../components/itempage/ItemInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchItemById } from "../utils/itemService";
import { AuthContext } from "../hooks";
import { useContext } from "react";

function Item() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const { token, isUserLoggedIn } = useContext(AuthContext);

  useEffect(async () => {
    console.log(token);
    const fetchedItem = await fetchItemById(itemId,token);

    setItem(fetchedItem);
    console.log(item);
  }, []);

  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <ImageGalery image={item.photo} />
        <ItemInfo
          {...item}
        />
      </div>
    </LayoutContainer>
  );
}

export default Item;
