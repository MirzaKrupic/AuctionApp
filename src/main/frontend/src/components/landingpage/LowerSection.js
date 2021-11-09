import { useState } from "react";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import "./LowerSection.css";
import {LANDING_PAGE_TAB_VALUES} from '../../utils/constants';

function MiddleSection() {
  const [items, setItems] = useState(
    <InfiniteScrollComponent criteria={LANDING_PAGE_TAB_VALUES['NORMAL']} />
  );
  const [selectedTab, setSelectedTab] = useState("new arrivals");

  return (
    <div className="section_container">
      <div className="section_title_div">
        <button
          className={
            selectedTab === "new arrivals"
              ? "option_button_selected"
              : "option_button"
          }
          onClick={() => {
            setItems(<InfiniteScrollComponent criteria={LANDING_PAGE_TAB_VALUES['NORMAL']} />);
            setSelectedTab("new arrivals");
          }}
        >
          New Arrivals
        </button>
        <button
          className={
            selectedTab === "top rated"
              ? "option_button_selected"
              : "option_button"
          }
        >
          Top Rated
        </button>
        <button
          className={
            selectedTab === "last chance"
              ? "option_button_selected"
              : "option_button"
          }
          onClick={() => {
            setItems(<InfiniteScrollComponent criteria={LANDING_PAGE_TAB_VALUES['LAST_CHANCE']} />);
            setSelectedTab("last chance");
          }}
        >
          Last Chance
        </button>
      </div>
      <div className="feature_items_container">{items}</div>
    </div>
  );
}

export default MiddleSection;
