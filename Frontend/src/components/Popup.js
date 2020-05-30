import React from 'react';  
import '../assets/scss/style.scss';  

class Popup extends React.Component {  
    
  render() {  
        return (  
            <div className='popup'> 

                <h3></h3>
                <h1 class="popup_offer"><span>Make an Offer</span></h1>
                <h4>Your offer must exceed 0.03 ether.</h4>
                <p class="grey_line"></p>
                <div class = "popup_estimatedTransactionFee">
                    <h3>Estimated Transaction Fee </h3>
                    <p> 0.001 ETH $0.07 USD</p>
                    <p class="grey_line"></p>
                </div>

                <div class="popup_beforeConfirm">
                    <h3>Before you confirm</h3>
                    <ul>
                        <li>Offer amount is held in escrow for 1 days.</li>
                        <li>Total 3.75% fee is collected when your offer is successful or cancelled.</li>
                        <li>Expired or outbid offers incur a flat 0.001 ETH fee.</li>
                        <li>A Kitty’s cooldown may change between the time an offer is made and concluded.</li>
                    </ul>
                    <p class="grey_line"></p>
                </div>

                <div className='popup\_inner'>  
                    <h1>{this.props.text}</h1>  
                    <button onClick={this.props.closePopup}>close me</button>  
                </div>  
            </div>  
        );  
    }  
}  

export default Popup;