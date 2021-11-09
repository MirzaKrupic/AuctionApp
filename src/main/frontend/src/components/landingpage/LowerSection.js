import { useState } from "react";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import "./LowerSection.css";

function MiddleSection() {
  const [items, setItems] = useState(
    <InfiniteScrollComponent criteria="normal" />
  );
  const [selectedTab, setSelectedTab] = useState("new arrivals");

  const updateContent = () => {
    <InfiniteScrollComponent criteria="last_chance" />;
    setSelectedTab("last chance");
  };

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
            <InfiniteScrollComponent criteria="normal" />;
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
            <InfiniteScrollComponent criteria="last_chance" />;
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
