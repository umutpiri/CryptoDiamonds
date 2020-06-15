import React from "react";
import "../assets/scss/ProfilePage.scss";
import ownerPhoto from "../assets/img/richieRich.jpg";
import Item from "../components/Item";
import axios from "axios";
import ProfileItem from "../components/ProfileItem";
import OfferTabs from "../components/OfferTabs";
import "../assets/scss/Item.scss";

const backend = "http://localhost:8181";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.valletID = "0x7e8bd3f...";

    this.state = {
      user: { diamonds: [] },
      selected: [],
    };

    this.selectItem = this.selectItem.bind(this);
    this.cancelSell = this.cancelSell.bind(this);
    this.sell = this.sell.bind(this);
    this.merge = this.merge.bind(this);
  }

  selectItem(id) {
    if (this.state.selected.includes(id)) {
      console.log("if");
      var arr = this.state.selected;
      var index = arr.indexOf(id);
      if (index !== -1) arr.splice(index, 1);
      this.setState({ selected: arr });
    } else {
      console.log("else");
      if (this.state.selected.length < 2)
        this.setState({
          selected: this.state.selected.concat(id),
        });
    }
  }

  cancelSell(id) {
    axios
      .post(backend + "/diamond/cancel-sell", { id: id })
      .then((res) => {
        console.log(res);
        var user = this.state.user;
        var arr = user.diamonds;
        var index = arr.findIndex((item) => item.id === id);
        arr[index]["is_sale"] = false;
        user.diamonds = arr;
        this.setState({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sell(id, price) {
    axios
      .post(backend + "/diamond/sell", { id: id, price: price })
      .then((res) => {
        console.log(res);
        console.log(price);
        var user = this.state.user;
        var arr = user.diamonds;
        var index = arr.findIndex((item) => item.id === id);
        arr[index]["is_sale"] = true;
        arr[index]["price"] = price;
        user.diamonds = arr;
        this.setState({ user });
      })
      .catch((err) => console.log(err));
  }

  merge() {
    if (this.state.selected.length == 2) {
      axios
        .post(backend + "/diamond/merge", {
          firstId: this.state.selected[0],
          secondId: this.state.selected[1],
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  }

  componentDidMount() {
    axios
      .get(backend + "/user")
      .then((res) => {
        console.log(res);
        if (res.data.user) this.setState({ username: res.data.user.username });
      })
      .catch((err) => console.log(err));
    axios
      .post(backend + "/user/get", { username: this.props.username })
      .then((res) => {
        console.log(res.data);
        var data = res.data;
        data["is_selected"] = false;
        this.setState({ user: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.props.loggedInUser.username === this.state.user.username) {
      const items = this.state.user.diamonds.map((mapItem, index) => (
        <div key={index} className="KittiesGrid-item-new">
          <ProfileItem
            color={mapItem.color}
            message={mapItem.message}
            price={mapItem.price}
            id={mapItem.id}
            border={
              this.state.selected.includes(mapItem.id) ? "orange" : "grey"
            }
            isSale={mapItem.is_sale}
            id={mapItem.id}
            select={this.selectItem}
            cancelSell={this.cancelSell}
            sell={this.sell}
          />
        </div>
      ));
      return (
        <div class="ProfilePage">
          <div class="ProfileHeader">
            <img className="ownerphotoo" src={ownerPhoto}></img>

            <div class="ownerInfo">
              <h1>{this.state.user.username}</h1>
              <h2> {this.state.user.public} </h2>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "space-between",
              }}
            >
              <h1 class="diamondsText">Diamonds</h1>
              <div
                style={{
                  backgroundColor: "#008000",
                  padding: 10,
                  color: "#FFF",
                  paddingTop: 15,
                  fontSize: 20,
                  fontWeight: "bold",
                  borderRadius: 7,
                  cursor: "pointer",
                }}
                onClick={() => this.merge()}
              >
                MERGE
              </div>
            </div>
            <div class="allDiamaonds">{items}</div>
          </div>
          <OfferTabs />
        </div>
      );
    } else {
      const items = this.state.user.diamonds.map((mapItem, index) => (
        <Item
          key={index}
          color={mapItem.color}
          message={mapItem.message}
          price={mapItem.price}
          id={mapItem.id}
          isSale={mapItem.is_sale}
          username={this.props.username}
        />
      ));
      return (
        <div class="ProfilePage">
          <div class="ProfileHeader">
            <img className="ownerphotoo" src={ownerPhoto}></img>

            <div class="ownerInfo">
              <h1>{this.state.user.username}</h1>
              <h2> {this.state.user.public} </h2>
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
            <div class="allDiamaonds">{items}</div>
          </div>
        </div>
      );
    }
  }
}

export default ProfilePage;
