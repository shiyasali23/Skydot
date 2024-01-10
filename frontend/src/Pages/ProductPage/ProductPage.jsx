import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./ProductPage.css";
import Footer from "../../Components/Footer/Footer";
import { productsContext } from "../../Contexts/ProductsContext";
import { cartContext } from "../../Contexts/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { productsArray } = useContext(productsContext);
  const { cartArray, setCartArray } = useContext(cartContext);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const selectedProduct = productsArray.find((product) => product.id === id);
  const updatedProduct = cartArray.find((product) => product.id === id) || {
    ...selectedProduct,
  };
  



  const productName = selectedProduct? selectedProduct.name : '';
  const productPrice = selectedProduct? selectedProduct.price : '';
  const productDescription = selectedProduct? selectedProduct.description : '';
  const imgArray = useMemo(() => {
    return selectedProduct
      ? [
          selectedProduct.main_image,
          selectedProduct.sub_image_1,
          selectedProduct.sub_image_2,
          selectedProduct.sub_image_3,
        ]
      : [];
  }, [selectedProduct]);

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    setMainImage(imgArray[0]);
  }, [setMainImage, imgArray]);



  const stocksObj = useMemo(() => {
    return selectedProduct
      ? {
          XS: selectedProduct.stock_XS,
          S: selectedProduct.stock_S,
          M: selectedProduct.stock_M,
          L: selectedProduct.stock_L,
          XL: selectedProduct.stock_XL,
        }
      : {};
  }, [selectedProduct]);


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
      updatedProduct["userNeeds"][size] =
        updatedProduct["userNeeds"][size] || {};
      updatedProduct["userNeeds"][size] = 1;
    });

    updateCart(updatedProduct);
    setSelectedSizes([]);
  };

  const updateCart = (updatedProduct) => {
    setCartArray((prevCart) => {
      const index = prevCart.findIndex(
        (product) => product.id === updatedProduct.id
      );
      const newCart = [...prevCart];

      if (index !== -1) {
        newCart[index] = updatedProduct;
      } else {
        newCart.push(updatedProduct);
      }

      return newCart;
    });
  };

  const changeImage = (index) => {
    setMainImage(imgArray[index]);
  };

  return (
    <div className="product-page">
      <Header />

      <div className="display-container">
        <div className="display-left">
          <div className="display-left-top">
            <div className="display-main-img">
              <img src={mainImage} alt="" />
            </div>
          </div>
          <div className="display-left-bottom">
            {imgArray.map((item, index) => (
              <div className="sub-img-container" key={index}>
                <img
                  className="sub-img"
                  src={item}
                  alt=""
                  onClick={() => changeImage(index)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* ------------------Right--------------- */}
        <div className="display-right">
          <div className="display-right-top">
            <p className="display-product-name">{productName}</p>

            <p className="display-product-price">${productPrice}</p>

            <div className="display-sizes-container">
              {Object.keys(stocksObj).map(
                (size) =>
                  stocksObj[size] > 0 && (
                    <button
                      key={size}
                      className="display-size-button"
                      onClick={() => handleSizeClick(size)}
                      style={{
                        background: selectedSizes.includes(size)
                          ? "black"
                          : "transparent",
                        color: selectedSizes.includes(size) ? "white" : "black",
                      }}
                    >
                      {size}
                    </button>
                  )
              )}
            </div>
            <button className="display-cart-button" onClick={addToCart}>
              Add Cart
            </button>
          </div>

          <div className="display-right-bottom">
            <p className="display-product-description">
              {productDescription}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
