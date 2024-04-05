

import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../Contexts/ProductsContext";
import Message from "../Components/Message";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateProductPage = () => {
  const { message, registerProduct, setMessage } = useContext(productsContext);
  const navigate = useNavigate();

  const product = {
    name: "",
    price: "",
    description: "",
    category: "",
    tag: "",
    stock: {
      stock_S: "",
      stock_M: "",
      stock_L: "",
      stock_XL: "",
    },
    images: {
      main_image: null,
      sub_image_1: null,
      sub_image_2: null,
      sub_image_3: null,
    },
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    tag: Yup.string().required("Tag is required"),
    price: Yup.number().required("Price is required"),
    "stock.stock_S": Yup.number().required("Stock(S) is required"),
    "stock.stock_M": Yup.number().required("Stock(M) is required"),
    "stock.stock_L": Yup.number().required("Stock(L) is required"),
    "stock.stock_XL": Yup.number().required("Stock(XL) is required"),
    "images.main_image": Yup.mixed().required("Main image is required"),
    "images.sub_image_1": Yup.mixed().required("Sub image 1 is required"),
    "images.sub_image_2": Yup.mixed().required("Sub image 2 is required"),
    "images.sub_image_3": Yup.mixed().required("Sub image 3 is required"),
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="product-page">
      <NavBar />
      {message && <Message message={message} setMessage={setMessage} />}
      <Formik
        initialValues={product}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="product-form">
          <div className="product-form-left">
            <div className="product-form-left-top">
              <div className="product-input-container">
                <label>Name:</label>
                <Field type="text" name="name" className="product-input" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div className="product-input-container">
                <label>Description:</label>
                <Field
                  type="text"
                  name="description"
                  className="product-input"
                  style={{height:'100px',width:"300px"}}
                />
                <ErrorMessage name="description" component="textarea" />

              </div>
            </div>

            <div className="product-form-left-bottom">
              <div className="product-input-image-container">
                <label>Main Image:</label>
                <Field
                  type="file"
                  name="main_image"
                  className="product-image-input"
                />
                <ErrorMessage name="main_image" component="div" />

                <img className="product-input-image" alt="" />
              </div>

              <div className="product-input-image-container">
                <label>Sub Image 1:</label>
                <Field
                  type="file"
                  name="sub_image_1"
                  className="product-image-input"
                />
                <ErrorMessage name="sub_image_1" component="div" />
                <img className="product-input-image" alt="" />
              </div>

              <div className="product-input-image-container">
                <label>Sub Image 2:</label>
                <Field
                  type="file"
                  name="sub_image_2"
                  className="product-image-input"
                />
                <ErrorMessage name="sub_image_2" component="div" />
                <img className="product-input-image" alt="" />
              </div>

              <div className="product-input-image-container">
                <label htmlFor="subImage1">Sub Image 3</label>
                <Field
                  type="file"
                  name="sub_image_3"
                  className="product-image-input"
                />
                <ErrorMessage name="sub_image_3" component="div" />
                <img className="product-input-image" alt="" />
              </div>
            </div>
          </div>

          <div className="product-form-right">
            <div className="product-input-container">
              <label>Stock S:</label>
              <Field type="number" name="stock_S" className="product-input" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div className="product-input-container">
              <label>Stock M</label>
              <Field type="number" name="stock_M" className="product-input" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div className="product-input-container">
              <label>Stock L:</label>
              <Field type="number" name="stock_L" className="product-input" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div className="product-input-container">
              <label>Stock XL:</label>
              <Field type="number" name="stock_XL" className="product-input" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div className="product-input-container">
              <label htmlFor="tag">Tag:</label>
              <Field
                as="select"
                className="product-select"
                id="tag"
                name="tag"
                required
              >
                <option value="None">None</option>
                <option value="Featured">Featured</option>
                <option value="New-Arrival">New Arrival</option>
              </Field>
              <ErrorMessage name="tag" component="div" className="error" />
            </div>

            <div className="product-input-container">
              <label htmlFor="category">Category:</label>
              <Field
                as="select"
                className="product-select"
                id="category"
                name="category"
                required
              >
                <option value="Shirt">Shirt</option>
                <option value="T-Shirt">T-shirt</option>
                <option value="Pants">Pants</option>
              </Field>
              <ErrorMessage name="category" component="div" className="error" />
            </div>

            <div className="product-input-container">
              <label htmlFor="price">Price:</label>
              <Field type="number" name="price" className="product-input" />
              <ErrorMessage name="price" component="div" />
            </div>

            <button type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateProductPage;