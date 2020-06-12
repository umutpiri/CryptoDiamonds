import React from "react";
import "../assets/scss/MainPage.scss";
import "../assets/scss/App.scss";
import Item from "../components/Item";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemContainer: [
        {
          price: "50 bdy",
          color: "#FFFF00",
        },
        {
          price: "100 bdy",
          color: "#00FF00",
        },
        {
          price: "70 bdy",
        },
        {
          price: "10 bdy",
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
      <div className="MainPage">
        <div className = "discordAnnouncement">
          <span >
                "Share your collection in the "
                <a href="https://discord.gg/K86qFg">CryptoColors Discord </a>" for
                a chance to get featured in the Collection of the Week!"
          </span>
        </div>

        <Link to="/offers">OFFERS</Link>
        <div className="KittiesCategory">
          <h1 className = "CategoryHeader" > Best Seller</h1>
          {items}
          <button class="browseAll">Browse All</button>
        </div>

        <div className="KittiesCategory">
          <h1 className = "CategoryHeader" > Great Value Gems</h1>
          {items}          
          <text>{'\n'}</text>
          {items}
          <button class="browseAll">Browse All</button>
        </div>

        <div className="KittiesCategory">
          <h1 className = "CategoryHeader" > Fundemental Gems</h1>
          {items}
          <text>{'\n'}</text>
          {items}
          <button class="browseAll">Browse All</button>
        </div>

        <div className="KittiesCategory">
          <h1 className = "CategoryHeader" > Special Edition Gems</h1>
          {items}
          <button class="browseAll">Browse All</button>
        </div>

      </div>
    );
  }
}

export default MainPage;
