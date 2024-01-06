import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
       
        <div className="footer-left">
          <h1>SKYDOT</h1>
          <div className="social-icons">
            <i className="fa-brands fa-pinterest"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-brands fa-whatsapp"></i>
          </div>
        </div>

        <div className="footer-right">
          <form className="footer-form">
            <input className="footer-email-input" type="email" placeholder="Email" />
            <input className="connect-button" type="submit" value="Subscribe"/>
          </form>
        </div>
      
      </div>
     
      {/* <div className="footer-bottom">
        <p>
          <i className="fa-solid fa-copyright"></i>Shiyas Ali 2023
        </p>
      </div>  */}
   
    </div>
  );
};

export default Footer;
