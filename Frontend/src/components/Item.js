import React from "react";
import diamond from "../assets/img/diamond.png";
import { Link } from "react-router-dom";
import Diamond from "./Diamond";
import "../assets/scss/Item.scss";
import axios from "axios";

const backend = "http://localhost:8181";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.buy = this.buy.bind(this);
  }

  buy() {
    console.log("buy");
  }

  render() {
    return (
      <div className="KittiesGrid-item-new">
        <div
          className="KittyCard-imageContainer shadow"
          style={{ border: "3px solid grey", borderRadius: 5 }}
        >
          <Link to={"/itemPage/" + this.props.id}>
            <Diamond color={this.props.color} size={200} />
          </Link>
          <div
            className="Item-description"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 5,
            }}
          >
            <div
              style={{ height: 50, alignItems: "center" }}
              className="cardInformation"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "150px",
                }}
              >
                {" "}
                {this.props.color || "#000000"}{" "}
              </div>
              {this.props.isSale ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "space-between",
                    width: "150px",
                    marginTop: 5,
                  }}
                >
                  <div style={{ padding: 5 }}>{this.props.price} bdy</div>
                  {this.props.username ? (
                    <div
                      style={{
                        backgroundColor: "#32CD32",
                        borderRadius: 7,
                        padding: 5,
                        cursor: "pointer",
                        color: "#FFF",
                        paddingRight: 10,
                        paddingLeft: 10,
                      }}
                      onClick={() => this.props.cancelSell(this.props.id)}
                    >
                      Buy
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
