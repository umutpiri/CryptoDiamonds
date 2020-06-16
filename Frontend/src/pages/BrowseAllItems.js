import React from "react";
import "../assets/scss/BrowseCategoryItems.scss";
import Item from "../components/Item";
import axios from "axios";

const backend = "http://localhost:8181";

class BrowseAllItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isAscending: false,
    };
  }

  componentDidMount() {
    axios
      .get(backend + "/diamond/get-sales")
      .then((res) => {
        console.log(res.data);
        this.setState({
          items: res.data.sort((a, b) =>
            a.price > b.price ? 1 : b.price > a.price ? -1 : 0
          ),
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const items = this.state.items.map((mapItem, index) => (
      <Item
        key={index}
        color={mapItem.color}
        message={mapItem.message}
        price={mapItem.price}
        id={mapItem.id}
        isSale={mapItem.is_sale}
        username={this.props.username}
      />
    ));

    return (
      <div className="BrowseCategoryPage">
        <h1 className="HeaderName">Browse All Diamonds</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 50,
            marginLeft: 50,
            marginBottom: 50,
          }}
        >
          <div></div>
          <div
            style={{
              backgroundColor: "#C0C0C0",
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderRadius: 7,
              cursor: "pointer",
              fontSize: 20,
            }}
            onClick={() => {
              var arr = this.state.items;
              arr = arr.reverse();
              this.setState({
                isAscending: !this.state.isAscending,
                items: arr,
              });
            }}
          >
            Sort {this.state.isAscending ? "ascending" : "descending"}
          </div>
        </div>
        <div className="AllItems">{items}</div>
      </div>
    );
  }
}

export default BrowseAllItems;
