import React from 'react';
import Item from '../components/item';
import '../index.css'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemContainer: [
        {
          message: '#108865',
          price: '50$',
        },
        {
          message: '#108893',
          price: '100$',
        },
      ],
    };
  }
  render() {
    const items = this.state.itemContainer.map((mapItem, index) => (
      <Item key={index} message={mapItem.message} price={mapItem.price} />
    ));
    return (
      <div class="AllCategories">
       <div class="KittiesCategory">
           <h1 class="heading--xss KittiesCategoryTitle"> Best Seller</h1>
           <p class="KittiesCategory-subtitle">
            <span>
              "Share your collection in the "
              <a href="https://discord.gg/K86qFg" >CryptoColors Discord </a>
              " for a chance to get featured in the Collection of the Week!"
           </span>
           </p>
           {items} 
           {items}
       </div>

       <div class="KittiesCategory">
           <h1 class="heading--xss KittiesCategoryTitle"> Great-value Gems</h1>
           {items} 
           {items}
       </div>

       <div class="KittiesCategory">
           <h1 class="heading--xss KittiesCategoryTitle"> Fundemental Gems</h1>
           {items} 
           {items}
       </div>



      </div>
    );
  }
}

export default MainPage;
