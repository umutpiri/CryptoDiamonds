import React from "react";

import Item from "../components/Item";
import OfferTabs from "../components/OfferTabs";

const tabColors = ["red", "yellow", "black"];

class OffersPage extends React.Component {
  constructor(props) {
    super(props);
    this.valletID = "0x7e8bd3f...";

    this.state = {
      currentTab: 0,
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
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(newValue) {
    console.log(newValue);
    this.setState({ currentTab: newValue });
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginTop: "50px", marginBottom: "70px" }}>OFFERS</h1>
          <OfferTabs changeTab={this.changeTab}></OfferTabs>
          <div
            style={{
              width: "100%",
              backgroundColor: tabColors[this.state.currentTab],
              minHeight: "600px",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default OffersPage;
