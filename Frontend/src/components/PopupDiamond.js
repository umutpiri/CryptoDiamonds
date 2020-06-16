import React from "react";
import "../assets/scss/popupOffer.scss";
import Diamond from "./Diamond";

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: 600 }} className="popup">
        <div
          style={{ alignItems: "center", justifyContent: "center" }}
          class="popup_resize"
        >
          <div class="popup_title">
            <h1 class="popup_offer">Congratulations!</h1>
            <h2 class="showOffer"> Your new diamond </h2>
            <h2 class="showOffer">{this.props.color}</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ backgroundColor: "#D3F3F7" }}>
              <Diamond color={this.props.color} size={300} />
            </div>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => this.props.closePopup()}
          >
            <div class="offerAndNevermindButtons">
              <button class="confirmButton">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
