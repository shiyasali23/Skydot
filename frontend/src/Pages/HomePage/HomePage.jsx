import React, { useContext } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard.jsx";
import Header from "../../Components/Header/Header.jsx";
import "./HomePage.css";
import Footer from "../../Components/Footer/Footer.jsx";
import { productsContext } from "../../Contexts/ProductsContext.js";

const HomeScreen = ({ category }) => {
  const { productsArray } = useContext(productsContext);

  return (
    <div>
      <Header />
      

      <div className="store-container">
        {productsArray
          .filter((items) => !category || items.category === category)
          .map((items) => (
            <ProductCard
              key={items.id}
              id={items.id}
              name={items.name}
              image={items.main_image}
              price={items.price}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;


