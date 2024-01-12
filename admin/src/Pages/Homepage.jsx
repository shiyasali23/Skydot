import React from "react";
import Accordion from "react-bootstrap/Accordion";

import NavBar from "../Components/NavBar";
import Button from "react-bootstrap/esm/Button";
import img from '../assets/MensPants-01.jpg'

const Homepage = () => {
  return (
    <div className="home-page">
      <NavBar />
      <div className="product-header">
          <h5 className="product-header-value" style={{width:'180px'}}>Name</h5>
          <h5 className="product-header-value" style={{marginLeft:'13px'}}>Price</h5>
          <h5 className="product-header-value">XS</h5>
          <h5 className="product-header-value">S</h5>
          <h5 className="product-header-value">M</h5>
          <h5 className="product-header-value">L</h5>
          <h5 className="product-header-value">XL</h5>
        </div>
      <div className="products-container">
        
        
        <div className="product-card">
        <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$800</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
       
     
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
        <div className="product-card">
          <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$8000</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Button variant="primary">Edit</Button>
        </div>
       
      
      </div>
    </div>
  );
};

export default Homepage;
