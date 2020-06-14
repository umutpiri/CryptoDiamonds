import React from "react";
import "../assets/scss/BrowseCategoryItems.scss";
import Item from "../components/Item";
import axios from "axios";

const backend = "http://localhost:8181";

class BrowseAllItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemContainer: [],
    };
  }

  componentDidMount() {
    axios
      .get(backend + "/diamond/get-sales")
      .then((res) => {
        console.log(res.data);
        this.setState({ itemContainer: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const items = this.state.itemContainer.map((mapItem, index) => (
      <Item
        key={index}
        color={mapItem.color}
        message={mapItem.message}
        price={mapItem.price}
        id={mapItem.id}
      />
    ));

    return (
      <div className="BrowseCategoryPage">
        <h1 className="HeaderName">Browse All Items</h1>
        <div className="AllItems">
          {items}
          {items}
          {items}
          {items}
        </div>
      </div>
    );
  }
}

export default BrowseAllItems;
