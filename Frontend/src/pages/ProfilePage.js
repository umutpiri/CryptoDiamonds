import React from 'react';
import "../assets/scss/ProfilePage.scss";
import ownerPhoto from "../assets/img/richieRich.jpg";
import Item from "../components/Item";

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.valletID = "0x7e8bd3f...";
    
    this.state = {
      itemContainer: [
        {
          price: "50$",
          color: "#FFFF00",
        },
        {
          price: "100$",
          color: "#00FF00",
        },
        {
          price: "70$",
        },
        {
          price: "10$",
          color: "#D3F3F7",
        },
      ],
    };
  }

  render() {

    const items = this.state.itemContainer.map((mapItem, index) => (
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
          <img className="ownerphotoo"  src={ownerPhoto}></img>

          <div class= "ownerInfo">
            <h2> {this.valletID} </h2>
            <button class = "copyAddress" onClick={() => {navigator.clipboard.writeText(this.valletID)}} > Copy Address </button>        
          </div>
        </div>
        
        <div class = "showAllDiamonds">
          <h1 class = "diamondsText" >Diamonds</h1>
          <div class = "allDiamaonds" >
            {items}
          </div>
        </div>

        
      </div>
    );
  }
}

export default ProfilePage;