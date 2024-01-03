import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import AddCart from "../AddToCart/AddCart";

const ProductCard = ({ id, name, image, price }) => {
  return (
    <div className="product-card" key={id}>
      <div className="product-card-top">
        <div className="product-img">
          <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
            <img src={image} alt="" />
          </Link>
        </div>
      </div>
      <div className="product-card-bottom">
      <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/product/${id}`}
          >
            <p className="product-name">{name}</p>
          </Link>
          <p className="product-price">$ {price}</p>
        
          <AddCart className='add-cart-section' id={id} />
        
      </div>
    </div>
  );
};

export default ProductCard;
