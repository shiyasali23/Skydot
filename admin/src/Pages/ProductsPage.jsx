import React, { useContext } from "react";

import NavBar from "../Components/NavBar";
import img from "../Pages/Assets/MensPants-01.jpg";
import { Link } from "react-router-dom";

import { productsContext } from "../Contexts/ProductsContext";

const ProductsPage = () => {

  const { productsArray, loading } = useContext(productsContext);


  return (
    <div className="home-page">
      <NavBar />

      <div className="product-header">
        <h5 className="product-header-value">Index</h5>

        <h5
          className="product-header-value"
          style={{ width: "170px", marginLeft: "105px" }}>
          Name
        </h5>
        <h5 className="product-header-value">Price</h5>
        <h5 className="product-header-value">XS</h5>
        <h5 className="product-header-value">S</h5>
        <h5 className="product-header-value">M</h5>
        <h5 className="product-header-value">L</h5>
        <h5 className="product-header-value">XL</h5>

        <Link
          style={{ textDecoration: "none", height: "100%" }}
          to="/add-products"
        >
          <h5 className="product-add-bttn">
            ADD<i className="fa-solid fa-plus"></i>
          </h5>
        </Link>
      </div>

      <div className="products-container">
      
      {productsArray.map((item,index)=>(
        <div className="product-card" key={index}>
        <h5 className="product-card-value">{index + 1}</h5>
        <img className="product-card-value product-card-image" src={item.main_image} alt="product-img" />
        <h5 className="product-card-value product-card-name">
          {item.name}
        </h5>
        <h5 className="product-card-value">{item.price}</h5>
        <h5 className="product-card-value">{item.stock_XS}</h5>
        <h5 className="product-card-value">{item.stock_S}</h5>
        <h5 className="product-card-value">{item.stock_M}</h5>
        <h5 className="product-card-value">{item.stock_L}</h5>
        <h5 className="product-card-value">{item.stock_XL}</h5>
        <Link
          style={{
            textDecoration: "none",
            height: "40%",
            width: "85px",
            display: "flex",
            justifyContent: "center",
          }}
          to={`/edit-product/${item.id}`} >
          <h5 className="product-edit-bttn">Edit</h5>
        </Link>
      </div>
      ))}
     
      </div>
    </div>
  );
};

export default ProductsPage;
