import React from "react";
import diamond from "../assets/img/diamond.png";
import "../assets/scss/Item.scss";

class Item extends React.Component {
  render() {
    return (
      <div className="KittiesGrid-item">
        <a href="/itemPage">
            <div
              className="KittyCard-imageContainer shadow"
              style={{ border: "2px solid grey", borderRadius: 5 }}
            >
              <img
                src={diamond}
                style={{
                  width: 200,
                  height: 200,
                  justifyContent: "flex-end",
                  filter: `opacity(0.75) drop-shadow(0 0 0 ${
                    this.props.color || "#000"
                  })`,
                }}
              />
              <div
                className="Item-description"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <div className ="cardInformation">
                  <div> {this.props.color || "#000000"} </div>
                  <div>{this.props.price}</div>
                </div>
              </div>
            </div>
        </a>
      </div>
    );
  }
}

export default Item;
