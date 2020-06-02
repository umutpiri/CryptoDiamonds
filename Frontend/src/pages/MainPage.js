import React from "react";
import "../assets/scss/MainPage.scss";
import "../assets/scss/App.scss";
import Item from "../components/Item";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemContainer: [
        {
          price: "50$",
          color: "#FFFF00",
        },
        {
          price: "100$",
          color: "#00FF00",
        },
        {
          price: "70$",
        },
        {
          price: "10$",
          color: "#D3F3F7",
        },
      ],
    };
  }
  render() {
    const items = this.state.itemContainer.map((mapItem, index) => (
      <Item
        key={index}
        color={mapItem.color}
        message={mapItem.message}
        price={mapItem.price}
      />
    ));
    return (
      <div className="AllCategories">
        <div className="KittiesCategory">
          <h1> Best Seller</h1>
          <p>
            <span>
              "Share your collection in the "
              <a href="https://discord.gg/K86qFg">CryptoColors Discord </a>" for
              a chance to get featured in the Collection of the Week!"
            </span>
          </p>
          {items}
          {items}
        </div>

        <div className="KittiesCategory">
          <h1> Great-value Gems</h1>
          {items}
          {items}
        </div>

        <div className="KittiesCategory">
          <h1> Fundemental Gems</h1>
          {items}
          {items}
        </div>
      </div>
    );
  }
}

export default MainPage;
