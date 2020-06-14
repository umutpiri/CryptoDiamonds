import React from "react";
import "../assets/scss/ProfilePage.scss";
import ownerPhoto from "../assets/img/richieRich.jpg";
import Item from "../components/Item";
import axios from "axios";

const backend = "http://localhost:8181";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.valletID = "0x7e8bd3f...";

    this.state = {
      user: { diamonds: [] },
      itemContainer: [
        {
          price: "50 bdy",
          color: "#FFFF00",
        },
        {
          price: "100 bdy",
          color: "#00FF00",
        },
        {
          price: "70 bdy",
        },
        {
          price: "10 bdy",
          color: "#D3F3F7",
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .post(backend + "/user/get", { username: this.props.username })
      .then((res) => {
        console.log(res.data);
        this.setState({ user: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const items = this.state.user.diamonds.map((mapItem, index) => (
      <Item
        key={index}
        color={mapItem.color}
        message={mapItem.message}
        price={mapItem.price}
      />
    ));

    return (
      <div class="ProfilePage">
        <div class="ProfileHeader">
          <img className="ownerphotoo" src={ownerPhoto}></img>

          <div class="ownerInfo">
            <h2> {this.valletID} </h2>
            <button
              class="copyAddress"
              onClick={() => {
                navigator.clipboard.writeText(this.valletID);
              }}
            >
              {" "}
              Copy Address{" "}
            </button>
          </div>
        </div>

        <div class="showAllDiamonds">
          <h1 class="diamondsText">Diamonds</h1>
          <div class="allDiamaonds">{items}</div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
