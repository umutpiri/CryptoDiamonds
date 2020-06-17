import React from "react";
import "../assets/scss/popupOffer.scss";
import Diamond from "./Diamond";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offer: "" };
  }

  offerHandler = (event) => {
    this.setState({ offer: event.target.value });
  };

  render() {
    /** I'm not sure this is the true place to write if clause */
    let offerValue = "";
    if (this.state.offer) {
      offerValue = <h1> {this.state.offer} bugday(bdy) </h1>;
    } else {
      offerValue = <h1> 0 bugday(bdy) </h1>;
    }

    return (
      <div className="popup">
        <div class="popup_resize">
          <div class="popup_title">
            <h1 class="popup_offer">
              <span>Make an Offer</span>
            </h1>
            <h2 class="showOffer"> {offerValue} </h2>

            <p class="grey_line"></p>
          </div>

          <div class="popup_estimatedTransactionFee">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>{this.props.diamond.color}</h2>
              <div style={{ backgroundColor: "#D3F3F7" }}>
                <Diamond color={this.props.diamond.color} size={200} />
              </div>
            </div>
          </div>

          <div class="offerInput">
            <input
              class="orderInput"
              type="number"
              placeholder="Type your offer"
              onChange={this.offerHandler}
            />
          </div>

          <div className="popup\_inner">
            <h1>{this.props.text}</h1>
          </div>

          <div class="offerAndNevermindButtons">
            <button class="confirmButton">Confirm Offer</button>
            <h2 class="closeText" onClick={this.props.closePopup}>
              Nevermind
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
