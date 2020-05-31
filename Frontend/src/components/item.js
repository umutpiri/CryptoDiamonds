import React from 'react';
import diamond from '../assets/img/dio2.png'
import '../assets/scss/Item.scss';

class Item extends React.Component {

  render() {
    return (
    <div class="KittiesGrid-item">
            <div class="KittyCard-main" onClick={event =>  window.location.href='/itemPage'}>
                <div class= "KittyCard-main-container">
                    <div class= "KittyCard-imageContainer shadow" style = {{ border: '2px solid grey' ,borderRadius: 5 }}>
                        <img class="overlay-item" src={diamond} style={{ width: 200, height: 200, justifyContent: 'flex-end' }} />
                        <div class="Item-description" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <p> {this.props.message +' ' }   </p>
                            
                            <p>{this.props.price}</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
  }
}

export default Item;