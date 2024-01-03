import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./ProductPage.css";
import Footer from "../../Components/Footer/Footer";
import { productsContext } from "../../Contexts/ProductsContext";
import { cartContext } from "../../Contexts/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { productsArray } = useContext(productsContext);
  const {cartArray, setCartArray} = useContext(cartContext)
  const selectedProduct = productsArray.find((product) => product.id === id);
  const updatedProduct = cartArray.find((product) => product.id === id)||{ ...selectedProduct };

  const [selectedSizes, setSelectedSizes] = useState([]);
  
  
  const imgArray = selectedProduct
    ? [
      selectedProduct.main_image,
      selectedProduct.sub_image_1,
      selectedProduct.sub_image_2,
      selectedProduct.sub_image_3,
      ]
    : [];

  const [mainImage, setMainImage] = useState(imgArray[0])


  const stocksObj = selectedProduct
  ? {
    XS: selectedProduct.stock_XS,
    S: selectedProduct.stock_S,
    M: selectedProduct.stock_M,
    L: selectedProduct.stock_L,
    XL: selectedProduct.stock_XL,
  }
  :{};

  const handleSizeClick = (size) => {
    const isSelected = selectedSizes.includes(size);
    if (isSelected) {
      setSelectedSizes(selectedSizes.filter((selected) => selected !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const addToCart = () => {
    updatedProduct["userNeeds"] = updatedProduct["userNeeds"] || {};
  
    selectedSizes.forEach((size) => {
      updatedProduct["userNeeds"][size] = updatedProduct["userNeeds"][size] || {};
      updatedProduct["userNeeds"][size] = 1
    });
  
    updateCart(updatedProduct);
    setSelectedSizes([]);

  };

  const updateCart = (updatedProduct) => {
    setCartArray((prevCart) => {
      const index = prevCart.findIndex((product) => product.id === updatedProduct.id);
      const newCart = [...prevCart];

      if (index !== -1) {
        newCart[index] = updatedProduct;
      } else {
        newCart.push(updatedProduct);
      }

      return newCart;
    });
  };

  const changeImage = (index)=>{
    setMainImage(imgArray[index])
  }
  
  return (
    <div className="product-page">
      <Header />
      <div className="display-container">
        <div className="display-left">
          <div className="display-left-top">
            <div className="main-img">
              <img src={mainImage} alt="" />
            </div>
          </div>
          <div className="display-left-bottom">
            {imgArray.map((item, index) => (
              <div className="sub-img" key={index}>
                <img src={item} alt="" onClick={() => changeImage(index)}/>
              </div>
            ))}
          </div>
        </div>
        {/* ------------------Right--------------- */}
        <div className="display-right">
          <div className="display-right-top">
            <div className="product-page-name">
              <p>{selectedProduct.name}</p>
            </div>
            <div className="product-page-price">
              <p>${selectedProduct.price}</p>
            </div>
            <div className="select-sizes-section">
              <div className="sizes-buttons-container">
                {Object.keys(stocksObj).map(
                  (size) =>
                    stocksObj[size] > 0 && (
                      <button
                        key={size}
                        className="size-button"
                        onClick={() => handleSizeClick(size)}
                        style={{
                          background: selectedSizes.includes(size)
                            ? "black"
                            : "transparent",
                          color: selectedSizes.includes(size)
                            ? "white"
                            : "black",
                        }}
                      >
                        {size}
                      </button>
                    )
                )}
              </div>
              <div className="add-cart-button-container">
                <button className="add-cart-button" onClick={addToCart}>Add Cart</button>
              </div>
            </div>
          </div>

          <div className="display-right-bottom">
            <h1>Product Details:-</h1>
            <p>{selectedProduct.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
