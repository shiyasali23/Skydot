import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { productsContext } from "../Contexts/ProductsContext";
import Message from "../Components/Message";

const CreateProductPage = () => {
  const { message, registerProduct,uploadProductImages, setMessage } = useContext(productsContext);

  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
  }, []);

  const handleImageChange = (e, imageKey) => {
    setProductImages((prevImages) => ({ ...prevImages, [imageKey]: e.target.files[0] }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { registrationStatus } = await registerProduct(product, productImages);
    if (registrationStatus) {
      navigate('/products');
    }
  };
  

  return (
    <div className="product-page">
      <NavBar />
      {message && <Message message={message} setMessage={setMessage} />}
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="product-form-left">
          <div className="product-form-left-top">
            <div className="product-input-container">
              <label htmlFor="name">Name</label>
              <input
                className="product-input product-input-large"
                type="text"
                name="name"
                placeholder="Name"
                value={product?.name ?? ""}
                onChange={(e) =>
                  setProduct((product) => ({
                    ...product,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="product-input-container">
              <label htmlFor="address">Description</label>
              <textarea
                style={{ height: "100px" }}
                className="product-input product-input-large"
                name="description"
                placeholder="Description"
                value={product?.description ?? ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>

          <div className="product-form-left-bottom">
            <div className="product-input-image-container">
              <label htmlFor="mainImage">Main Image</label>
              <input
                className="product-image-input"
                type="file"
                name="mainImage"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "main_image")}
              />
              {product?.images?.main_image && (
                <img
                  className="product-input-image"
                  src={URL.createObjectURL(product.images.main_image)}
                  alt=""
                />
              )}
            </div>

            <div className="product-input-image-container">
              <label htmlFor="subImage1">Sub Image 1</label>
              <input
                className="product-image-input"
                type="file"
                id="sub_image_1"
                name="sub_image_1"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "sub_image_1")}
              />
              {product?.images?.sub_image_1 && (
                <img
                  className="product-input-image"
                  src={URL.createObjectURL(product.images.sub_image_1)}
                  alt=""
                />
              )}
            </div>

            <div className="product-input-image-container">
              <label htmlFor="subImage1">Sub Image 2</label>
              <input
                className="product-image-input"
                type="file"
                id="sub_image_2"
                name="sub_image_2"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "sub_image_2")}
              />
              {product?.images?.sub_image_2 && (
                <img
                  className="product-input-image"
                  src={URL.createObjectURL(product.images.sub_image_2)}
                  alt=""
                />
              )}
            </div>

            <div className="product-input-image-container">
              <label htmlFor="subImage1">Sub Image 3</label>
              <input
                className="product-image-input"
                type="file"
                id="sub_image_3"
                name="sub_image_3"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "sub_image_3")}
              />
              {product?.images?.sub_image_3 && (
                <img
                  className="product-input-image"
                  src={URL.createObjectURL(product.images.sub_image_3)}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>

        <div className="product-form-right">
          <div className="product-input-container">
            <label htmlFor="stockS">Stock S</label>
            <input
              className="product-input"
              type="number"
              placeholder="Stock S"
              name="stock_S"
              value={product?.stock?.stock_S ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: {
                    ...(product?.stock || {}),
                    stock_S: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="product-input-container">
            <label htmlFor="stockM">Stock M</label>
            <input
              className="product-input"
              type="number"
              placeholder="Stock M"
              name="stock_M"
              value={product?.stock?.stock_M ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: {
                    ...(product?.stock || {}),
                    stock_M: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="product-input-container">
            <label htmlFor="stockL">Stock L</label>
            <input
              className="product-input"
              type="number"
              placeholder="Stock L"
              name="stock_L"
              value={product?.stock?.stock_L ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: {
                    ...(product?.stock || {}),
                    stock_L: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="product-input-container">
            <label htmlFor="stockXL">Stock XL</label>
            <input
              className="product-input"
              type="number"
              placeholder="Stock XL"
              name="stock_XL"
              value={product?.stock?.stock_XL ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: {
                    ...(product?.stock || {}),
                    stock_XL: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="product-input-container">
            <label htmlFor="price">Price &#8377;</label>
            <input
              className="product-input"
              type="number"
              name="price"
              placeholder="Price"
              value={product?.price ?? ""}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>

          <div className="product-input-container">
            <label htmlFor="tag">Tag</label>
            <select
              className="product-select"
              id="tag"
              name="tag"
              value={product?.tag ?? ""}
              onChange={(e) => setProduct({ ...product, tag: e.target.value })}
            >
              <option value="None">None</option>
              <option value="Featured">Featured</option>
              <option value="New Arrival">New Arrival</option>
            </select>
          </div>

          <div className="product-input-container">
            <label htmlFor="category">Category</label>
            <select
              className="product-select"
              id="category"
              name="category"
              value={product?.category ?? ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option value="Shirt">Shirt</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Pants">Pants</option>
            </select>
          </div>

          <button className="save-product-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
