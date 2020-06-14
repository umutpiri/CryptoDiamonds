import React from "react";
import diamond from "../assets/img/diamond.png";

class Diamond extends React.Component {
  render() {
    return (
      <img
        src={diamond}
        style={{
          width: this.props.size,
          height: this.props.size,
          justifyContent: "flex-end",
          filter: `opacity(0.75) drop-shadow(0 0 0 ${
            this.props.color || "#000"
          })`,
        }}
      />
    );
  }
}

export default Diamond;
