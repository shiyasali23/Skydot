import React from "react";
import NavBar from "../Components/NavBar";

const AddProductsPage = () => {
  return (
    <div className="add-products-page">
      <NavBar />

      <form className="add-product-form">
        <div className="add-products-left">
          <input
            className="add-product-input add-product-input-large"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          

         

<textarea   style={{height:'100px'}}
            className="add-product-input add-product-input-large"
            name="description"
            placeholder="Description"
            required
          ></textarea>

<input
            className="add-product-input"
            type="number"
            name="price"
            placeholder="Price"
            required
          />
         
          <div className="add-products-left-bottom">
            <input
              className="add-product-input"
              type="file"
              name="mainImage"
              accept="image/*"
              placeholder="Main Image"
              required
            />

            <input
              className="add-product-input"
              type="file"
              id="subImage1"
              name="subImage1"
              accept="image/*"
              placeholder="Sub Image-1"
              required
            />

            <input
              className="add-product-input"
              type="file"
              id="subImage2"
              name="subImage2"
              accept="image/*"
              placeholder="Sub Image-2"
              required
            />

            <input
              className="add-product-input"
              type="file"
              id="subImage3"
              name="subImage3"
              accept="image/*"
              placeholder="Sub Image-3"
              required
            />
          </div>
        </div>

        <div className="add-products-right">
          <input
            className="add-product-input"
            type="number"
            placeholder="Stock XS"
            name="stockXS"
            min="1"
            required
          />

          <input
            className="add-product-input"
            type="number"
            placeholder="Stock S"
            name="stockS"
            min="1"
            required
          />

          <input
            className="add-product-input"
            type="number"
            placeholder="Stock M"
            name="stockM"
            min="1"
            required
          />

          <input
            className="add-product-input"
            type="number"
            placeholder="Stock L"
            name="stockL"
            min="1"
            required
          />

          <input
            className="add-product-input"
            type="number"
            placeholder="Stock XL"
            name="stockXL"
            min="1"
            required
          />

          <div className="add-products-right-bottom">
            <label htmlFor="category">Category:</label>

            <select
              className="add-product-select"
              id="category"
              name="category"
              placeholder="Category"
              required
            >
              <option value="shirt">Shirt</option>
              <option value="t-shirt">T-shirt</option>
              <option value="pants">Pants</option>
            </select>

            <label htmlFor="gender">Gender:</label>
            <select
              className="add-product-select"
              id="gender"
              name="gender"
              required
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
            <button className="save-product-button" type="submit">
            Save
          </button>
          </div>

         
        </div>
      </form>
    </div>
  );
};

export default AddProductsPage;
