import React from "react";
import Button from 'react-bootstrap/Button';

import NavBar from "../Components/NavBar";
import img from '../Pages/Assets/MensPants-01.jpg'
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className="home-page">
      <NavBar />
     
      <div className="product-header">
      <h5 className="product-header-value" >Index</h5>

          <h5 className="product-header-value" style={{width:'190px',marginLeft:'120px'}}>Name</h5>
          <h5 className="product-header-value" >Price</h5>
          <h5 className="product-header-value">XS</h5>
          <h5 className="product-header-value">S</h5>
          <h5 className="product-header-value">M</h5>
          <h5 className="product-header-value">L</h5>
          <h5 className="product-header-value">XL</h5>

          <Link style={{ textDecoration: "none", height:'100%'}} to="/add-products">
          <h5 className="product-add-bttn">ADD<i class="fa-solid fa-plus"></i></h5>
        </Link>
        </div>
  
      <div className="products-container">
       
        <div className="product-card">
        <h5 className="product-card-value">1</h5>

        <img className="product-card-value product-card-image"  src={img} />
          <h5 className="product-card-value product-card-name">Abstract Mens Shirt</h5>
          <h5 className="product-card-value">$800</h5>
          <h5 className="product-card-value">20</h5>
          <h5 className="product-card-value">15</h5>
          <h5 className="product-card-value">5</h5>
          <h5 className="product-card-value">6</h5>
          <h5 className="product-card-value">12</h5>
          <Link style={{ textDecoration: "none", height: "40%" }} to="/edit-product">
            <h5 className="product-edit-bttn">Edit</h5>
          </Link>
        </div>
      
      </div>
    </div>
  );
};

export default ProductsPage;
