import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { productsContext } from "../Contexts/ProductsContext";

const EditProductPage = () => {
  const { id } = useParams();
  const { productsArray, updateProduct } = useContext(productsContext);
  const [product, setProduct] = useState( productsArray.find((product) => product.id === id) );

  useEffect(() => {
    setProduct(productsArray.find((product) => product.id === id));
  },[productsArray, id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(product);
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
              value={product?.name ?? ''}
              onChange={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="address">Address</label>
            <textarea
              style={{ height: "100px" }}
              className="edit-product-input edit-product-input-large"
              name="description"
              placeholder="Description"
              value={product?.description?? ''}
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
              onChange={(e) =>
                setProduct({
                  ...product,
                  main_image: e.target.files[0],
                })
              }
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
              onChange={(e) =>
                setProduct({
                  ...product,
                  sub_image_1: e.target.files[0],
                })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="subImage2">Sub Image 2</label>
            <input
              className="edit-product-image-input"
              type="file"
              id="sub_image_2"
              name="sub_image_2"
              accept="image/*"
              onChange={(e) =>
                setProduct({
                  ...product,
                  sub_image_2: e.target.files[0],
                })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="subImage3">Sub Image 3</label>
            <input
              className="edit-product-image-input"
              type="file"
              id="sub_image_3"
              name="sub_image_3"
              accept="image/*"
              onChange={(e) =>
                setProduct({
                  ...product,
                  sub_image_3: e.target.files[0],
                })
              }
            />
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
              value={product?.stock_XS??''}
              onChange={(e) =>
                setProduct({ ...product, stock_XS: e.target.value })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="stockXS">Stock S</label>
            <input
              className="edit-product-input"
              type="number"
              placeholder="Stock S"
              name="stock_S"
              value={product?.stock_S ?? ''}
              onChange={(e) =>
                setProduct({ ...product, stock_S: e.target.value })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="stockXS">Stock M</label>
            <input
              className="edit-product-input"
              type="number"
              placeholder="Stock M"
              name="stockM"
              value={product?.stock_M ?? ''}
              onChange={(e) =>
                setProduct({ ...product, stock_M: e.target.value })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="stockXS">Stock L</label>
            <input
              className="edit-product-input"
              type="number"
              placeholder="Stock L"
              name="stock_L"
              value={product?.stock_L ?? ''}
              onChange={(e) =>
                setProduct({ ...product, stock_L: e.target.value })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="stockXS">Stock XL</label>
            <input
              className="edit-product-input"
              type="number"
              placeholder="Stock XL"
              name="stock_XL"
              value={product?.stock_XL??''}
              onChange={(e) =>
                setProduct({ ...product, stock_XL: e.target.value })
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
              value={product?.price?? ''}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>

          <div className="edit-product-input-container">
            <label htmlFor="category">Category:</label>
            <select
              className="edit-product-select"
              id="category"
              name="category"
              placeholder="Category"
              value={product?.category??''}
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
            <label htmlFor="gender">Gender:</label>
            <select
              className="edit-product-select"
              id="gender"
              name="gender"
              value={product?.gender?? ''}
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
            onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;

// const [name, setName] = useState(selectedProduct?.name);
// const [description, setDescription] = useState(selectedProduct?.description);
// const [price, setPrice] = useState(selectedProduct?.price);
// const [main_image, setMain_image] = useState(selectedProduct?.main_image);
// const [sub_image_1, setSubImage_1] = useState(selectedProduct?.sub_image_1);
// const [sub_image_2, setSubImage_2] = useState(selectedProduct?.sub_image_2);
// const [sub_image_3, setSubImage_3] = useState(selectedProduct?.sub_image_3);
// const [stock_XS, setStock_XS] = useState(selectedProduct?.stock_XS);
// const [stock_S, setStock_S] = useState(selectedProduct?.stock_S);
// const [stock_M, setStock_M] = useState(selectedProduct?.stock_M);
// const [stock_L, setStock_L] = useState(selectedProduct?.stock_L);
// const [stock_XL, setStock_XL] = useState(selectedProduct?.stock_XL);
// const [category, setCategory] = useState(selectedProduct?.category);
// const [gender, setGender] = useState(selectedProduct?.gender);
