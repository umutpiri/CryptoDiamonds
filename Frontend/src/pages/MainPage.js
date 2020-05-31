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
          message: "#108865",
          price: "50$",
          color: "#FFFF00",
        },
        {
          message: "#108893",
          price: "100$",
          color: "#00FF00",
        },
        {
          message: "#000000",
          price: "70$",
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
