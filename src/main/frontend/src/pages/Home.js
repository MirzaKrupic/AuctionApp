import { Container } from "react-bootstrap";
import Categories from "../components/landingpage/Categories";
import MainItemCard from "../components/landingpage/MainItemCard";
import MiddleSection from "../components/landingpage/MiddleSection";
import UpperSection from "../components/landingpage/UpperSection";
import LowerSection from "../components/landingpage/LowerSection";
import classes from "./Home.module.css";
import LayoutContainer from "../components/LayoutContainer";

function Home() {
  const dummyCategories = [
    {
      id: 1,
      name: "Fashion",
    },
    {
      id: 2,
      name: "Accessories",
    },
    {
      id: 3,
      name: "Jewelry",
    },
    {
      id: 4,
      name: "Shoes",
    },
    {
      id: 5,
      name: "Sportware",
    },
    {
      id: 6,
      name: "Home",
    },
    {
      id: 7,
      name: "Electronics",
    },
    {
      id: 8,
      name: "Mobile",
    },
    {
      id: 9,
      name: "Computer",
    },
  ];

  return (
    <LayoutContainer >
      <div className={classes.mainsection}>
        <Categories categories={dummyCategories} />
        <MainItemCard
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra
          placerat. Aenean auctor luctus tempus. Cras laoreet et magna in
          dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In
          hac habitasse platea dictumst"
          price = "69,99"
          title = "Title"
        />
      </div>

      <UpperSection />

      <MiddleSection />

      <LowerSection />
      </LayoutContainer>
  );
}

export default Home;
