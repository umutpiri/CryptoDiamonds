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
      bestSeller: [],
      greatValues: [],
      fundamentalDiamonds: [],
      specialEditions: [],
    };
  }

  componentDidMount() {
    axios
      .get(backend + "/diamond/best-seller")
      .then((res) => {
        this.setState({ bestSeller: res.data });
      })
      .catch((err) => console.log(err));
    axios
      .get(backend + "/diamond/best-seller")
      .then((res) => {
        this.setState({ greatValues: res.data });
      })
      .catch((err) => console.log(err));
    axios
      .get(backend + "/diamond/best-seller")
      .then((res) => {
        this.setState({ fundamentalDiamonds: res.data });
      })
      .catch((err) => console.log(err));
    axios
      .get(backend + "/diamond/best-seller")
      .then((res) => {
        this.setState({ specialEditions: res.data });
      })
      .catch((err) => console.log(err));
  }

  routeChange = () => {
    let path = "browseItems";
    this.props.history.push(path);
  };

  render() {
    const bestSellers = this.state.bestSeller.map((mapItem, index) => (
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

    const greatValues = this.state.greatValues.map((mapItem, index) => (
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

    const fundamentalDiamonds = this.state.fundamentalDiamonds.map(
      (mapItem, index) => (
        <Item
          key={index}
          color={mapItem.color}
          message={mapItem.message}
          price={mapItem.price}
          id={mapItem.id}
          isSale={mapItem.is_sale}
          username={this.props.user.username}
        />
      )
    );

    const specialEditions = this.state.specialEditions.map((mapItem, index) => (
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
        <div className="discordAnnouncement">
          <span>
            "Share your collection in the "
            <a href="https://discord.gg/K86qFg">CryptoColors Discord </a>" for a
            chance to get featured in the Collection of the Week!"
          </span>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Best Seller</h1>
          {bestSellers}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Great Value Gems</h1>
          {greatValues}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Fundamental Diamonds</h1>
          {fundamentalDiamonds}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>

        <div className="KittiesCategory">
          <h1 className="CategoryHeader"> Special Edition Diamonds</h1>
          {specialEditions}
          <button class="browseAll" onClick={this.routeChange}>
            Browse All
          </button>
        </div>
      </div>
    );
  }
}

export default MainPage;
