import React from "react";
import "../assets/scss/ItemPage.scss";
import diamond from "../assets/img/diamond.png";
import ownerPhoto from "../assets/img/richieRich.jpg";
import Popup from "../components/Popup";

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <div className="KittyPage">
        <div className="KittyBanner">
          <div className="KittyBanner-Status">
            <button className="KittyBanner-Buy">
              {" "}
              Buy 0.0069 ETH $1.62 USD
            </button>
          </div>
          <img className="diamond" src={diamond} />
        </div>
        <div className="KittyProfile">
          <div className="KittyHeader">
            <div className="KittyHeader-main">
              <h1 className="KittyHeader-name-className">Shiniest Diamond</h1>
            </div>

            <div className="KittyHeader-owner"></div>
            <h4 className="owner">Owner</h4>
            <img className="owner-photo" src={ownerPhoto} />
            <h2 className="KittyHeader-owner-name">Richie Rich </h2>

            <div className="KittyHeader-actions">
              <button
                className="offerButton"
                onClick={this.togglePopup.bind(this)}
              >
                {" "}
                Make Offer
              </button>

              {this.state.showPopup ? (
                <Popup closePopup={this.togglePopup.bind(this)} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemPage;
