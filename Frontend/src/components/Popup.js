import React from "react";
import "../assets/scss/popupOffer.scss";

class Popup extends React.Component {

  constructor(props){
    super(props);
    this.state = {offer: ''};
  }

  offerHandler = (event) => {
    this.setState({offer: event.target.value});
  }

  render() {
    
    /** I'm not sure this is the true place to write if clause */
    let offerValue = '';
    if (this.state.offer) {
      offerValue = <h1> {this.state.offer} bugday(bdy) </h1>;
    } else {
      offerValue = '';
    }

    return (
      <div className="popup">
        <div class = "popup_resize">
          <div class= "popup_title">
            <h1 class="popup_offer">
              <span>Make an Offer</span>
            </h1>
            <h2 class="showOffer" > {offerValue} </h2>

            <p class="grey_line"></p>
          </div>

          <div class="popup_estimatedTransactionFee">
            <h3 class = "estimated_H3" >Estimated Transaction Fee </h3>
            <p class = "estimated_p"> {"<"} % 1 bugday (bdy) </p>
            <p class="grey_line"></p>
          </div>

          <div class= "popup_totalFee">
            <h3 class = "totalFee_H3" >Total Fee </h3>
            <p class = "totalFee_p"> 3.75% bugday (bdy) </p>
            <p class="grey_line"></p>
          </div>

          <div class="popup_beforeConfirm">
            <h3>Before you confirm</h3>
            <ul>
              <li>Offer amount is held in escrow for 1 days.</li>
              <li>
                Total 3.75% fee is collected when your offer is successful or cancelled.
              </li>
              <li>Expired or outbid offers incur a flat 0.001 ETH fee.</li>
              <li>
                A Diamond’s cooldown may change between the time an offer is made and concluded.
              </li>
            </ul>
            <p class="grey_line"></p>
          </div>

          <div class = "offerInput">
              <input class="orderInput"
                type="number"
                placeholder="Type your offer"
                onChange={this.offerHandler}
              />
            </div>

          <div className="popup\_inner">
            <h1>{this.props.text}</h1>
            <button onClick={this.props.closePopup}>close</button>
          </div>

          <button id = "x">  X </button>

        </div>

      </div>
    );
  }
}

export default Popup;
