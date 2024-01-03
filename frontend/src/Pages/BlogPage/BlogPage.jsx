import React from "react";
import "./BlogPage.css";
import intro_image from "../../Resorces/Banner-images/Skating.jpg";
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div className="blog">
      <div className="blog-header">
        <Link style={{ textDecoration: "none" }} to="/">
          <h1>SKYDOT</h1>
        </Link>
      </div>
      <div className="blog-container">
        <div className="blog-left">
          <div className="blog-content">
            <p className="blog-text">
              <span style={{ fontWeight: 900 }}>Welcome</span> to urban style
              redefined. Unleash your inner fashion icon on the city's canvas.
              Discover. Express. Elevate. Explore the urban landscape as your
              fashion playground, where each corner of the city becomes an
              opportunity to express your unparalleled style
            </p>
            <Link style={{ textDecoration: "none" }} to="/">
              <button className="store">Store</button>
            </Link>
          </div>
        </div>
        <div className="blog-right">
          <div className="blog-image">
            <img src={intro_image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
