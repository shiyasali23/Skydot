import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { productsContext } from "../Contexts/ProductsContext";

const EditProductPage = () => {
  const { id } = useParams();
  const { productsArray, registerProduct, updateProduct } =
    useContext(productsContext);

    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (id) {
        const foundProduct = productsArray.find((product) => product.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null); // or some other default value
        }
      }
      
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        navigate("/");
      }
    }, [productsArray, id, navigate]);
    
    const [productObj, setProductObj] = useState({
      name: product ? product.name : "",
      description: product ? product.description : "",
      price: product ? parseFloat(product.price) : 0,
      category: product ? product.category : "",
      gender: product ? product.gender : "",
      tag: product ? product.tag : "",
      vote: product ? product.vote : "", // Assuming vote is a number
      out_of_stock: product ? product.out_of_stock : false,
      stock: product ? product.stock : {
        stock_XS: 0,
        stock_S: 0,
        stock_M: 0,
        stock_L: 0,
        stock_XL: 0,
        product: "",
      },
      created: product ? product.created : new Date().toISOString(),
      id: product ? product.id : "", // Assuming id is a string
    });
    
  

  const handleImageChange = (e, imageKey) => {
    if (product && product.images) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: {
          ...prevProduct.images,
          [imageKey]: URL.createObjectURL(e.target.files[0]),
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateProduct(product);
    } else {
      registerProduct(product);
    }
  };

  return (
    <div className="edit-product-page">
      <NavBar />

      <form className="edit-product-form">
        <div className="edit-product-left">
          <div className="edit-product-input-container">
            <label htmlFor="name">Name</label>
            <input
              className="edit-product-input edit-product-input-large"
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

          <div className="edit-product-input-container">
            <label htmlFor="address">Description</label>
            <textarea
              style={{ height: "100px" }}
              className="edit-product-input edit-product-input-large"
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

          <div className="edit-product-input-container">
            <label htmlFor="mainImage">Main Image</label>
            <input
              className="edit-product-image-input"
              type="file"
              name="mainImage"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "main_image")}
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="subImage1">Sub Image 1</label>
            <input
              className="edit-product-image-input"
              type="file"
              id="sub_image_1"
              name="sub_image_1"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "sub_image_1")}
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="subImage1">Sub Image 2</label>
            <input
              className="edit-product-image-input"
              type="file"
              id="sub_image_2"
              name="sub_image_2"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "sub_image_2")}
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="subImage1">Sub Image 3</label>
            <input
              className="edit-product-image-input"
              type="file"
              id="sub_image_3"
              name="sub_image_3"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "sub_image_3")}
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="vote">Vote</label>
            <h5>{product?.vote ?? ""}</h5>
          </div>
        </div>

        <div className="edit-product-right">
          <div className="edit-product-input-container">
            <label htmlFor="stockXS">Stock XS</label>
            <input
              className="edit-product-input"
              type="number"
              placeholder="Stock XS"
              name="stock_XS"
              value={product?.stock?.stock_XS ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: {
                    ...(product?.stock || {}),
                    stock_XS: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="stockS">Stock S</label>
            <input
              className="edit-product-input"
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

          <div className="edit-product-input-container">
            <label htmlFor="stockM">Stock M</label>
            <input
              className="edit-product-input"
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

          <div className="edit-product-input-container">
            <label htmlFor="stockL">Stock L</label>
            <input
              className="edit-product-input"
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

          <div className="edit-product-input-container">
            <label htmlFor="stockXL">Stock XL</label>
            <input
              className="edit-product-input"
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

          <div className="edit-product-input-container">
            <label htmlFor="price">Price</label>
            <input
              className="edit-product-input"
              type="number"
              name="price"
              placeholder="Price"
              value={product?.price ?? ""}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="tag">Tag</label>
            <select
              className="edit-product-select"
              id="tag"
              name="tag"
              value={product?.tag ?? ""}
              onChange={(e) => setProduct({ ...product, tag: e.target.value })}
            >
              <option value="featured">Featured</option>
              <option value="new-arrival">New Arrival</option>
            </select>
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="category">Category</label>
            <select
              className="edit-product-select"
              id="category"
              name="category"
              value={product?.category ?? ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option value="shirt">Shirt</option>
              <option value="t-shirt">T-shirt</option>
              <option value="pants">Pants</option>
            </select>
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="gender">Gender</label>
            <select
              className="edit-product-select"
              id="gender"
              name="gender"
              value={product?.gender ?? ""}
              onChange={(e) =>
                setProduct({ ...product, gender: e.target.value })
              }
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
          <button
            className="save-edit-product-button"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
