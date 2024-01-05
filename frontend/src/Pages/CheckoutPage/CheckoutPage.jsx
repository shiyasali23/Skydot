import React, { useContext, useState } from "react";
import "./CheckoutPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { guestContext } from "../../Contexts/GuestContext";

const CheckoutPage = () => {

  const { registerGuest } = useContext(guestContext)
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phonenumber,setPhonenumber] = useState('')
  const [city,setCity] = useState('')
  const [pincode,setPincode] = useState('')
  const [address,setAddress] = useState('')

  const handleSubmit = ()=>{
    registerGuest(name, email, phonenumber, city, pincode, address, isWhatsapp)
  }

  return (
    <div className="checkout-page">
      <Header/>
        
        <div className="checkout-page-container">
       
        <div className="checkout-left">
          <form className="checkout-form">


          <div className="cilw">
  <label className="checkout-label" htmlFor="name">Name</label>
  <input
    name='name'
    type="text"
    placeholder="Name"
    className="checkout-input"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</div>

<div className="cilw">
  <label className="checkout-label" htmlFor="email">Email</label>
  <input
    name='email'
    type="email"
    placeholder="Email"
    className="checkout-input"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

<div className="cilw">
  <label className="checkout-label" htmlFor="phonenumber">Phone</label>
  <input
    name='phonenumber'
    type="number"
    placeholder="Phone number"
    className="checkout-input"
    value={phonenumber}
    onChange={(e) => setPhonenumber(e.target.value)}
  />
</div>

<div className="cilw">
  <label className="checkout-label" htmlFor="city">City</label>
  <input
    name='city'
    type="text"
    placeholder="City"
    className="checkout-input"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
</div>

<div className="cilw">
  <label className="checkout-label" htmlFor="pincode">Pincode</label>
  <input
    name='pincode'
    type="number"
    placeholder="Pincode"
    className="checkout-input"
    value={pincode}
    onChange={(e) => setPincode(e.target.value)}
  />
</div>

<div className="cilw cilw-address">
  <label className="checkout-label checkout-label-address" htmlFor="address">Address</label>
  <input
    name='address'
    type="text"
    placeholder="Address"
    className="checkout-input checkout-input-address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />
</div>


<div className="cilw cilw-checkbox">
  <label className="checkout-label checkout-label-checkbox" htmlFor="whatsappUpdates">Get updates on WhatsApp</label>
  <input
    name='whatsappUpdates'
    type="checkbox"
    className="checkout-input checkout-input-checkbox"
    checked={isWhatsapp}
    onChange={() => setIsWhatsapp(!isWhatsapp)}
  />
</div>

          

      
          </form> 
        </div>  
       
        <div className="checkout-right">
        <div className="checkout-right-top">
          <p>Checkout details</p>
        </div>
          <div className="checkout-right-bottom">
          <button type="submit" className="checkout-buy-button" onClick={handleSubmit}>Buy</button>
          </div>
        </div>
      
        </div>
      <Footer/>
    </div>
  );
}


export default CheckoutPage;
