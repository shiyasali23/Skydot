import React from "react";
import "./CheckoutPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const CheckoutPage = () => {

  return (
    <div className="checkout-page">
      <Header/>
        
        <div className="checkout-page-container">
       
        <div className="checkout-left">
          <form className="checkout-form">


          <div className="cilw">
          <label className="checkout-label"htmlFor="name">Name</label>
            <input name='name'type="text"  placeholder="Name" className="checkout-input" />
          </div>
          <div className="cilw">
          <label className="checkout-label"htmlFor="name">Email</label>
            <input type="email"  placeholder="Email" className="checkout-input" />
          </div>
          <div className="cilw">
          <label className="checkout-label"htmlFor="name">Phonenumber</label>
            <input type="number" placeholder="Phonenumber" className="checkout-input" />
          </div>
          <div className="cilw">
          <label className="checkout-label"htmlFor="name">City</label>
            <input type="text" placeholder="City" className="checkout-input" />
          </div>
          <div className="cilw">
          <label className="checkout-label"htmlFor="name">Pincode</label>
            <input type="number" placeholder="Pincode" className="checkout-input" />
          </div>
          <div className="cilw cilw-address">
          <label className="checkout-label"htmlFor="name">Address</label>
            <input type="text" placeholder="Address" className="checkout-input checkout-input-address" />
          </div>

      
          </form> 
        </div>  
       
        <div className="checkout-right">
        <div className="checkout-right-top">
          <p>Checkout details</p>
        </div>
          <div className="checkout-right-bottom">
          <button type="submit" className="checkout-submit-button">Submit</button>
          </div>
        </div>
      
        </div>
      <Footer/>
    </div>
  );
}


export default CheckoutPage;
