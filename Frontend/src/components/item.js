import React from 'react';
import diamond from '../assets/img/diamond.png'
import '../assets/scss/Item.scss';

class Item extends React.Component {

  render() {
    return (
    <div className="KittiesGrid-item">
            <div className="KittyCard-main" onClick={event =>  window.location.href='/itemPage'}>
                <div className= "KittyCard-main-container">
                    <div className= "KittyCard-imageContainer shadow" style = {{ border: '2px solid grey' ,borderRadius: 5 }}>
                        <img className="overlay-item" src={diamond} style={{ width: 200, height: 200, justifyContent: 'flex-end' }} />
                        <div className="Item-description" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
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