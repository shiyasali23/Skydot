import React, { useContext } from "react";
import NavBar from "../Components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { productsContext } from "../Contexts/ProductsContext";

function ProductsPage({}) {
  const { productsArray, message } = useContext(productsContext);
  return (
    <div>
      <NavBar />
      <table className="table">
        <thead className="table-thead">
          <tr>
            <th className="table-header">Index</th>
            <th className="table-header">Image</th>
            <th className="table-header">Name</th>
            <th className="table-header">Price</th>
            <th className="table-header">Rating</th>
            <th className="table-header">Total Sold</th>
            <th className="table-header">In Stock</th>
            <th className="table-header">
              <Link
                style={{
                  textDecoration: "none",
                }}
                to="/add-product"
              >
                <h5 className="table-add-bttn">
                  ADD<i className="fa-solid fa-plus"></i>
                </h5>
              </Link>
            </th>
          </tr>
        </thead>

        <tbody className="table-tbody">
          {productsArray.map((product, index) => (
            <tr className="table-row" key={product.id}>
              <td className="table-value">{index + 1}</td>
              <td className="table-value">
                <img
                  className="product-table-image"
                  src={product?.images?.main_image}
                  alt=""
                />
              </td>
              <td className="table-value">{product.name}</td>
              <td className="table-value">{product.price}</td>
              <td className="table-value">{product.vote}</td>
              <td className="table-value">{product.total_sold}</td>
              <td className="table-value">
                {product.out_of_stock ? (
                  <i style={{ color: "red" }} className="fa-solid fa-x"></i>
                ) : (
                  <i
                    style={{ color: "green" }}
                    className="fa-solid fa-check"
                  ></i>
                )}
              </td>
              <td className="table-value">
                <Link
                  to={`/edit-product/${product.id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
