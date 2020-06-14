import React from "react";
import diamond from "../assets/img/diamond.png";
import { Link } from "react-router-dom";
import Diamond from "./Diamond";
import Button from "@material-ui/core/Button";
import "../assets/scss/Item.scss";

class ProfileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  render() {
    return (
      <div
        className="KittyCard-imageContainer shadow"
        style={{ border: `3px solid ${this.props.border}`, borderRadius: 5 }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => this.props.select(this.props.id)}
        >
          <Diamond color={this.props.color} size={200} />
        </div>
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
                }}
              >
                <div style={{ padding: 5 }}>{this.props.price} bdy</div>
                <div
                  style={{
                    backgroundColor: "#C51162",
                    borderRadius: 7,
                    padding: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => this.props.cancelSell(this.props.id)}
                >
                  Cancel
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "space-between",
                    width: "150px",
                  }}
                >
                  <input
                    value={this.state.input}
                    onChange={(e) => this.setState({ input: e.target.value })}
                    style={{ padding: 5, width: 50 }}
                  ></input>
                  <div
                    style={{
                      backgroundColor: "#32CD32",
                      borderRadius: 7,
                      padding: 5,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      this.props.sell(this.props.id, this.state.input)
                    }
                  >
                    Sell
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
