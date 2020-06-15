import React from "react";
import "../assets/scss/MainPage.scss";
import "../assets/scss/App.scss";
import Item from "../components/Item";
import { useHistory } from "react-router-dom";
import axios from "axios";

const backend = "http://localhost:8181";

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
      bestSeller: [],
    };
  }

  componentDidMount() {
    axios
      .get(backend + "/diamond/best-seller")
      .then((res) => {
        this.setState({ bestSeller: res.data });
      })
      .catch((err) => console.log(err));
  }

  routeChange = () => {
    let path = "browseItems";
    this.props.history.push(path);
  };

  render() {
    const items = this.state.bestSeller.map((mapItem, index) => (
      <Item
        key={index}
        color={mapItem.color}
        message={mapItem.message}
        price={mapItem.price}
        id={mapItem.id}
        isSale={mapItem.is_sale}
        username={this.props.user.username}
      />
    ));

    return (
      <div className="MainPage">
        <button
          class="browseAll"
          onClick={() => {
            axios
              .post(backend + "/diamond/create", {
                username: this.props.user.username,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }}
        >
          Create Diamonds
        </button>
        <div className="discordAnnouncement">
          <span>
            "Share your collection in the "
            <a href="https://discord.gg/K86qFg">CryptoColors Discord </a>" for a
            chance to get featured in the Collection of the Week!"
          </span>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Best Seller</h1>
          {items}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Great Value Gems</h1>
          {items}
          <text>{"\n"}</text>
          {items}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Fundemental Gems</h1>
          {items}
          <text>{"\n"}</text>
          {items}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Special Edition Gems</h1>
          {items}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>
      </div>
    );
  }
}

export default MainPage;
