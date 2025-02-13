import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const scrollLeft = () => {
    const container = document.querySelector(".explore-menu-list");
    container.scrollBy({
      left: -container.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = document.querySelector(".explore-menu-list");
    container.scrollBy({
      left: container.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Delicious Menu</h1>
      <p className="explore-menu-text">
        Discover a diverse range of mouthwatering dishes from savory curries and
        aromatic biryanis to tasty snacks and refreshing drinks. Each item is
        crafted with fresh ingredients to delight your taste buds. Find your
        next favorite meal!
      </p>
      <div className="scroll-slider">
        <button className="scroll-btn left" onClick={scrollLeft}>
          {"<"}
        </button>
        <button className="scroll-btn right" onClick={scrollRight}>
          {">"}
        </button>
      </div>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt=""
            />
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
