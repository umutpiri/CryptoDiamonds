import React from "react";
import "../assets/scss/BrowseCategoryItems.scss";
import Item from "../components/Item";

class BrowseCategoryItems extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
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
            <div className = "BrowseCategoryPage" >

                <h1 className = "HeaderName" >Browse Category Items</h1>
                <div className = "AllItems">
                    {items}
                    {items}
                    {items}
                    {items}
                </div>

            </div>
        );
    }
}

export default BrowseCategoryItems;