import React from "react";
import "../assets/scss/ItemPage.scss";
import diamond from "../assets/img/diamond.png";
import ownerPhoto from "../assets/img/richieRich.jpg";
import Popup from "../components/Popup";
import Diamond from "../components/Diamond";
import { Link } from "react-router-dom";
import axios from "axios";

const backend = "http://localhost:8181";

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false, diamond: {} };
  }

  componentDidMount() {
    console.log(this.props.id);
    axios
      .post(backend + "/diamond", { id: this.props.id })
      .then((res) => {
        console.log(res);
        this.setState({ diamond: res.data });
      })
      .catch((err) => console.log(err));
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
          {this.state.diamond.is_sale ? (
            <div className="KittyBanner-Status">
              <button className="KittyBanner-Buy">
                {" "}
                Buy {this.state.diamond.price} bugday(bdy)
              </button>
            </div>
          ) : (
            <div />
          )}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Diamond color={this.state.diamond.color} size={500}></Diamond>
          </div>
        </div>
        <div className="KittyProfile">
          <div className="KittyHeader">
            <div style={{ marginBottom: 50 }} className="KittyHeader-main">
              <h1 className="KittyHeader-name-className">
                {this.state.diamond.color}
              </h1>
              <div>token id: {this.state.diamond.id}</div>
            </div>
            <Link to={"/profile/" + this.state.diamond.owner}>
              <div className="KittyHeader-owner">
                <h4 className="owner">Owner</h4>
                <img className="owner-photo" src={ownerPhoto} />
                <h2 className="KittyHeader-owner-name">
                  {this.state.diamond.owner}
                </h2>
              </div>
            </Link>

            <div className="KittyHeader-actions">
              <button
                className="offerButton"
                onClick={this.togglePopup.bind(this)}
              >
                {" "}
                Make Offer
              </button>

              {this.state.showPopup ? (
                <Popup
                  diamond={this.state.diamond}
                  closePopup={this.togglePopup.bind(this)}
                />
              ) : null}

              {this.state.diamond.is_sale ? (
                <div class="KittySection-content">
                  <div class="KittyBid-boxes">
                    <div class="KittyBid-box">
                      <h3 class="KittyBid-box-title">Buy now price </h3>
                      <button class="buyWithDio">Buy with bdy</button>
                      <div>
                        <h5> {this.state.diamond.price} bugday(bdy)</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemPage;
