import React from "react";
import diamond from "../assets/img/diamond.png";
import { Link } from "react-router-dom";
import Diamond from "./Diamond";
import "../assets/scss/Item.scss";

class Item extends React.Component {
  render() {
    return (
      <div className="KittiesGrid-item">
        <Link to={"/itemPage/" + this.props.id}>
          <div
            className="KittyCard-imageContainer shadow"
            style={{ border: "2px solid grey", borderRadius: 5 }}
          >
            <Diamond color={this.props.color} size={200} />
            <div
              className="Item-description"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 5,
              }}
            >
              <div className="cardInformation">
                <div> {this.props.color || "#000000"} </div>
                <div>{this.props.price} bdy</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Item;
