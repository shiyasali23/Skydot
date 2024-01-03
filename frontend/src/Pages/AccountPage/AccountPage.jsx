import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./AccountPage.css";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {

  const localUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : false;
    const navigate = useNavigate();

    const [userName, setUserName] = useState(localUser.name?localUser.name:null)
    const [userEmail, setUserEmail] = useState(localUser.email?localUser.email:null)
    const [userPhone, setUserPhone] = useState(localUser.phonenumber?localUser.phonenumber:null)
    const [userPin, setUserPin] = useState(localUser.pincode?localUser.pincode:null)
    const [userAdress, setUserAdress] = useState(localUser.adress?localUser.adress:null)
    console.log(userName,userEmail,userPhone,userPin,userAdress);
    const handleSubmit = (event)=>{
        
    }

  useEffect(() => {
    if (!localUser) {
      navigate("/");
    }
  });

  return (
    <div className="account-page">
      <Header />
      <h1 className="account-text">Account page</h1>
      <div className="account-container">
        
        <div className="account-left">
          <form className="account-form" onSubmit={handleSubmit}>
            <input className="account-input" type="text" placeholder="name" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <input className="account-input" type="email" placeholder="email" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
            <input className="account-input" type="number" placeholder="number" value="number"inputmode="text" onChange={(e)=>setUserPhone(e.target.value)}/>
            <input className="account-input" type="number" placeholder="pincode" value="pincode"inputmode="text" onChange={(e)=>setUserPin(e.target.value)}/>
            <input className="account-input account-adress" type="text" placeholder="Adress" value="adress" onChange={(e)=>setUserAdress(e.target.value)} />
            <input className="account-input account-submit" type="submit" />
          </form>
        </div>
        <div className="account-right">
          <div className="order-container">
            <p>order container</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
