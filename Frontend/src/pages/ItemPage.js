import React from 'react';
import '../assets/scss/ItemPage.scss';
import diamond from '../assets/img/dio2.png'
import ownerPhoto from '../assets/img/dio2.png'
import Popup from '../components/Popup'; 

class ItemPage extends React.Component {

  constructor(props){  
    super(props);  
    this.state = { showPopup: false };  
    }  
    
      togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }  


  render() {
    return (
      <div class="KittyPage">
        <div class="KittyBanner">
          <div class="KittyBanner-Status">
            <button class="KittyBanner-Buy"> Buy 0.0069 ETH $1.62 USD</button>
          </div>
          <img class="diamond" src={diamond}  />
        </div>
        <div class="KittyProfile">

          <div class="KittyHeader" >
            <div class="KittyHeader-main">
              <h1 class="KittyHeader-name-class">Shiniest Diamond</h1>
            </div>

            <div class="KittyHeader-owner"></div>
              <h4 class="owner">Owner</h4>
              <img class="owner-photo" src={ownerPhoto} />
              <h2 class="KittyHeader-owner-name" >Richie Rich </h2>
              

            <div class="KittyHeader-actions">
              
                <button class="offerButton" onClick={this.togglePopup.bind(this)}> Make Offer</button>  

                {this.state.showPopup ?  
                <Popup   
                          closePopup={this.togglePopup.bind(this)}  
                />  
                : null  
                }  
                            
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default ItemPage;